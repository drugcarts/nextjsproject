import connectionToDatabase from "../../../../../lib/mongodb";
import LabPackage from "../../../../../models/LabPackage";
import { authenticateUser } from "../../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectionToDatabase();

        const { url } = await params;
        const LabPackageId = await LabPackage.findOne({ url: url });
        if (!LabPackageId) {
            return NextResponse.json(
                { error: "LabPackage Url not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(LabPackageId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching LabPackage Url" }, { status: 500 });
    }
}
