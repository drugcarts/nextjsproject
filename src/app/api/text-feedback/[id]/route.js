import connectionToDatabase from '../../../../lib/mongodb'
import TextFeedback from '../../../../models/TextFeedback'
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
        const TextFeedbackId = await TextFeedback.findById(id);
        if (!TextFeedbackId) {
            return NextResponse.json({ error: 'TextFeedback not found' }, { status: 404 });
        }

        return NextResponse.json(TextFeedbackId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching TextFeedback' }, { status: 500 });
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
        const updatedTextFeedback = await TextFeedback.findByIdAndUpdate(id, body, { new: true });

        if (!updatedTextFeedback) {
            return NextResponse.json({ error: 'TextFeedback not found' }, { status: 404 });
        }

        return NextResponse.json(updatedTextFeedback, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating TextFeedback' }, { status: 500 });
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
        const deletedTextFeedback = await TextFeedback.findByIdAndDelete(id);

        if (!deletedTextFeedback) {
            return NextResponse.json({ error: 'TextFeedback not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'TextFeedback deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting TextFeedback' }, { status: 500 });
    }
}
