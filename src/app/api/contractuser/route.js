import connectionToDatabase from '@/lib/mongodb'
import ContractUser from '../../../models/ContractUser'
import { adminAuthorization, authenticateUser } from '../../../utils/middleware';
import { NextResponse } from 'next/server'

export async function POST(request) {

    try {
        await connectionToDatabase()
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }
        const { username, generices, amount } = await request.json()
        const existingUser = await ContractUser.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ error: 'User alreay exist' }, { status: 400 })
        } else {
            const newUser = new ContractUser({ username, generices, amount });
            newUser.id = newUser._id;
            await newUser.save()
            return NextResponse.json(newUser, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { username: { $regex: search, $options: "i" } } : {};

    try {
        await connectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }
        const skip = (page - 1) * limit;

        // Fetch cart items with pagination
        const userItems = await ContractUser.find(filters)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)

        // Total items in the user's cart
        const totalItems = await ContractUser.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const usersWithIndex = userItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                contract_users: usersWithIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching contract user items:", error);
        return NextResponse.json(
            { error: "Failed to fetch contract user items" },
            { status: 500 }
        );
    }
}