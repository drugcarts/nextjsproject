import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Location from '../../../models/Location';
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
            state,
            location,
            pincode,
            status,
        } = await request.json();

        const isLocation = await Location.findOne({ state });
        if (isLocation) {
            return NextResponse.json({ error: 'state already exist' }, { status: 404 })
        }

        const isPinCode = await Location.findOne({ pincode });
        if (isPinCode) {
            return NextResponse.json({ error: 'pincode already exist' }, { status: 404 })
        }

        const addLocation = new Location({
            state,
            location,
            pincode,
            status,
        });

        await addLocation.save();
        return NextResponse.json(addLocation, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { pincode: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const skip = (page - 1) * limit;

        const LocationItems = await Location.find(filters)
            .sort({ updated_at: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Location.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const LocationIndex = LocationItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                locaton_lists: LocationIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Location items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Location items" },
            { status: 500 }
        );
    }
}