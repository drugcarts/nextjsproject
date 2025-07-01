import connectionToDatabase from "../../../../../lib/mongodb";
import Pack from "../../../../../models/Pack";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectionToDatabase();

    const { packid } = await params;
    const pack = await Pack.findOne({ packid: packid });
    if (!pack) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json(pack, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching Package" },
      { status: 500 }
    );
  }
}
