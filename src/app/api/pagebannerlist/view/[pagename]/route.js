import connnectionToDatabase from "../../../../../lib/mongodb";
import PageBanner from '../../../../../models/PageBanner'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { pagename } = await params;
        
        const PageBannerId = await PageBanner.findOne({ pagename });
        if (!PageBannerId) {
            return NextResponse.json({ error: 'PageBanner not found' }, { status: 404 });
        }

        return NextResponse.json(PageBannerId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching PageBanner' }, { status: 500 });
    }
}