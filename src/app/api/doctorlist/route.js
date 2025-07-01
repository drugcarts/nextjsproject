import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import DoctorList from '../../../models/DoctorList';
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
            specialist_name,
            specialist_url,
            doctor_name,
            url,
            picture,
            imagealt,
            doctor_no,
            gender,
            email,
            phone,
            language,
            experience,
            qualification,
            consult_fees,
            pwh,
            cwh_name,
            ug_degree,
            ug_city,
            ug_certificate,
            pg_degree,
            pg_city,
            pg_certificate,
            country,
            state,
            city,
            address,
        } = await request.json();

        const isDoctorList = await DoctorList.findOne({ doctor_name });
        if (isDoctorList) {
            return NextResponse.json({ error: 'Doctor Name already exist' }, { status: 401 })
        }

        const addDoctorList = new DoctorList({
            userId: user?._id,
            specialist_name,
            specialist_url,
            doctor_name,
            url,
            picture,
            imagealt,
            doctor_no,
            gender,
            email,
            phone,
            language,
            experience,
            qualification,
            consult_fees,
            pwh,
            cwh_name,
            ug_degree,
            ug_city,
            ug_certificate,
            pg_degree,
            pg_city,
            pg_certificate,
            country,
            state,
            city,
            address,
        });

        await addDoctorList.save();
        return NextResponse.json(addDoctorList, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { doctor_name: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const skip = (page - 1) * limit;

        const DoctorListItems = await DoctorList.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await DoctorList.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const DoctorListIndex = DoctorListItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                doctor_list: DoctorListIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching DoctorList items:", error);
        return NextResponse.json(
            { error: "Failed to fetch DoctorList items" },
            { status: 500 }
        );
    }
}