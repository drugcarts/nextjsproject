import connnectionToDatabase from "../../../../../lib/mongodb";
import Diseases from '../../../../../models/Diseases'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { url } = await params;
        const DiseasesId = await Diseases.findOne({ url });
        if (!DiseasesId) {
            return NextResponse.json({ error: 'Diseases not found' }, { status: 404 });
        }

        return NextResponse.json(DiseasesId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Diseases' }, { status: 500 });
    }
}