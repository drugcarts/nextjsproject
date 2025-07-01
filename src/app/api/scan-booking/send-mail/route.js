import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    if (req.method !== "POST") {
        return NextResponse.json({ message: "Only POST requests allowed" }, { status: 405 });
    }

    const { to, subject, message } = await req.json();
    console.log("Message received:", message); // Check the format of 'message'

    let jsonParse;
    try {
        // Parse the JSON message string
        jsonParse = JSON.parse(message);
    } catch (error) {
        console.error("Failed to parse message:", error);
        return NextResponse.json({ message: "Invalid message format", error: error.message }, { status: 400 });
    }

    // Check if required fields exist in the parsed object
    if (!jsonParse.scanName || !jsonParse.city || !jsonParse.name) {
        return NextResponse.json({
            message: "Missing required fields in the message.",
            error: "Missing data",
        }, { status: 400 });
    }

    const htmlContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Scan Booking Confirmation</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f4f4f4">
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" width="600" style="margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 5px rgba(0,0,0,0.1); padding: 20px;">
            <tr>
              <td style="text-align: center; padding: 10px 0 20px;">
                <h2 style="margin: 0; color: #333;">${jsonParse.name} Scan Booking Details</h2>
              </td>
            </tr>

            <!-- Details Table -->
            <tr>
              <td>
                <table cellpadding="10" cellspacing="0" width="100%" style="border-collapse: collapse;">
                  <tr style="background-color: #f9f9f9;">
                    <td width="30%" style="font-weight: bold;">Scan Name:</td>
                    <td>${jsonParse.scanName}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">City:</td>
                    <td>${jsonParse.city}</td>
                  </tr>
                  <tr style="background-color: #f9f9f9;">
                    <td style="font-weight: bold;">Centre:</td>
                    <td>${jsonParse.centre}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Test:</td>
                    <td>${jsonParse.test}</td>
                  </tr>
                  <tr style="background-color: #f9f9f9;">
                    <td style="font-weight: bold;">Name:</td>
                    <td>${jsonParse.name}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Email:</td>
                    <td>${jsonParse.email}</td>
                  </tr>
                  <tr style="background-color: #f9f9f9;">
                    <td style="font-weight: bold;">Phone:</td>
                    <td>${jsonParse.phone}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Date:</td>
                    <td>${jsonParse.date}</td>
                  </tr>
                  <tr style="background-color: #f9f9f9;">
                    <td style="font-weight: bold;">Address:</td>
                    <td>${jsonParse.address}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Subject:</td>
                    <td>${jsonParse.subject}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Web Link:</td>
                    <td> <a href="https://main.diinz06zqqfgz.amplifyapp.com/admin/scan-bookings/${jsonParse._id}" target="_blank">View data</a></td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="text-align: center; padding: 20px 0; color: #999; font-size: 12px;">
                Thank you for booking with us.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

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
        console.error("Error sending email:", error);
        return NextResponse.json(
            { message: "Failed to send email", error: error.message },
            { status: 500 }
        );
    }
}
