import connectionToDatabase from '../../../../lib/mongodb'
import HealthVideo from '../../../../models/HealthVideo'
import { authenticateUser, adminAuthorization } from '../../../../utils/middleware';
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connectionToDatabase();

        const { id } = await params;
        const HealthVideoId = await HealthVideo.findById(id);
        if (!HealthVideoId) {
            return NextResponse.json({ error: 'Health Video not found' }, { status: 404 });
        }

        return NextResponse.json(HealthVideoId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Health Video' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }
        const { id } = await params;
        const body = await request.json();
        const updatedHealthVideo = await HealthVideo.findByIdAndUpdate(id, body, { new: true });

        if (!updatedHealthVideo) {
            return NextResponse.json({ error: 'Health Video not found' }, { status: 404 });
        }

        return NextResponse.json(updatedHealthVideo, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Health Video' }, { status: 500 });
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
        const deletedHealthVideo = await HealthVideo.findByIdAndDelete(id);

        if (!deletedHealthVideo) {
            return NextResponse.json({ error: 'Health Video not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Health Video deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Health Video' }, { status: 500 });
    }
}
