import connnectionToDatabase from "../../../../../lib/mongodb";
import HealthTips from '../../../../../models/HealthTips'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { url } = await params;
        const HealthTipsId = await HealthTips.findOne({ url });
        if (!HealthTipsId) {
            return NextResponse.json({ error: 'Health Tips not found' }, { status: 404 });
        }

        return NextResponse.json(HealthTipsId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Health Tips' }, { status: 500 });
    }
}