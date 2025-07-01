import connectionToDatabase from "../../../../../lib/mongodb";
import DoctorList from "../../../../../models/DoctorList";
import { authenticateUser } from "../../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectionToDatabase();

        const { url } = await params;
        const DoctorListId = await DoctorList.find({ specialist_url: url });
        if (!DoctorListId) {
            return NextResponse.json(
                { error: "DoctorList Url not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(DoctorListId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching DoctorList Url" }, { status: 500 });
    }
}
