import connectionToDatabase from "../../../../../lib/mongodb";
import Sideeffect from "../../../../../models/Sideeffect";
import { authenticateUser } from "../../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectionToDatabase();

    const { generic_name } = await params;
    const sideeffectId = await Sideeffect.findOne({
      generic_name: generic_name,
    });
    console.log(sideeffectId, "API");
    if (!sideeffectId) {
      return NextResponse.json(
        { error: "Sideeffect not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(sideeffectId, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching Sideeffect" },
      { status: 500 }
    );
  }
}
