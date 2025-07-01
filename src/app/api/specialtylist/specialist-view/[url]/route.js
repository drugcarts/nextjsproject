import connectionToDatabase from "../../../../../lib/mongodb";
import Specialty from "../../../../../models/Specialty";
import { authenticateUser } from "../../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectionToDatabase();

        const { url } = await params;
        const SpecialtyId = await Specialty.findOne({ url: url });
        if (!SpecialtyId) {
            return NextResponse.json(
                { error: "Specialty Url not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(SpecialtyId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching Specialty Url" }, { status: 500 });
    }
}
