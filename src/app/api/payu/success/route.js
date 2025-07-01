// app/api/payment/failure/route.js

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Optional: read and log form data
    const formData = await req.formData();
    const txnid = formData.get('txnid');
    const amount = formData.get('amount');
    console.log('Success POST data:', Object.fromEntries(formData));

    return NextResponse.redirect(`https://main.diinz06zqqfgz.amplifyapp.com/success?txnid=${txnid}&amount=${amount}&status=success`, { status: 302 });
  } catch (err) {
    console.error('Error in success route:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
