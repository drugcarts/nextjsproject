import connectionToDatabase from "../../../../../lib/mongodb";
import Address from "../../../../../models/Address";
import { authenticateUser } from "../../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectionToDatabase();
        const { success, user, message } = await authenticateUser();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const AddressId = await Address.findById(id);
        if (!AddressId) {
            return NextResponse.json({ error: 'Address not found' }, { status: 404 });
        }

        return NextResponse.json(AddressId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
    }
}
