import connectionToDatabase from '../../../../lib/mongodb'
import Storage from '../../../../models/Storage'
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
        const storage = await Storage.findById(id);
        if (!storage) {
            return NextResponse.json({ error: 'Storage not found' }, { status: 404 });
        }

        return NextResponse.json(storage, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Storage' }, { status: 500 });
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
        const updatedStorage = await Storage.findByIdAndUpdate(id, body, { new: true });

        if (!updatedStorage) {
            return NextResponse.json({ error: 'Storage not found' }, { status: 404 });
        }

        return NextResponse.json(updatedStorage, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Storage' }, { status: 500 });
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
        const deletedStorage = await Storage.findByIdAndDelete(id);

        if (!deletedStorage) {
            return NextResponse.json({ error: 'Storage not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Storage deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Storage' }, { status: 500 });
    }
}
