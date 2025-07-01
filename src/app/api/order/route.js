import { adminAuthorization, authenticateUser } from "../../../utils/middleware";
import Order from "../../../models/Order";
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
            shippingInfo,
            orderItems,
            rximage,
            paymentInfo,
            itemsPrice,
            shippingPrice,
            totalPrice,
        } = await request.json();

        const addOrder = new Order({
            userId: user?._id,
            shippingInfo,
            orderItems,
            rximage,
            paymentInfo,
            itemsPrice,
            shippingPrice,
            totalPrice,
        });

        await addOrder.save();
        return NextResponse.json(addOrder, { status: 200 });
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
    const orderStatus = searchParams.get("orderStatus") || "";

    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }
        const skip = (page - 1) * limit;

        let query = {};

        if (search) {
            query.orderId = { $regex: search, $options: "i" };
        }

        if (orderStatus) {
            query["trackingInfo.orderStatus"] = orderStatus;
        }

        const OrderItems = await Order.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalItems = await Order.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limit);

        const ordersWithIndex = OrderItems.map((order, index) => ({
            ...order.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                all_orders: ordersWithIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Order items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Order items" },
            { status: 500 }
        );
    }
}
