import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import ScanBooking from '../../../models/ScanBooking';
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

        const {
            scanName,
            city,
            centre,
            test,
            address,
            name,
            phone,
            email,
            date,
            subject
        } = await request.json();

        const addScanBooking = new ScanBooking({
            scanName,
            city,
            centre,
            test,
            address,
            name,
            phone,
            email,
            date,
            subject
        });

        await addScanBooking.save();
        return NextResponse.json(addScanBooking, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { scanName: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const skip = (page - 1) * limit;

        const ScanBookingItems = await ScanBooking.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await ScanBooking.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const ScanBookingItemsWithIndex = ScanBookingItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                scan_bookings: ScanBookingItemsWithIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching ScanBooking items:", error);
        return NextResponse.json(
            { error: "Failed to fetch ScanBooking items" },
            { status: 500 }
        );
    }
}