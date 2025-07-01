import { authenticateUser, adminAuthorization } from '../../../../utils/middleware';
import Product from '../../../../models/Product';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';

export async function GET(req) {
    try {
        await connnectionToDatabase();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const search = searchParams.get("search") || "";

        const filters = search ? { product_name: { $regex: search, $options: "i" } } : {};
        const skip = (page - 1) * limit;

        const ProductItems = await Product.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit)

        const totalItems = await Product.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const ProductIndex = ProductItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                products: ProductIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching sub category items:", error);
        return NextResponse.json(
            { error: "Failed to fetch sub category items" },
            { status: 500 }
        );
    }
}