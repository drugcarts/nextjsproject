import { authenticateUser, adminAuthorization } from '../../../../utils/middleware';
import DoctorBooking from '../../../../models/DoctorBooking';
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
            email,
            age,
            phone,
            gender,
            city,
            date,
            time,
            payment_type
        } = await request.json();

        const addDoctorBooking = new DoctorBooking({
            userId: user?._id,
            doctor_name,
            name,
            email,
            age,
            phone,
            gender,
            city,
            date,
            time,
            payment_type
        });

        await addDoctorBooking.save();
        return NextResponse.json(addDoctorBooking, { status: 200 })
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

        const DoctorBookingItems = await DoctorBooking.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await DoctorBooking.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const DoctorBookingIndex = DoctorBookingItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                doctor_bookings: DoctorBookingIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Doctor Booking items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Doctor Booking items" },
            { status: 500 }
        );
    }
}