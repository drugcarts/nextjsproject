import connectionToDatabase from '@/lib/mongodb'
import User from '@/models/User'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import axios from 'axios';

export async function GET(request, response) {
  try {
    await connectionToDatabase()
    const user = await User.find();
    if (user) {
      return NextResponse.json(user, { status: 200 })
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


// export async function POST(request) {
//     try {
//         await connectionToDatabase()
//         const { email, password } = await request.json()
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return NextResponse.json({ error: 'User alreay exist' }, { status: 400 })
//         } else {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             const newUser = new User({ email, password: hashedPassword });
//             await newUser.save()
//             return NextResponse.json(newUser, { status: 200 })
//         }
//     } catch (error) {
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
//     }
// }

// export async function POST(req) {
//     try {
//       const { phone } = await req.json();
//       if (!phone) {
//         return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
//       }

//       const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
//       const message = Your OTP code is ${otp}. It is valid for 5 minutes.; 

//       console.log("Sending OTP to:", message);

//       // InstantAlerts API Request
//       const response = await axios.post("https://instantalerts.co/api/web/send", {
//         apikey: process.env.INSTANTALERTS_API_KEY,
//         sender: process.env.INSTANTALERTS_SENDER_ID,
//         to: phone,
//         message: "Your Signup OTP for Drugcarts is  Regards, DRGCRT",
//         format: "json",
//       });

//       console.log("InstantAlerts API Response:", response.data); // Log full response

//       return NextResponse.json({ success: true, message: "OTP sent successfully!", data: response.data });
//     } catch (error) {
//       console.error("InstantAlerts API Error:", error.response?.data || error.message);

//       return NextResponse.json(
//         { error: "Failed to send OTP", details: error.response?.data || error.message },
//         { status: 500 }
//       );
//     }
//   }

export async function POST(req) {
  try {
    await connectionToDatabase()
    const { phone } = await req.json();

    const isUser = await User.findOne({ phone: phone })
    console.log(isUser);
    
    if (!isUser) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
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