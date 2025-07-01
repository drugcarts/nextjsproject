import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import LabBooking from '../../../models/LabBooking';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';

export async function POST(request) {
    try {
        await connnectionToDatabase();
        const { success, user, message } = await authenticateUser();

        const {
            packagename,
            noofpersons,
            name1,
            age1,
            gender1,
            name2,
            age2,
            gender2,
            name3,
            age3,
            gender3,
            name4,
            age4,
            gender4,
            name5,
            age5,
            gender5,
            email,
            phone,
            address,
            appoitmentdate,
            timing,
            tests,
            hardcopy
        } = await request.json();
        const addLabBooking = new LabBooking({
            userId: user?._id,
            packagename,
            noofpersons,
            name1,
            age1,
            gender1,
            name2,
            age2,
            gender2,
            name3,
            age3,
            gender3,
            name4,
            age4,
            gender4,
            name5,
            age5,
            gender5,
            email,
            phone,
            address,
            appoitmentdate,
            timing,
            tests,
            hardcopy
        });

        await addLabBooking.save();
        return NextResponse.json(addLabBooking, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { packagename: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const skip = (page - 1) * limit;

        const LabBookingItems = await LabBooking.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await LabBooking.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const LabBookingItemsIndex = LabBookingItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                lab_bookings: LabBookingItemsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Lab Package:", error);
        return NextResponse.json(
            { error: "Failed to fetch Lab Package" },
            { status: 500 }
        );
    }
}