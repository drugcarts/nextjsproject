import connnectionToDatabase from "../../../../../lib/mongodb";
import HealthVideo from '../../../../../models/HealthVideo'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { url } = await params;
        const HealthVideoId = await HealthVideo.findOne({ url });
        if (!HealthVideoId) {
            return NextResponse.json({ error: 'Health Video not found' }, { status: 404 });
        }

        return NextResponse.json(HealthVideoId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Health Video' }, { status: 500 });
    }
}