import connectionToDatabase from '../../../../lib/mongodb'
import Pack from '../../../../models/Pack'
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
        const pack = await Pack.findById(id);
        if (!pack) {
            return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
        }

        return NextResponse.json(pack, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Pack' }, { status: 500 });
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
        const updatedPack = await Pack.findByIdAndUpdate(id, body, { new: true });

        if (!updatedPack) {
            return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
        }

        return NextResponse.json(updatedPack, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Pack' }, { status: 500 });
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
        const deletedPack = await Pack.findByIdAndDelete(id);

        if (!deletedPack) {
            return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Pack deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Pack' }, { status: 500 });
    }
}
