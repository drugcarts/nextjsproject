import connectionToDatabase from '../lib/mongodb';
import User from '../models/User';
import AdminUser from '../models/AdminUser';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function authenticateUser() {
    await connectionToDatabase();
    const headersInstance = await headers();
    const token = headersInstance.get('authorization')?.split(' ')[1];

    if (!token) {
        return { success: false, message: 'Unauthorized' };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Ensure both queries resolve before checking
        let user = await User.findById(decoded.id).select('-id');
        if (!user) {
            user = await AdminUser.findById(decoded.id).select('-id');
        }

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        return { success: true, user };
    } catch (error) {
        return { success: false, message: 'Invalid or expired token' };
    }
}

export async function adminAuthorization() {
    await connectionToDatabase();
    const headersInstance = await headers();
    const token = headersInstance.get('authorization')?.split(' ')[1];

    if (!token) {
        return { success: false, message: 'Unauthorized' };
    }

    try {
        const decoded = jwt.verify(token, "admin");

        // Ensure both queries resolve before checking
        let user = await User.findById(decoded.id)
        if (!user) {
            user = await AdminUser.findById(decoded.id)
        }

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        return { success: true, user };
    } catch (error) {
        return { success: false, message: 'Invalid or expired token' };
    }
}
