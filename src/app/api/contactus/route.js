import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import ContactUs from '../../../models/ContactUs';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';

export async function POST(request) {
    try {
        await connnectionToDatabase();

        const {
            name,
            email,
            mobile,
            message,
            type
        } = await request.json();

        const addContactUs = new ContactUs({
            name,
            email,
            mobile,
            message,
            type
        });

        await addContactUs.save();
        return NextResponse.json(addContactUs, { status: 200 })
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

        const ContactUsItems = await ContactUs.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await ContactUs.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const ContactUsItemsIndex = ContactUsItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                contact_list: ContactUsItemsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching ContactUs:", error);
        return NextResponse.json(
            { error: "Failed to fetch ContactUs" },
            { status: 500 }
        );
    }
}