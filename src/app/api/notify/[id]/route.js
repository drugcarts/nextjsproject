import connectionToDatabase from '../../../../lib/mongodb'
import Notify from '../../../../models/Notify'
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
        const NotifyId = await Notify.findById(id);
        if (!NotifyId) {
            return NextResponse.json({ error: 'Notify not found' }, { status: 404 });
        }

        return NextResponse.json(NotifyId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Notify' }, { status: 500 });
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
        const updatedNotify = await Notify.findByIdAndUpdate(id, body, { new: true });

        if (!updatedNotify) {
            return NextResponse.json({ error: 'Notify not found' }, { status: 404 });
        }

        return NextResponse.json(updatedNotify, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Notify' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedNotify = await Notify.findByIdAndDelete(id);

        if (!deletedNotify) {
            return NextResponse.json({ error: 'Notify not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Notify deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Notify' }, { status: 500 });
    }
}
