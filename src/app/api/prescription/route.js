import { authenticateUser } from "../../../utils/middleware";
import Prescription from "../../../models/Prescription";
import { NextResponse } from "next/server";
import connnectionToDatabase from "@/lib/mongodb";

export async function POST(request) {
  try {
    await connnectionToDatabase();
    const { success, user, message } = await authenticateUser();

    if (!success) {
      return NextResponse.json({ error: message }, { status: 401 });
    }

    const { rximage } = await request.json();

    const isPrescription = await Prescription.findOne({ rximage });
    if (isPrescription) {
      return NextResponse.json(
        { error: "Prescription already exist" },
        { status: 401 }
      );
    }

    const addPrescription = await new Prescription({
      rximage,
      userId: user?._id
    });

    await addPrescription.save();
    return NextResponse.json(addPrescription, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const { success, user, message } = await authenticateUser();

  if (!success) {
    return NextResponse.json({ error: message }, { status: 401 })
  }

  const userWithPrescription = await Prescription.find({ userId: user?._id });
  return NextResponse.json(userWithPrescription, { status: 200 })
}