import connnectionToDatabase from "../../../../../lib/mongodb";
import Generic from '../../../../../models/Generic'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { url } = await params;

        const GenericId = await Generic.findOne({ url });
        if (!GenericId) {
            return NextResponse.json({ error: 'Generic url not found' }, { status: 404 });
        }

        return NextResponse.json(GenericId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Generic url' }, { status: 500 });
    }
}