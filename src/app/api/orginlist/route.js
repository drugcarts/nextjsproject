import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Orgin from '../../../models/Orgin';
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
            orginname,
            status
        } = await request.json();

        const isOrgin = await Orgin.findOne({ orginname });
        if (isOrgin) {
            return NextResponse.json({ error: 'Orgin name already exist' }, { status: 401 })
        }

        const addOrgin = new Orgin({
            orginname,
            status
        });

        await addOrgin.save();
        return NextResponse.json(addOrgin, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit"));
    const search = searchParams.get("search") || "";

    const filters = search ? { orginname: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const skip = (page - 1) * limit;

        const OrginItems = await Orgin.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Orgin.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const OrginItemsWithIndex = OrginItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                orgins: OrginItemsWithIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Form items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Form items" },
            { status: 500 }
        );
    }
}