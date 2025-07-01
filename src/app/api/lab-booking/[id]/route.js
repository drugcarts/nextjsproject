import connectionToDatabase from '../../../../lib/mongodb'
import LabBooking from '../../../../models/LabBooking'
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
        const LabBookingId = await LabBooking.findById(id);
        if (!LabBookingId) {
            return NextResponse.json({ error: 'Lab Booking not found' }, { status: 404 });
        }

        return NextResponse.json(LabBookingId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Lab Booking' }, { status: 500 });
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
        const updatedLabBooking = await LabBooking.findByIdAndUpdate(id, body, { new: true });

        if (!updatedLabBooking) {
            return NextResponse.json({ error: 'Lab Booking not found' }, { status: 404 });
        }

        return NextResponse.json(updatedLabBooking, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Lab Booking' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedLabBooking = await LabBooking.findByIdAndDelete(id);

        if (!deletedLabBooking) {
            return NextResponse.json({ error: 'Lab Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Lab Booking deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Lab Booking' }, { status: 500 });
    }
}
