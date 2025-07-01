import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Manufactuer from '../../../models/Manufactuer';
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
            manufactuername,
            manufactuerurl,
            manufactueraddress,
            metatitle,
            metakeyword,
            metadesc
        } = await request.json();

        const isManufactuer = await Manufactuer.findOne({ manufactuername });
        if (isManufactuer) {
            return NextResponse.json({ error: 'Manufactuer already exist' }, { status: 401 })
        }

        const addManufactuer = new Manufactuer({
            manufactuername,
            manufactuerurl,
            manufactueraddress,
            metatitle,
            metakeyword,
            metadesc
        });
        await addManufactuer.save();
        return NextResponse.json(addManufactuer, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit"));
    const search = searchParams.get("search") || "";

    const filters = search ? { manufactuername: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const skip = (page - 1) * limit;

        const manufactuerItems = await Manufactuer.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Manufactuer.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const manufactuerItemsWithIndex = manufactuerItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                manufactuers: manufactuerItemsWithIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching manufactuer items:", error);
        return NextResponse.json(
            { error: "Failed to fetch manufactuer items" },
            { status: 500 }
        );
    }
}