// app/api/payu/initiate/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  const { amount } = await req.json();

  const key = process.env.PAYU_KEY;
  const salt = process.env.PAYU_SALT;
  const txnid = "txn_" + Date.now();
  const productinfo = "Test Product";
  const firstname = "John";
  const email = "john@example.com";
  const phone = "9999999999";
  const surl = "http://192.168.0.104:3000/api/payu/success";
  const furl = "http://192.168.0.104:3000/api/payu/failure";

  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${salt}`;
  const hash = crypto.createHash("sha512").update(hashString).digest("hex");

  const formFields = {
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    phone,
    surl,
    furl,
    hash,
    service_provider: "payu_paisa",
  };
  console.log(formFields, "SUCCESS");

  return NextResponse.json({ formFields });
}
