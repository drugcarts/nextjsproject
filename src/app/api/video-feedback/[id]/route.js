import connectionToDatabase from '../../../../lib/mongodb'
import VideoFeedback from '../../../../models/VideoFeedback'
import { authenticateUser, adminAuthorization } from '../../../../utils/middleware';
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }
        const { id } = await params;
        const VideoFeedbackId = await VideoFeedback.findById(id);
        if (!VideoFeedbackId) {
            return NextResponse.json({ error: 'VideoFeedback not found' }, { status: 404 });
        }

        return NextResponse.json(VideoFeedbackId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching VideoFeedback' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        if (user?.role !== "admin") {
            return NextResponse.json({ error: 'Permission not found' }, { status: 404 });
        }

        const { id } = await params;
        const body = await request.json();
        const updatedVideoFeedback = await VideoFeedback.findByIdAndUpdate(id, body, { new: true });

        if (!updatedVideoFeedback) {
            return NextResponse.json({ error: 'VideoFeedback not found' }, { status: 404 });
        }

        return NextResponse.json(updatedVideoFeedback, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating VideoFeedback' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        if (user?.role !== "admin") {
            return NextResponse.json({ error: 'Permission not found' }, { status: 404 });
        }

        const { id } = await params;
        const deletedVideoFeedback = await VideoFeedback.findByIdAndDelete(id);

        if (!deletedVideoFeedback) {
            return NextResponse.json({ error: 'VideoFeedback not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'VideoFeedback deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting VideoFeedback' }, { status: 500 });
    }
}
