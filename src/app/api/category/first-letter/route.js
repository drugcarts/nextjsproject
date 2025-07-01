import Category from "../../../../models/Category";
import { NextResponse } from "next/server";
import connnectionToDatabase from "@/lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 12;
  const cat_type = searchParams.get("cat_type") || "";

  try {
    await connnectionToDatabase();
    const skip = (page - 1) * limit;

    // ✅ Extract the first letter of the search query
    const firstLetter = search.charAt(0).toUpperCase();

    // ✅ Create dynamic query
    let query = {};

    if (search) {
      query.category_name = { $regex: `^${firstLetter}`, $options: "i" };
    }

    if (cat_type) {
      query.cat_type = cat_type;
    }

    // ✅ Fetch sorted categories with pagination
    const categories = await Category.find(query)
      .sort({ category_name: 1 }) // Sort alphabetically
      .skip(skip)
      .limit(limit);

    // ✅ Count total items for pagination
    const totalItems = await Category.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json(
      {
        categories,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching category items:", error);
    return NextResponse.json(
      { error: "Failed to fetch category items" },
      { status: 500 }
    );
  }
}
