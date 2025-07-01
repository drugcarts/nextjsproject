import connectionToDatabase from '@/lib/mongodb'
import User from '@/models/User'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import axios from 'axios';

export async function POST(req) {
  await connectionToDatabase()
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    const isUser = await User.findOne({ phone })

    if (isUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

    // Store OTP in a temporary memory (Use Redis/DB for production)
    if (!global.otpStore) {
      global.otpStore = {};
    }
    global.otpStore[phone] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // Expires in 5 min

    console.log(process.env.INSTANTALERTS_API_KEY)
    // InstantAlerts API Request
    await axios.post("https://instantalerts.co/api/web/send", {
      apikey: process.env.INSTANTALERTS_API_KEY,
      sender: process.env.INSTANTALERTS_SENDER_ID,
      to: phone,
      message: `Your Signup OTP for Drugcarts is ${otp} Regards, ${process.env.INSTANTALERTS_SENDER_ID}`,
      format: "json",
    });

    return NextResponse.json({ success: true, message: "OTP sent successfully!", otp }); // Remove OTP in production
  } catch (error) {
    console.error("InstantAlerts API Error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to send OTP", details: error.message }, { status: 500 });
  }
}