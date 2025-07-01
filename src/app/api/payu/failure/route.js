// app/api/payment/failure/route.js

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Optional: read and log form data
    const formData = await req.formData();
    const txnid = formData.get('txnid');
    const amount = formData.get('amount');
    console.log('Failure POST data:', Object.fromEntries(formData));

    return NextResponse.redirect(`https://main.diinz06zqqfgz.amplifyapp.com/failure?txnid=${txnid}&amount=${amount}&status=failure`, { status: 302 });
  } catch (err) {
    console.error('Error in failure route:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
