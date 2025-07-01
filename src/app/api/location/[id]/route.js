import connectionToDatabase from '../../../../lib/mongodb'
import Location from '../../../../models/Location'
import { authenticateUser, adminAuthorization } from '../../../../utils/middleware';
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        await connectionToDatabase();
        // const { success, user, message } = await adminAuthorization();

        // if (!success) {
        //     return NextResponse.json({ error: message }, { status: 401 });
        // }
        const { id } = await params;
        const LocationId = await Location.findById(id);
        if (!LocationId) {
            return NextResponse.json({ error: 'Location not found' }, { status: 404 });
        }

        return NextResponse.json(LocationId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Location' }, { status: 500 });
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
        const updatedLocation = await Location.findByIdAndUpdate(id, body, { new: true });

        if (!updatedLocation) {
            return NextResponse.json({ error: 'Location not found' }, { status: 404 });
        }

        return NextResponse.json(updatedLocation, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Location' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedLocation = await Location.findByIdAndDelete(id);

        if (!deletedLocation) {
            return NextResponse.json({ error: 'Location not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Location deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Location' }, { status: 500 });
    }
}
