import connnectionToDatabase from "../../../../../lib/mongodb";
import Promotion from '../../../../../models/Promotion'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { url } = await params;
        const PromotionId = await Promotion.findOne({ url });
        if (!PromotionId) {
            return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
        }

        return NextResponse.json(PromotionId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Promotion' }, { status: 500 });
    }
}