import connnectionToDatabase from "../../../../../lib/mongodb";
import Service from "../../../../../models/Service";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connnectionToDatabase();

    const { url } = await params;

    const ServiceId = await Service.findOne({ url: url });
    if (!ServiceId) {
      return NextResponse.json(
        { error: "Service url not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(ServiceId, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching Service url" },
      { status: 500 }
    );
  }
}
