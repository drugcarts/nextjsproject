import connectionToDatabase from "../../../../../lib/mongodb";
import DoctorList from "../../../../../models/DoctorList";
import { authenticateUser } from "../../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectionToDatabase();

        const { url } = await params;
        const DoctorNameId = await DoctorList.findOne({ url: url });
        if (!DoctorNameId) {
            return NextResponse.json(
                { error: "DoctorList Url not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(DoctorNameId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching DoctorNameId Url" }, { status: 500 });
    }
}
