import connectionToDatabase from "../../../../../lib/mongodb";
import Storage from "../../../../../models/Storage";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectionToDatabase();

    const { storageid } = await params;
    const storage = await Storage.findOne({ storageid: storageid });
    if (!storage) {
      return NextResponse.json({ error: "Storage not found" }, { status: 404 });
    }

    return NextResponse.json(storage, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching Storage" },
      { status: 500 }
    );
  }
}
