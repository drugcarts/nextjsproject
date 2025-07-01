import connectionToDatabase from "../../../../../lib/mongodb";
import Subcategory from "../../../../../models/SubCategory";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectionToDatabase();

    const { url } = await params;
    const subcategoryId = await Subcategory.find({ cat_name: url });
    if (!subcategoryId) {
      return NextResponse.json(
        { error: "Sub Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(subcategoryId, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching Sub Category" }, { status: 500 });
  }
}
