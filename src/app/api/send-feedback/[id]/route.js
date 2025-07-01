import connectionToDatabase from '../../../../lib/mongodb'
import SendFeedback from '../../../../models/SendFeedback'
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
        const SendFeedbackId = await SendFeedback.findById(id);
        if (!SendFeedbackId) {
            return NextResponse.json({ error: 'SendFeedback not found' }, { status: 404 });
        }

        return NextResponse.json(SendFeedbackId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching SendFeedback' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedSendFeedback = await SendFeedback.findByIdAndDelete(id);

        if (!deletedSendFeedback) {
            return NextResponse.json({ error: 'SendFeedback not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'SendFeedback deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting SendFeedback' }, { status: 500 });
    }
}
