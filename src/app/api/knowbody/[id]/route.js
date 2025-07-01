import connectionToDatabase from '../../../../lib/mongodb'
import KnowBody from '../../../../models/KnowBody'
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
        const KnowBodyId = await KnowBody.findById(id);
        if (!KnowBodyId) {
            return NextResponse.json({ error: 'KnowBody not found' }, { status: 404 });
        }

        return NextResponse.json(KnowBodyId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching KnowBody' }, { status: 500 });
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
        const updatedKnowBody = await KnowBody.findByIdAndUpdate(id, body, { new: true });

        if (!updatedKnowBody) {
            return NextResponse.json({ error: 'KnowBody not found' }, { status: 404 });
        }

        return NextResponse.json(updatedKnowBody, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating KnowBody' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedKnowBody = await KnowBody.findByIdAndDelete(id);

        if (!deletedKnowBody) {
            return NextResponse.json({ error: 'KnowBody not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'KnowBody deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting KnowBody' }, { status: 500 });
    }
}
