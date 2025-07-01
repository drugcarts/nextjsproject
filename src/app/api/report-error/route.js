import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import ReportError from '../../../models/ReportError';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';

export async function POST(request) {
    try {
        await connnectionToDatabase();

        const {
            name,
            email,
            mobile,
            country,
            subject,
        } = await request.json();

        const addReportError = new ReportError({
            name,
            email,
            mobile,
            country,
            subject,
        });

        await addReportError.save();
        return NextResponse.json(addReportError, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { name: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const skip = (page - 1) * limit;

        const ReportErrorItems = await ReportError.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await ReportError.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const ReportErrorItemsIndex = ReportErrorItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                report_errors: ReportErrorItemsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Report Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch Report Error" },
            { status: 500 }
        );
    }
}