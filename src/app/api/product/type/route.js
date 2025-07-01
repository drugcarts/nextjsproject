import connectionToDatabase from "../../../../lib/mongodb";
import Product from "../../../../models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const product_type = searchParams.get("type") || "";

    const filters = {};

    if (search) {
        filters.product_name = { $regex: search, $options: "i" };
    }

    if (product_type) {
        filters.product_type = { $regex: product_type, $options: "i" };
    }

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
