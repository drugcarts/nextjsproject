import connectionToDatabase from '../../../../lib/mongodb'
import Courier from '../../../../models/Courier'
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
        const CourierId = await Courier.findById(id);
        if (!CourierId) {
            return NextResponse.json({ error: 'Courier not found' }, { status: 404 });
        }

        return NextResponse.json(CourierId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Courier' }, { status: 500 });
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
        const updatedCourier = await Courier.findByIdAndUpdate(id, body, { new: true });

        if (!updatedCourier) {
            return NextResponse.json({ error: 'Courier not found' }, { status: 404 });
        }

        return NextResponse.json(updatedCourier, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Courier' }, { status: 500 });
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
        const deletedCourier = await Courier.findByIdAndDelete(id);

        if (!deletedCourier) {
            return NextResponse.json({ error: 'Courier not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Courier deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Courier' }, { status: 500 });
    }
}
