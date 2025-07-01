import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import VideoFeedback from '../../../models/VideoFeedback';
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
            uploadvideo,
            discount,
            status
        } = await request.json();

        const addVideoFeedback = new VideoFeedback({
            userId: user?._id,
            username,
            phone,
            useremail,
            uploadvideo,
            discount,
            status
        });

        await addVideoFeedback.save();
        return NextResponse.json(addVideoFeedback, { status: 200 })
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

        const VideoFeedbackItems = await VideoFeedback.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await VideoFeedback.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const VideoFeedbackItemsIndex = VideoFeedbackItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                videoFeedbacks: VideoFeedbackItemsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching VideoFeedback items:", error);
        return NextResponse.json(
            { error: "Failed to fetch VideoFeedback items" },
            { status: 500 }
        );
    }
}