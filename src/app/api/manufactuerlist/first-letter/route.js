import Manufactuer from '../../../../models/Manufactuer';
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
            ? { manufactuername: { $regex: `^${firstLetter}`, $options: "i" } }
            : {};

        const manufactuers = await Manufactuer.find(filters)
            .sort({ manufactuername: 1 })
            .skip(skip)
            .limit(limit);

        const totalItems = await Manufactuer.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        return NextResponse.json(
            {
                manufactuers,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Manufactuer items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Manufactuer items" },
            { status: 500 }
        );
    }
}
