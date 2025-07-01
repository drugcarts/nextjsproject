import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const body = await req.json();
    const { txnid, amount, firstname, email, phone, productinfo } = body;

    const key = process.env.PAYU_KEY;
    const salt = process.env.PAYU_SALT;
    const action = process.env.PAYU_BASE_URL;

    if (!key || !salt || !action) {
      return NextResponse.json({ error: 'Missing PayU credentials' }, { status: 500 });
    }

    // ✅ Dynamic success and failure URLs with params
    const surl = `https://main.diinz06zqqfgz.amplifyapp.com/api/payu/success`;
    const furl = `https://main.diinz06zqqfgz.amplifyapp.com/api/payu/failure`;

    // ✅ Hash required by PayU
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    return NextResponse.json({
      key,
      txnid,
      amount,
      firstname,
      email,
      phone,
      productinfo,
      surl,
      furl,
      hash,
      action,
      service_provider: 'payu_paisa',
    }, { status: 200 });
  } catch (error) {
    console.error('PayU POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
