import connnectionToDatabase from "../../../../../lib/mongodb";
import HealthNews from '../../../../../models/HealthNews'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { url } = await params;
        const HealthNewsId = await HealthNews.findOne({ url });
        if (!HealthNewsId) {
            return NextResponse.json({ error: 'Health News not found' }, { status: 404 });
        }

        return NextResponse.json(HealthNewsId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Health News' }, { status: 500 });
    }
}