import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Specialty from '../../../models/Specialty';
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
            specialty_name,
            url,
            image,
            imagealt,
            metatitle,
            metadesc,
            metakeyboard,
        } = await request.json();

        const base64Data = image.base64.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        const uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + image.name
        const fileName = `colors/specialty/${imageFileName(uniqueSuffix)}`
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: image.type,
            ContentDisposition: "inline",
            ACL: "public-read",
        };

        await s3.send(new PutObjectCommand(uploadParams));

        const isSpecialty = await Specialty.findOne({ specialty_name });
        if (isSpecialty) {
            return NextResponse.json({ error: 'Name already exist' }, { status: 401 })
        }

        const addSpecialty = new Specialty({
            userId: user?._id,
            url,
            specialty_name,
            image: fileName,
            imagealt,
            metatitle,
            metadesc,
            metakeyboard,
        });

        await addSpecialty.save();
        return NextResponse.json(addSpecialty, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { specialty_name: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();
        // const { success, user, message } = await adminAuthorization();

        // if (!success) {
        //     return NextResponse.json({ error: message }, { status: 401 })
        // }

        const skip = (page - 1) * limit;

        const SpecialtyItems = await Specialty.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Specialty.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const SpecialtyItemsIndex = SpecialtyItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                specialty_lists: SpecialtyItemsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Specialty items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Specialty items" },
            { status: 500 }
        );
    }
}