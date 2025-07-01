import { authenticateUser, adminAuthorization } from '../../../../utils/middleware';
import AskOnline from '../../../../models/AskOnline';
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
        const { success, user, message } = await authenticateUser();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const {
            doctor_name,
            name,
            age,
            phone,
            gender,
            city,
            consultation,
            weight,
            height,
            medication,
            allergies,
            conditions,
            consult_type,
            payment_type
        } = await request.json();

        const addAskOnline = new AskOnline({
            userId: user?._id,
            doctor_name,
            name,
            age,
            phone,
            gender,
            city,
            consultation,
            weight,
            height,
            medication,
            allergies,
            conditions,
            consult_type,
            payment_type
        });

        await addAskOnline.save();
        return NextResponse.json(addAskOnline, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { appoinment_id: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const skip = (page - 1) * limit;

        const AskOnlineItems = await AskOnline.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await AskOnline.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const AskOnlineIndex = AskOnlineItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                ask_doctors: AskOnlineIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Ask Doctor items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Ask Doctor items" },
            { status: 500 }
        );
    }
}