import connectionToDatabase from "../../../../../lib/mongodb";
import TestPackage from "../../../../../models/TestPackage";
import { authenticateUser } from "../../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectionToDatabase();

    const { url } = await params;
    const TestPackageId = await TestPackage.find({ packageurl: url });
    if (!TestPackageId) {
      return NextResponse.json(
        { error: "TestPackage Url not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(TestPackageId, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching TestPackage Url" }, { status: 500 });
  }
}
