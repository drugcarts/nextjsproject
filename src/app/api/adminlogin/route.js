import connectionToDatabase from '@/lib/mongodb'
import AdminUser from '../../../models/AdminUser'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { adminAuthorization } from '@/utils/middleware';

export async function POST(request) {
    await connectionToDatabase();
    const { email, password } = await request.json();

    try {
        const user = await AdminUser.findOne({ email });
        console.log("user", user);
        if (!user) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 401 })
        }


        if (password !== user.password) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
        }

        const token = jwt.sign({ id: user._id }, "admin");
        return NextResponse.json({ token, role: user?.role }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const { success, user, message } = await adminAuthorization();
        console.log('user', user);
        
        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}