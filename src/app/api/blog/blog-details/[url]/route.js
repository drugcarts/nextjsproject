import connnectionToDatabase from "../../../../../lib/mongodb";
import Blog from '../../../../../models/Blog'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { url } = await params;
        const BlogId = await Blog.findOne({ url });
        if (!BlogId) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(BlogId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Blog' }, { status: 500 });
    }
}