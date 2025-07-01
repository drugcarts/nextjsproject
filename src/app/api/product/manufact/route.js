import connectionToDatabase from "../../../../lib/mongodb";
import Product from "../../../../models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectionToDatabase();
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        const filters = search ? { manufactuer: { $regex: search, $options: "i" } } : {};
        const ProductId = await Product.find(filters);

        if (!ProductId) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(ProductId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching Product" }, { status: 500 });
    }
}
