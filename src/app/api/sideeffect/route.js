import Sideeffect from "../../../models/Sideeffect";
import { NextResponse } from "next/server";
import connnectionToDatabase from "@/lib/mongodb";

export async function POST(request) {
  try {
    await connnectionToDatabase();

    const { generic_name, common, rare, severe } = await request.json();

    const isSideeffect = await Sideeffect.findOne({ generic_name });
    if (isSideeffect) {
      return NextResponse.json(
        { error: "Sideeffect already exist" },
        { status: 401 }
      );
    }

    const addSideeffect = new Sideeffect({
      generic_name,
      common,
      rare,
      severe,
    });

    await addSideeffect.save();
    return NextResponse.json(addSideeffect, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  try {
    await connnectionToDatabase();
    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.generic_name = { $regex: search, $options: "i" };
    }

    const genericItems = await Sideeffect.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalItems = await Sideeffect.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const sideeffectsWithIndex = genericItems.map((sideeffect, index) => ({
      ...sideeffect.toObject(),
      sno: skip + index + 1,
    }));

    return NextResponse.json(
      {
        sideeffects: sideeffectsWithIndex,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Sideeffect items:", error);
    return NextResponse.json(
      { error: "Failed to fetch Sideeffect items" },
      { status: 500 }
    );
  }
}
