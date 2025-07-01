import Generic from '../../../../models/Generic';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    try {
        await connnectionToDatabase();
        const skip = (page - 1) * limit;

        const firstLetter = search.charAt(0).toUpperCase();

        const filters = firstLetter
            ? { generices: { $regex: `^${firstLetter}`, $options: "i" } }
            : {};

        const generics = await Generic.find(filters)
            .sort({ generices: 1 })
            .skip(skip)
            .limit(limit);

        const totalItems = await Generic.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        return NextResponse.json(
            {
                generics,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching generics items:", error);
        return NextResponse.json(
            { error: "Failed to fetch generics items" },
            { status: 500 }
        );
    }
}
