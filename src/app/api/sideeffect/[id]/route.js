import connectionToDatabase from "../../../../lib/mongodb";
import Sideeffect from "../../../../models/Sideeffect";
import {adminAuthorization,} from "../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectionToDatabase();

    const { id } = await params;
    const sideeffectId = await Sideeffect.findById(id);
    if (!sideeffectId) {
      return NextResponse.json(
        { error: "Sideeffect not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(sideeffectId, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { success, user, message } = await adminAuthorization();

    if (!success) {
      return NextResponse.json({ error: message }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const updatedSideeffect = await Sideeffect.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedSideeffect) {
      return NextResponse.json(
        { error: "Sideeffect not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSideeffect, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { success, user, message } = await adminAuthorization();

    if (!success) {
      return NextResponse.json({ error: message }, { status: 401 });
    }

    if (user?.role !== "admin") {
      return NextResponse.json(
        { error: "Permission not found" },
        { status: 404 }
      );
    }

    const { id } = await params;
    const deletedSideeffect = await Sideeffect.findByIdAndDelete(id);

    if (!deletedSideeffect) {
      return NextResponse.json(
        { error: "Sideeffect not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Sideeffect deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}
