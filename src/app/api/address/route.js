import { authenticateUser } from "../../../utils/middleware";
import Address from "../../../models/Address";
import { NextResponse } from "next/server";
import connnectionToDatabase from "@/lib/mongodb";

export async function POST(request) {
  try {
    await connnectionToDatabase();
    const { success, user, message } = await authenticateUser();

    if (!success) {
      return NextResponse.json({ error: message }, { status: 401 });
    }

    const {
      type,
      cus_name,
      lastname,
      email,
      phone,
      address,
      postcode,
      state,
      country,
      town,
      status,
      timestamp,
      updated_at
    } = await request.json();

    const isAddress = await Address.findOne({ cus_name });
    if (isAddress) {
      return NextResponse.json(
        { error: "Address already exist" },
        { status: 401 }
      );
    }

    const addAddress = new Address({
      cus_id: user?._id,
      type,
      cus_name,
      lastname,
      email,
      phone,
      address,
      postcode,
      state,
      country,
      town,
      status,
      timestamp,
      updated_at
    });

    await addAddress.save();
    return NextResponse.json(addAddress, { status: 200 });
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

  const filters = search ? { cus_name: { $regex: search, $options: "i" } } : {};

  try {
    await connnectionToDatabase();
    const { success, user, message } = await authenticateUser();

    if (!success) {
      return NextResponse.json({ error: message }, { status: 401 })
    }

    const skip = (page - 1) * limit;

    const AddressItems = await Address.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const totalItems = await Address.countDocuments(filters);
    const totalPages = Math.ceil(totalItems / limit);

    const AddressWithIndex = AddressItems.map((item, index) => ({
      ...item.toObject(),
      sno: skip + index + 1,
    }));

    return NextResponse.json(
      {
        all_address: AddressWithIndex,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Address items:", error);
    return NextResponse.json(
      { error: "Failed to fetch Address items" },
      { status: 500 }
    );
  }
}