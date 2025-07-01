import connectionToDatabase from '@/lib/mongodb'
import User from '@/models/User'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    await connectionToDatabase();
    const { email, password } = await request.json();

    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 401 })
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
        }

        const token = jwt.sign({ id: user._id }, 'test', { expiresIn: '1h' });
        return NextResponse.json({token}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
