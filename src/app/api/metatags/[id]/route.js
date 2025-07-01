import connectionToDatabase from '../../../../lib/mongodb'
import MetaTags from '../../../../models/MetaTags'
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
        const metaTag = await MetaTags.findById(id);
        if (!metaTag) {
            return NextResponse.json({ error: 'metaTag not found' }, { status: 404 });
        }

        return NextResponse.json(metaTag, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching metaTag' }, { status: 500 });
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
        const updatedMetaTags = await MetaTags.findByIdAndUpdate(id, body, { new: true });

        if (!updatedMetaTags) {
            return NextResponse.json({ error: 'MetaTags not found' }, { status: 404 });
        }

        return NextResponse.json(updatedMetaTags, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating MetaTags' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedMetaTags = await MetaTags.findByIdAndDelete(id);

        if (!deletedMetaTags) {
            return NextResponse.json({ error: 'MetaTags not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'MetaTags deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting MetaTags' }, { status: 500 });
    }
}
