import connectionToDatabase from '../../../../../lib/mongodb'
import CallDoctor from '../../../../../models/CallDoctor'
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
        const CallDoctorId = await CallDoctor.findById(id);
        if (!CallDoctorId) {
            return NextResponse.json({ error: 'Call Doctor not found' }, { status: 404 });
        }

        return NextResponse.json(CallDoctorId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Call Doctor' }, { status: 500 });
    }
}
