import { authenticateUser } from '../../../utils/middleware';
import Cart from '../../../models/Cart';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { success, user, message } = await authenticateUser();

  if (!success) {
    return NextResponse.json({ error: message }, { status: 401 });
  }

  const data = await request.json();

  try {
    const existingCart = await Cart.findOne({
      userId: user._id,
      product_name: data.product_name,
    });

    if (existingCart) {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: user._id, product_name: data.product_name },
        { $inc: { quantity: 1 } },
        { new: true }
      );
      return NextResponse.json(updatedCart, { status: 200 });
    }

    // 🛠 Exclude _id from data
    const { _id, ...safeData } = data;

    const newCart = new Cart({
      userId: user._id,
      productId: _id, // Save product's _id as productId
      ...safeData,
    });

    await newCart.save();
    return NextResponse.json(newCart, { status: 200 });
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
    const { success, user, message } = await authenticateUser();

    if (!success) {
        return NextResponse.json({ error: message }, { status: 401 })
    }

    const userWithCart = await Cart.find({ userId: user?._id });

    console.log(userWithCart);
    return NextResponse.json(userWithCart, { status: 200 })
}