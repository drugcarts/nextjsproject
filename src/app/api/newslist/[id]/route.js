import connectionToDatabase from '../../../../lib/mongodb'
import HealthNews from '../../../../models/HealthNews'
import { authenticateUser, adminAuthorization } from '../../../../utils/middleware';
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }
        const { id } = await params;
        const HealthNewsId = await HealthNews.findById(id);
        if (!HealthNewsId) {
            return NextResponse.json({ error: 'HealthNews not found' }, { status: 404 });
        }

        return NextResponse.json(HealthNewsId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching HealthNews' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }
        const { id } = await params;
        const body = await request.json();
        const updatedHealthNews = await HealthNews.findByIdAndUpdate(id, body, { new: true });

        if (!updatedHealthNews) {
            return NextResponse.json({ error: 'HealthNews not found' }, { status: 404 });
        }

        return NextResponse.json(updatedHealthNews, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating HealthNews' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedHealthNews = await HealthNews.findByIdAndDelete(id);

        if (!deletedHealthNews) {
            return NextResponse.json({ error: 'HealthNews not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'HealthNews deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting HealthNews' }, { status: 500 });
    }
}
