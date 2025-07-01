import connnectionToDatabase from "../../../../../lib/mongodb";
import Scan from '../../../../../models/Scan'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { url } = await params;

        const ScanId = await Scan.findOne({ url });
        if (!ScanId) {
            return NextResponse.json({ error: 'Scan url not found' }, { status: 404 });
        }

        return NextResponse.json(ScanId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Scan url' }, { status: 500 });
    }
}