import connnectionToDatabase from "../../../../../lib/mongodb";
import Category from "../../../../../models/Category";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connnectionToDatabase();

    const { url } = await params;

    const CategoryId = await Category.findOne({ url });
    if (!CategoryId) {
      return NextResponse.json(
        { error: "Category url not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(CategoryId, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching Category url" },
      { status: 500 }
    );
  }
}
