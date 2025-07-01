import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import SendFeedback from '../../../models/SendFeedback';
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
            comments,
            rating,
            ratingStatus,
            username,
            picture,
        } = await request.json();

        const addSendFeedback = new SendFeedback({
            comments,
            rating,
            ratingStatus,
            username,
            picture,
        });

        await addSendFeedback.save();
        return NextResponse.json(addSendFeedback, { status: 200 })
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

        // const { success, user, message } = await adminAuthorization();

        // if (!success) {
        //     return NextResponse.json({ error: message }, { status: 401 })
        // }

        const skip = (page - 1) * limit;

        const SendFeedbackItems = await SendFeedback.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await SendFeedback.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const SendFeedbackItemsWithIndex = SendFeedbackItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                send_feedbacks: SendFeedbackItemsWithIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching SendFeedback items:", error);
        return NextResponse.json(
            { error: "Failed to fetch SendFeedback items" },
            { status: 500 }
        );
    }
}