import connnectionToDatabase from "../../../../../lib/mongodb";
import Product from "../../../../../models/Product";
import { adminAuthorization } from "../../../../../utils/middleware";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        await connnectionToDatabase();

        const { success, user, message } = await adminAuthorization();
        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { generices } = await params;

        const body = await request.json();

        const updatedProduct = await Product.findOneAndUpdate(
            { generices },
            body,
            { new: true }
        );

        if (!updatedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json(
            { error: "Error updating Product" },
            { status: 500 }
        );
    }
}
