import connectionToDatabase from '../../../../lib/mongodb'
import Reference from '../../../../models/Reference'
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
        const ReferenceId = await Reference.findById(id);
        if (!ReferenceId) {
            return NextResponse.json({ error: 'Reference not found' }, { status: 404 });
        }

        return NextResponse.json(ReferenceId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Reference' }, { status: 500 });
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
        const updatedReference = await Reference.findByIdAndUpdate(id, body, { new: true });

        if (!updatedReference) {
            return NextResponse.json({ error: 'Reference not found' }, { status: 404 });
        }

        return NextResponse.json(updatedReference, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Reference' }, { status: 500 });
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
        const deletedReference = await Reference.findByIdAndDelete(id);

        if (!deletedReference) {
            return NextResponse.json({ error: 'Reference not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Reference deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Reference' }, { status: 500 });
    }
}
