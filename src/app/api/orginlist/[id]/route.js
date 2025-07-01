import connectionToDatabase from '../../../../lib/mongodb'
import Orgin from '../../../../models/Orgin'
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
        const OrginId = await Orgin.findById(id);
        if (!OrginId) {
            return NextResponse.json({ error: 'Orgin not found' }, { status: 404 });
        }

        return NextResponse.json(OrginId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Orgin' }, { status: 500 });
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
        const updatedOrgin = await Orgin.findByIdAndUpdate(id, body, { new: true });

        if (!updatedOrgin) {
            return NextResponse.json({ error: 'Orgin not found' }, { status: 404 });
        }

        return NextResponse.json(updatedOrgin, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Orgin' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedOrgin = await Orgin.findByIdAndDelete(id);

        if (!deletedOrgin) {
            return NextResponse.json({ error: 'Orgin not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Orgin deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Orgin' }, { status: 500 });
    }
}
