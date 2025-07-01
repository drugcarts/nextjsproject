import connectionToDatabase from '@/lib/mongodb'
import User from '../../../../models/User'
import { adminAuthorization, authenticateUser } from '../../../../utils/middleware';
import { NextResponse } from 'next/server'

export async function GET() {
    const { success, user, message } = await adminAuthorization();

    if (!success) {
        return NextResponse.json({ error: message }, { status: 401 })
    }

    const all_users = await User.find({});
    
    return NextResponse.json(all_users, { status: 200 })
}