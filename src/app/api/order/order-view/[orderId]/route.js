import connnectionToDatabase from "../../../../../lib/mongodb";
import { adminAuthorization, authenticateUser } from "../../../../../utils/middleware";
import Order from '../../../../../models/Order'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();

        const adminAuth = await adminAuthorization();
        const userAuth = await authenticateUser();

        const { success, user, message } = adminAuth.success ? adminAuth : userAuth;
        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { orderId } = await params;

        const OrderId = await Order.findOne({ orderId });
        if (!OrderId) {
            return NextResponse.json({ error: 'Order url not found' }, { status: 404 });
        }

        return NextResponse.json(OrderId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Order url' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const adminAuth = await adminAuthorization();
        const userAuth = await authenticateUser();
        const { success, user, message } = adminAuth.success ? adminAuth : userAuth;
        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        // if (!params?.orderId) {
        //     return NextResponse.json({ error: "Missing orderId in request" }, { status: 400 });
        // }

        const { orderId } = await params;
        const body = await request.json();

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: orderId },
            body,
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(updatedOrder, { status: 200 });

    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ error: 'Error updating order' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const adminAuth = await adminAuthorization();
        const userAuth = await authenticateUser();

        const { success, user, message } = adminAuth.success ? adminAuth : userAuth;

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { orderId } = params;

        if (!orderId) {
            return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
        }

        const deletedOrder = await Order.findOneAndDelete({ orderId });

        if (!deletedOrder) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Order deleted successfully', order: deletedOrder }, { status: 200 });

    } catch (error) {
        console.error('Delete Error:', error);
        return NextResponse.json({ error: 'Error deleting order' }, { status: 500 });
    }
}