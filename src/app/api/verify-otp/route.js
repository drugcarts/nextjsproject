import connnectionToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await connnectionToDatabase()
    const { phone, otp, username } = await req.json();
    console.log(username);


    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone and OTP are required" }, { status: 400 });
    }

    if (!global.otpStore || !global.otpStore[phone]) {
      return NextResponse.json({ error: "Invalid phone number or OTP expired" }, { status: 400 });
    }

    if (global.otpStore[phone].otp !== parseInt(otp)) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (Date.now() > global.otpStore[phone].expiresAt) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    delete global.otpStore[phone]; // Remove OTP after verification
    const existingUserser = await User.findOne({ phone });
    if (existingUserser) {
      const token = jwt.sign({ id: existingUserser._id }, process.env.JWT_SECRET_KEY);
      return NextResponse.json({ token, success: true, message: "login successfully!", loginUser: existingUserser?.username }, { status: 200 })
    }
    const newUser = new User({ username: username, phone: phone });
    await newUser.save()
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
    // return NextResponse.json(newUser, { status: 200 })
    return NextResponse.json({ token, success: true, message: "Register successfully!", data: newUser }, { status: 200 })



    // return NextResponse.json({ success: true, message: "OTP verified successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
