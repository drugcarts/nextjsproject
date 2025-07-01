import connectionToDatabase from '../../../../lib/mongodb'
import HealthTips from '../../../../models/HealthTips'
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
        const HealthTipsId = await HealthTips.findById(id);
        if (!HealthTipsId) {
            return NextResponse.json({ error: 'HealthTips not found' }, { status: 404 });
        }

        return NextResponse.json(HealthTipsId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching HealthTips' }, { status: 500 });
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
        const updatedHealthTips = await HealthTips.findByIdAndUpdate(id, body, { new: true });

        if (!updatedHealthTips) {
            return NextResponse.json({ error: 'HealthTips not found' }, { status: 404 });
        }

        return NextResponse.json(updatedHealthTips, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating HealthTips' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedHealthTips = await HealthTips.findByIdAndDelete(id);

        if (!deletedHealthTips) {
            return NextResponse.json({ error: 'HealthTips not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'HealthTips deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting HealthTips' }, { status: 500 });
    }
}
