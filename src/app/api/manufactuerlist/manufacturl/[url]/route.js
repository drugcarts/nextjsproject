import connectionToDatabase from "../../../../../lib/mongodb";
import Manufactuer from "../../../../../models/Manufactuer";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectionToDatabase();

    const { url } = await params;
    const manufactuer = await Manufactuer.findOne({ manufactuerurl: url });
    if (!manufactuer) {
      return NextResponse.json(
        { error: "Manufactuer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(manufactuer, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching Manufactuer" },
      { status: 500 }
    );
  }
}
