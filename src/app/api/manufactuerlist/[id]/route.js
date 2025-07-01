import connectionToDatabase from '../../../../lib/mongodb'
import Manufactuer from '../../../../models/Manufactuer'
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
        const manufactuer = await Manufactuer.findById(id);
        if (!manufactuer) {
            return NextResponse.json({ error: 'manufactuer not found' }, { status: 404 });
        }

        return NextResponse.json(manufactuer, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching manufactuer' }, { status: 500 });
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
        const updatedManufactuer = await Manufactuer.findByIdAndUpdate(id, body, { new: true });

        if (!updatedManufactuer) {
            return NextResponse.json({ error: 'Manufactuer not found' }, { status: 404 });
        }

        return NextResponse.json(updatedManufactuer, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Manufactuer' }, { status: 500 });
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
        const deletedManufactuer = await Manufactuer.findByIdAndDelete(id);

        if (!deletedManufactuer) {
            return NextResponse.json({ error: 'Manufactuer not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Manufactuer deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Manufactuer' }, { status: 500 });
    }
}
