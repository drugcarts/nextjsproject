import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Lab from '../../../models/Lab';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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
            labname,
            url,
            logo,
            image,
            address1,
            address2,
            description,
            metatitle,
            metakeyword,
            metadesc
        } = await request.json();

        const base64Data = image.base64.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        const uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + image.name
        const fileName = `admincolor/lab/lablogo/${imageFileName(uniqueSuffix)}`
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: image.type,
            ContentDisposition: "inline",
            ACL: "public-read",
        };

        await s3.send(new PutObjectCommand(uploadParams));

        const isLabName = await Lab.findOne({ labname });
        if (isLabName) {
            return NextResponse.json({ error: 'Lab Name already exist' }, { status: 401 })
        }

        const addLab = new Lab({
            labname,
            url,
            logo,
            image: fileName,
            address1,
            address2,
            description,
            metatitle,
            metakeyword,
            metadesc,
            userId: user?._id
        });

        await addLab.save();
        return NextResponse.json(addLab, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { labname: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const skip = (page - 1) * limit;

        const LabItems = await Lab.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Lab.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const LabItemsIndex = LabItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                labs: LabItemsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Lab:", error);
        return NextResponse.json(
            { error: "Failed to fetch Lab" },
            { status: 500 }
        );
    }
}