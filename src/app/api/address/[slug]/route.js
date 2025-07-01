import connectionToDatabase from "../../../../lib/mongodb";
import Address from "../../../../models/Address";
import { authenticateUser } from "../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectionToDatabase();
    const { success, user, message } = await authenticateUser();

    if (!success) {
      return NextResponse.json({ error: message }, { status: 401 });
    }

    const { slug } = await params;
    console.log("Fetching Address for slug:", slug);

    let address = await Address.find({ cus_id: slug });
    if (!address) {
      address = await Address.findById(slug).catch(() => null); 
    }

    if (!address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    return NextResponse.json(address, { status: 200 });
  } catch (error) {
    console.error("Error fetching Address:", error);
    return NextResponse.json({ error: "Error fetching Address" }, { status: 500 });
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
    const updatedAddress = await Address.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedAddress) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    return NextResponse.json(updatedAddress, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating Address" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { success, user, message } = await authenticateUser();

    if (!success) {
      return NextResponse.json({ error: message }, { status: 401 });
    }

    const { slug } = await params;
    const deletedAddress = await Address.findByIdAndDelete(slug);

    if (!deletedAddress) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Address deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting Address" },
      { status: 500 }
    );
  }
}
