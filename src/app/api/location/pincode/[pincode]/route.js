import connnectionToDatabase from "../../../../../lib/mongodb";
import Location from '../../../../../models/Location'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { pincode } = await params;
        const LocationId = await Location.findOne({ pincode });
        if (!LocationId) {
            return NextResponse.json({ error: 'Location not found' }, { status: 404 });
        }

        return NextResponse.json(LocationId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Location' }, { status: 500 });
    }
}