import connectionToDatabase from "../../../../../lib/mongodb";
import Subcategory from "../../../../../models/SubCategory";
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {

    try {
        await connectionToDatabase();
        const { url } = await params;
        const subcategoryUrl = await Subcategory.findOne({ url: url });
        if (!subcategoryUrl) {
            return NextResponse.json({ error: 'Sub Category not found' }, { status: 404 });
        }

        return NextResponse.json(subcategoryUrl, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
    }
}

