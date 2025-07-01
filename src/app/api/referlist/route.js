import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Reference from '../../../models/Reference';
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
            websitename,
            url
        } = await request.json();

        const isReference = await Reference.findOne({ websitename });
        if (isReference) {
            return NextResponse.json({ error: 'Website name already exist' }, { status: 401 })
        }

        const addReference = new Reference({
            websitename,
            url
        });

        await addReference.save();
        return NextResponse.json(addReference, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { websitename: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const skip = (page - 1) * limit;

        const ReferenceItems = await Reference.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Reference.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const ReferenceItemsIndex = ReferenceItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));


        return NextResponse.json(
            {
                references: ReferenceItemsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Reference items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Reference items" },
            { status: 500 }
        );
    }
}