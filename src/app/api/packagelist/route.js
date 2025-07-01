import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Pack from '../../../models/Pack';
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
            packagename,
        } = await request.json();

        const isPack = await Pack.findOne({ packagename });
        if (isPack) {
            return NextResponse.json({ error: 'Pack already exist' }, { status: 401 })
        }

        const addPack = new Pack({
            packagename
        });


        await addPack.save();
        return NextResponse.json(addPack, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit"));
    const search = searchParams.get("search") || "";

    const filters = search ? { packagename: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const skip = (page - 1) * limit;

        const PackItems = await Pack.find(filters)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Pack.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const PackItemsIndex = PackItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                packages: PackItemsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Pack items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Pack items" },
            { status: 500 }
        );
    }
}