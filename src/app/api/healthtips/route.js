import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import HealthTips from '../../../models/HealthTips';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function POST(request) {
    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const {
            name,
            url,
            description,
            vedio,
            image,
            status,
            date,
            timestamp,
            updated_at,
            metatitle,
            metadesc,
            metakeyboard
        } = await request.json();

        const isHealthTips = await HealthTips.findOne({ name });
        if (isHealthTips) {
            return NextResponse.json({ error: 'HealthTips already exist' }, { status: 401 })
        }

        const addHealthTips = new HealthTips({
            name,
            url,
            description,
            vedio,
            image,
            status,
            date,
            timestamp,
            updated_at,
            metatitle,
            metadesc,
            metakeyboard
        });

        await addHealthTips.save();
        return NextResponse.json(addHealthTips, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { name: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const skip = (page - 1) * limit;

        const HealthTipsItems = await HealthTips.find(filters)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await HealthTips.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const HealthTipsIndex = HealthTipsItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                health_tips: HealthTipsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching HealthTips items:", error);
        return NextResponse.json(
            { error: "Failed to fetch HealthTips items" },
            { status: 500 }
        );
    }
}