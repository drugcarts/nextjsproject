import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Serviceenquiry from '../../../models/Serviceenquiry';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';


export async function POST(request) {
    try {
        await connnectionToDatabase();

        const {
            service,
            name,
            mobile,
            email,
            city,
        } = await request.json();

        const addServiceenquiry = new Serviceenquiry({
            service,
            name,
            mobile,
            email,
            city,
        });

        await addServiceenquiry.save();
        return NextResponse.json(addServiceenquiry, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { name: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const skip = (page - 1) * limit;

        const ServiceenquiryItems = await Serviceenquiry.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Serviceenquiry.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const ServiceenquiryItemsIndex = ServiceenquiryItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                data: ServiceenquiryItemsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Questions:", error);
        return NextResponse.json(
            { error: "Failed to fetch Questions" },
            { status: 500 }
        );
    }
}