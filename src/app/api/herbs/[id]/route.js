import connectionToDatabase from '../../../../lib/mongodb'
import Herbs from '../../../../models/Herbs'
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
        const HerbsId = await Herbs.findById(id);
        if (!HerbsId) {
            return NextResponse.json({ error: 'Herbs not found' }, { status: 404 });
        }

        return NextResponse.json(HerbsId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Herbs' }, { status: 500 });
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
        const updatedHerbs = await Herbs.findByIdAndUpdate(id, body, { new: true });

        if (!updatedHerbs) {
            return NextResponse.json({ error: 'Herbs not found' }, { status: 404 });
        }

        return NextResponse.json(updatedHerbs, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Herbs' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedHerbs = await Herbs.findByIdAndDelete(id);

        if (!deletedHerbs) {
            return NextResponse.json({ error: 'Herbs not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Herbs deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Herbs' }, { status: 500 });
    }
}
