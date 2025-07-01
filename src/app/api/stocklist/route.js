import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Stock from '../../../models/Stock';
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
            date,
            timestamp,
            updated_at,
            status
        } = await request.json();

        const isStock = await Stock.findOne({ name });
        if (isStock) {
            return NextResponse.json({ error: 'Stock name already exist' }, { status: 401 })
        }

        const addStock = new Stock({
            name,
            url,
            date,
            timestamp,
            updated_at,
            status
        });

        await addStock.save();
        return NextResponse.json(addStock, { status: 200 })
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
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const skip = (page - 1) * limit;

        const StockItems = await Stock.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Stock.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const StockItemsIndex = StockItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                stocks: StockItemsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Stock items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Stock items" },
            { status: 500 }
        );
    }
}