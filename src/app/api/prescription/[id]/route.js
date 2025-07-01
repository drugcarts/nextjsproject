import connectionToDatabase from "../../../../lib/mongodb";
import Prescription from "../../../../models/Prescription";
import { authenticateUser } from "../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectionToDatabase();

    const { id } = await params;
    const prescriptionId = await Prescription.findById(id);
    if (!prescriptionId) {
      return NextResponse.json(
        { error: "Prescription not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(prescriptionId, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { success, user, message } = await authenticateUser();

    if (!success) {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    const { id } = await params;
    const body = await request.json();
    const updatedPrescription = await Prescription.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedPrescription) {
      return NextResponse.json(
        { error: "Prescription not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPrescription, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { success, user, message } = await authenticateUser();

    if (!success) {
      return NextResponse.json({ error: message }, { status: 401 });
    }

    const { id } = await params;
    const deletedPrescription = await Prescription.findByIdAndDelete(id);

    if (!deletedPrescription) {
      return NextResponse.json(
        { error: "Prescription not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Prescription deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}
