import connectionToDatabase from '../../../../../lib/mongodb'
import DoctorBooking from '../../../../../models/DoctorBooking'
import { authenticateUser, adminAuthorization } from '../../../../../utils/middleware';
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }
        const { id } = await params;
        const DoctorBookingId = await DoctorBooking.findById(id);
        if (!DoctorBookingId) {
            return NextResponse.json({ error: 'Doctor Booking not found' }, { status: 404 });
        }

        return NextResponse.json(DoctorBookingId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Doctor Booking' }, { status: 500 });
    }
}
