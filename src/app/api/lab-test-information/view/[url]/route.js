import connnectionToDatabase from "../../../../../lib/mongodb";
import LabInfo from '../../../../../models/LabInfo'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();
        const { url } = await params;
        const LabInfoItems = await LabInfo.findOne({ url });
        return NextResponse.json(LabInfoItems, { status: 200 });

    } catch (error) {
        console.error("Error fetching LabInfo:", error);
        return NextResponse.json({ error: 'Error fetching LabInfo' }, { status: 500 });
    }
}