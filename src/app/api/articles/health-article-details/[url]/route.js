import connnectionToDatabase from "../../../../../lib/mongodb";
import Articles from '../../../../../models/Articles'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { url } = await params;
        const ArticlesId = await Articles.findOne({ url });
        if (!ArticlesId) {
            return NextResponse.json({ error: 'Articles not found' }, { status: 404 });
        }

        return NextResponse.json(ArticlesId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Articles' }, { status: 500 });
    }
}