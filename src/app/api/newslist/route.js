import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import HealthNews from '../../../models/HealthNews';
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
            title,
            url,
            description,
            status,
            date,
            timestamp,
            updated_at,
            metatitle,
            metadesc,
            metakeyboard
        } = await request.json();

        const isHealthNews = await HealthNews.findOne({ title });
        if (isHealthNews) {
            return NextResponse.json({ error: 'HealthNews already exist' }, { status: 401 })
        }

        const addHealthNews = new HealthNews({
            title,
            url,
            description,
            status,
            date,
            timestamp,
            updated_at,
            metatitle,
            metadesc,
            metakeyboard
        });

        await addHealthNews.save();
        return NextResponse.json(addHealthNews, { status: 200 })
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

        const HealthNewsItems = await HealthNews.find(filters)
            .sort({ updated_at: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await HealthNews.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const HealthNewsIndex = HealthNewsItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                health_news: HealthNewsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching HealthNews items:", error);
        return NextResponse.json(
            { error: "Failed to fetch HealthNews items" },
            { status: 500 }
        );
    }
}