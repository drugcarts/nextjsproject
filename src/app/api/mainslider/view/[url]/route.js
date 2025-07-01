import connnectionToDatabase from "../../../../../lib/mongodb";
import MainSlider from '../../../../../models/MainSlider'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const { url } = await params;

        const MainSliderItems = await MainSlider.find({ url });

        if (!MainSliderItems || MainSliderItems.length === 0) {
            return NextResponse.json({ error: 'MainSlider not found' }, { status: 404 });
        }

        const filterData = MainSliderItems.filter(item => item.status === "Active");

        return NextResponse.json(filterData, { status: 200 });

    } catch (error) {
        console.error("Error fetching MainSlider:", error);
        return NextResponse.json({ error: 'Error fetching MainSlider' }, { status: 500 });
    }
}