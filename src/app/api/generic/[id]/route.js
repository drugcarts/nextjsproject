import connectionToDatabase from '../../../../lib/mongodb'
import Generic from '../../../../models/Generic'
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
        const genericId = await Generic.findById(id);
        if (!genericId) {
            return NextResponse.json({ error: 'Generic not found' }, { status: 404 });
        }

        return NextResponse.json(genericId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Generic' }, { status: 500 });
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
        const updatedGeneric = await Generic.findByIdAndUpdate(id, body, { new: true });

        if (!updatedGeneric) {
            return NextResponse.json({ error: 'Generic not found' }, { status: 404 });
        }

        return NextResponse.json(updatedGeneric, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Generic' }, { status: 500 });
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
        const deletedGeneric = await Generic.findByIdAndDelete(id);

        if (!deletedGeneric) {
            return NextResponse.json({ error: 'Generic not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Generic deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Generic' }, { status: 500 });
    }
}
