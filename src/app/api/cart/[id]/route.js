import connectionToDatabase from '../../../../lib/mongodb'
import Cart from '../../../../models/Cart'
import { authenticateUser, adminAuthorization } from '../../../../utils/middleware';
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connectionToDatabase();

        const { id } = await params;
        const CartId = await Cart.findById(id);
        if (!CartId) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }

        return NextResponse.json(CartId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Cart' }, { status: 500 });
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
        const updatedCart = await Cart.findByIdAndUpdate(id, body, { new: true });

        if (!updatedCart) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }

        return NextResponse.json(updatedCart, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Cart' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await authenticateUser();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedCart = await Cart.findByIdAndDelete(id);

        if (!deletedCart) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Cart deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Cart' }, { status: 500 });
    }
}
