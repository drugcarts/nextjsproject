import connectionToDatabase from "../../../../lib/mongodb";
import Generic from "../../../../models/Generic";
import { authenticateUser } from "../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectionToDatabase();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const filters = search ? { subname: { $regex: search, $options: "i" } } : {};
    const subcategoryId = await Generic.find(filters);


    if (!subcategoryId) {
      return NextResponse.json(
        { error: "Sub Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(subcategoryId, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching Sub Category" }, { status: 500 });
  }
}
