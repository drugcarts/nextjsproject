import AdminUser from "@/models/AdminUser";
import connectionToDatabase from "../../../lib/mongodb";
import Product from '../../../models/Product';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const userid = searchParams.get("id") || "";

  try {
    await connectionToDatabase();

    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.product_name = { $regex: search, $options: "i" };
    }

    if (userid) {
      query.userid = userid; // Make sure this matches your Product schema field
    }
const staffId = await AdminUser.findOne({ id: userid });
    const productItems = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalItems = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const productsWithIndex = productItems.map((product, index) => ({
      ...product.toObject(),
      sno: skip + index + 1,
    }));

    return NextResponse.json(
      {
        products: productsWithIndex,
        username: staffId?.username,
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
