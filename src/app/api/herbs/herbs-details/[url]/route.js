import connnectionToDatabase from "../../../../../lib/mongodb";
import Herbs from '../../../../../models/Herbs'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { url } = await params;
        const HerbssId = await Herbs.findOne({ url });
        if (!HerbssId) {
            return NextResponse.json({ error: 'Herbs not found' }, { status: 404 });
        }

        return NextResponse.json(HerbssId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Herbs' }, { status: 500 });
    }
}