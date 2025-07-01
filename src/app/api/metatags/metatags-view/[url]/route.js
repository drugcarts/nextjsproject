import connnectionToDatabase from "../../../../../lib/mongodb";
import MetaTags from '../../../../../models/MetaTags'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { url } = await params;
        const MetaTagsId = await MetaTags.findOne({ url });
        if (!MetaTagsId) {
            return NextResponse.json({ error: 'Info Graphics not found' }, { status: 404 });
        }

        return NextResponse.json(MetaTagsId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching MetaTags Url' }, { status: 500 });
    }
}