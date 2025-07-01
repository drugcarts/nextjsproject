import connectionToDatabase from '@/lib/mongodb'
import AdminUser from '@/models/AdminUser'
import { adminAuthorization, authenticateUser } from '../../../utils/middleware';
import { NextResponse } from 'next/server'

export async function POST(request) {

    try {
        await connectionToDatabase()
        const { success, user, message } = await adminAuthorization();
        console.log(user);

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }
        const { username, email, password, role, salary } = await request.json()
        const existingUser = await AdminUser.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User alreay exist' }, { status: 400 })
        } else {
            const newUser = new AdminUser({ username, email, password, role, salary });
            newUser.id = newUser._id;
            await newUser.save()
            return NextResponse.json(newUser, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

// export async function GET() {
//     const { success, user, message } = await authenticateUser();
// // console.log(user);

//     if (!success) {
//         return NextResponse.json({ error: message }, { status: 401 })
//     }
//     await connectionToDatabase();
//     const allUsers = await AdminUser.find({});
//     const filteredUsers = allUsers.filter((adminUser) => adminUser.role !== "admin");

//     console.log(filteredUsers);
//     return NextResponse.json(filteredUsers, { status: 200 })
// }


export async function GET(req) {


    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { username: { $regex: search, $options: "i" } } : {};
    console.log(filters);
    try {
        await connectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }
        const skip = (page - 1) * limit;

        // Fetch cart items with pagination
        const userItems = await AdminUser.find(filters)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)

        // Total items in the user's cart
        const totalItems = await AdminUser.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const usersWithIndex = userItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                users: usersWithIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return NextResponse.json(
            { error: "Failed to fetch cart items" },
            { status: 500 }
        );
    }
}