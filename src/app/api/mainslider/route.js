import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import MainSlider from '../../../models/MainSlider';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

function imageFileName(name) {
    return name.trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "").toLowerCase();
}

export async function POST(request) {
    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const {
            title,
            url,
            slide_image,
            orderno,
            status,
        } = await request.json();

        const base64Data = slide_image.base64.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        const uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + slide_image.name
        const fileName = `admincolor/homepage/slider/${imageFileName(uniqueSuffix)}`
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: slide_image.type,
            ContentDisposition: "inline",
            ACL: "public-read",
        };

        await s3.send(new PutObjectCommand(uploadParams));

        const isMainSlider = await MainSlider.findOne({ title });
        if (isMainSlider) {
            return NextResponse.json({ error: 'MainSlider already exist' }, { status: 404 })
        }

        const isOrderNo = await MainSlider.findOne({ orderno });
        if (isOrderNo) {
            return NextResponse.json({ error: 'Order No already exist' }, { status: 404 })
        }

        const addMainSlider = new MainSlider({
            title,
            url,
            slide_image: imageFileName(uniqueSuffix),
            orderno,
            status,
        });

        await addMainSlider.save();
        return NextResponse.json(addMainSlider, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { title: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const skip = (page - 1) * limit;

        const MainSliderItems = await MainSlider.find(filters)
            .sort({ updated_at: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await MainSlider.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const MainSliderIndex = MainSliderItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                main_sliders: MainSliderIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching MainSlider items:", error);
        return NextResponse.json(
            { error: "Failed to fetch MainSlider items" },
            { status: 500 }
        );
    }
}