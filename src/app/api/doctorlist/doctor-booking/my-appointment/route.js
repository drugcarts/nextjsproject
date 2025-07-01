import { authenticateUser } from '../../../../../utils/middleware';
import DoctorBooking from '../../../../../models/DoctorBooking';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';

export async function GET(req) {
    try {
        await connnectionToDatabase();
        const { success, user, message } = await authenticateUser();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const { searchParams } = new URL(req.url);
        const startDate = searchParams.get("startDate") || "";
        const endDate = searchParams.get("endDate") || "";

        let query = { userId: user._id };

        if (startDate && endDate) {
            query.date = {
                $gte: new Date(`${startDate}T00:00:00.000Z`),
                $lte: new Date(`${endDate}T23:59:59.999Z`)
            };
        }

console.log("query");

        const userWithDoctorBookings = await DoctorBooking.find(query);

        return NextResponse.json(userWithDoctorBookings, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Error fetching My Appointment" }, { status: 500 });
    }
}