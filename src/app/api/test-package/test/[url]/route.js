import connectionToDatabase from "../../../../../lib/mongodb";
import TestPackage from "../../../../../models/TestPackage";
import { authenticateUser } from "../../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectionToDatabase();

    const { url } = await params;
    const TestUrl = await TestPackage.findOne({ url });
    if (!TestUrl) {
      return NextResponse.json(
        { error: "Test Url not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(TestUrl, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching Test Url" }, { status: 500 });
  }
}
