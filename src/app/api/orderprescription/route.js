import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import OrderPrescription from '../../../models/OrderPrescription';
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
        const {
            enquirytype,
            rximage,
            type,
            cus_name,
            lastname,
            phone,
            email,
            address,
            postcode,
            state,
            country,
            town
        } = await request.json();

        const addOrderPrescription = new OrderPrescription({
            userId: user?._id,
            enquirytype,
            rximage,
            type,
            cus_name,
            lastname,
            phone,
            email,
            address,
            postcode,
            state,
            country,
            town
        });

        await addOrderPrescription.save();
        return NextResponse.json(addOrderPrescription, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { phone: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const skip = (page - 1) * limit;

        const OrderPrescriptionItems = await OrderPrescription.find(filters)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await OrderPrescription.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const OrderPrescriptionIndex = OrderPrescriptionItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                order_prescriptions: OrderPrescriptionIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching OrderPrescription items:", error);
        return NextResponse.json(
            { error: "Failed to fetch OrderPrescription items" },
            { status: 500 }
        );
    }
}