import { NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import nodemailer from "nodemailer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { DateFormat } from "@/utils/dateFormat";

export async function POST(req) {
    if (req.method !== "POST") {
        return NextResponse.json({ message: "Only POST requests allowed" }, { status: 405 });
    }

    const { to, subject, message } = await req.json();
    const jsonParse = JSON.parse(message);

    const htmlContent = `<!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice - Million Health Pharmaceuticals</title>
  <style>
  .container {
    width: 90%;
    margin: 0 auto;
    padding: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  table, th, td {
    border: 1px solid #000;
  }
  th, td {
    padding: 8px;
    text-align: left;
  }
  .no-border td {
    border: none;
  }
  .center {
    text-align: center;
  }
  .bold {
    font-weight: bold;
  }
  </style>
  </head>
  <body>
    <div class="">
            <strong><h1>Hi ${jsonParse.notname}</h1></strong>
            <h4>${jsonParse.notproname} is Available </h4>
            <a href="https://main.diinz06zqqfgz.amplifyapp.com/product/${jsonParse.notprourl}" target="_blank">View Product</a>
    </div>
  </body>
  </html>`;

    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlContent,
        };

        const info = await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Email sent successfully!", info });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to send email", error: error.message },
            { status: 500 }
        );
    }
}
