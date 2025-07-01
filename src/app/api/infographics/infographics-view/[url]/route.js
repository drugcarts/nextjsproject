import connnectionToDatabase from "../../../../../lib/mongodb";
import InfoGraphics from '../../../../../models/InfoGraphics'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { url } = await params;
        const InfoGraphicsId = await InfoGraphics.findOne({ url });
        if (!InfoGraphicsId) {
            return NextResponse.json({ error: 'Info Graphics not found' }, { status: 404 });
        }

        return NextResponse.json(InfoGraphicsId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Info Graphics' }, { status: 500 });
    }
}