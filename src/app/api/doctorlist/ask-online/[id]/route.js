import connectionToDatabase from '../../../../../lib/mongodb'
import AskOnline from '../../../../../models/AskOnline'
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
        const AskOnlineId = await AskOnline.findById(id);
        if (!AskOnlineId) {
            return NextResponse.json({ error: 'Ask Doctor not found' }, { status: 404 });
        }

        return NextResponse.json(AskOnlineId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Ask Doctor' }, { status: 500 });
    }
}
