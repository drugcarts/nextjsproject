import connectionToDatabase from '../../../../lib/mongodb'
import ScanBooking from '../../../../models/ScanBooking'
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
        const ScanBookingId = await ScanBooking.findById(id);
        if (!ScanBookingId) {
            return NextResponse.json({ error: 'ScanBooking not found' }, { status: 404 });
        }

        return NextResponse.json(ScanBookingId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching ScanBooking' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedScanBooking = await ScanBooking.findByIdAndDelete(id);

        if (!deletedScanBooking) {
            return NextResponse.json({ error: 'ScanBooking not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'ScanBooking deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting ScanBooking' }, { status: 500 });
    }
}
