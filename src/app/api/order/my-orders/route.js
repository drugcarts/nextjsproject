import { authenticateUser } from '../../../../utils/middleware';
import Order from '../../../../models/Order';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';

// export async function GET() {
//     try {
//         await connnectionToDatabase();
//         const { success, user, message } = await authenticateUser();

//         if (!success) {
//             return NextResponse.json({ error: message }, { status: 401 })
//         }

//         const userWithOrdrs = await Order.find({ userId: user?._id });

//         console.log(userWithOrdrs);
//         return NextResponse.json(userWithOrdrs, { status: 200 })
//     } catch (error) {
//         console.error("Error fetching my Order items:", error);
//         return NextResponse.json(
//             { error: "Failed to fetch my Order items" },
//             { status: 500 }
//         );
//     }
// }

export async function GET(req) {
    try {
        await connnectionToDatabase();
        const { success, user, message } = await authenticateUser();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const { searchParams } = new URL(req.url);
        const orderStatus = searchParams.get("orderStatus") || "";
        const startDate = searchParams.get("startDate") || "";
        const endDate = searchParams.get("endDate") || "";

        let query = { userId: user._id };
        if (orderStatus) {
            query["trackingInfo.orderStatus"] = orderStatus;
        }

        if (startDate && endDate) {
            query["createdAt"] = {
                $gte: new Date(startDate + "T00:00:00.000Z"),
                $lte: new Date(endDate + "T23:59:59.999Z")
            };
        }

        const userWithOrders = await Order.find(query);

        console.log(userWithOrders);
        return NextResponse.json(userWithOrders, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Error fetching My orders" }, { status: 500 });
    }
}