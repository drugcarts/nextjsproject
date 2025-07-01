import connectionToDatabase from "../../../../lib/mongodb";
import Product from "../../../../models/Product";
import { authenticateUser } from "../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const subcat_name = searchParams.get("subcat_name") || "";
  // const brand = searchParams.get("brand") || "";

  const filters = {};

  if (search) {
    filters.product_name = { $regex: search, $options: "i" };
  }

  if (subcat_name) {
    filters.subcat_name = { $regex: subcat_name, $options: "i" };
  }

  // if (brand) {
  //     filters.brand = { $regex: brand, $options: "i" };
  // }

  try {
    await connectionToDatabase();

    const skip = (page - 1) * limit;

    const ProductItems = await Product.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit);

    const totalItems = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalItems / limit);

    const ProductItemsWithIndex = ProductItems.map((item, index) => ({
      ...item.toObject(),
      sno: skip + index + 1,
    }));

    return NextResponse.json(
      {
        products: ProductItemsWithIndex,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Product items:", error);
    return NextResponse.json(
      { error: "Failed to fetch Product items" },
      { status: 500 }
    );
  }
}
