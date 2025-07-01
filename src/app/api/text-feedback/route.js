import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import TextFeedback from '../../../models/TextFeedback';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';

export async function POST(request) {
    try {
        await connnectionToDatabase();
        const { success, user, message } = await authenticateUser();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const {
            username,
            phone,
            useremail,
            address,
            discount,
            status
        } = await request.json();

        const addTextFeedback = new TextFeedback({
            userId: user?._id,
            username,
            phone,
            useremail,
            address,
            discount,
            status
        });

        await addTextFeedback.save();
        return NextResponse.json(addTextFeedback, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { username: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const skip = (page - 1) * limit;

        const TextFeedbackItems = await TextFeedback.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await TextFeedback.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const TextFeedbackItemsIndex = TextFeedbackItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                textFeedbacks: TextFeedbackItemsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching TextFeedback items:", error);
        return NextResponse.json(
            { error: "Failed to fetch TextFeedback items" },
            { status: 500 }
        );
    }
}