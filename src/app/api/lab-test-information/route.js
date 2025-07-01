import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import LabInfo from '../../../models/LabInfo';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { title: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const skip = (page - 1) * limit;

        const LabInfoItems = await LabInfo.find(filters)
            .sort({ updated_at: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await LabInfo.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const LabInfoIndex = LabInfoItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                lab_infos: LabInfoIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching LabInfo items:", error);
        return NextResponse.json(
            { error: "Failed to fetch LabInfo items" },
            { status: 500 }
        );
    }
}