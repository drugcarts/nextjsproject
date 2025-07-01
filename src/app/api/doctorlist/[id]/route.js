import connectionToDatabase from '../../../../lib/mongodb'
import DoctorList from '../../../../models/DoctorList'
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
        const DoctorListId = await DoctorList.findById(id);
        if (!DoctorListId) {
            return NextResponse.json({ error: 'DoctorList Id not found' }, { status: 404 });
        }

        return NextResponse.json(DoctorListId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching DoctorList' }, { status: 500 });
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
        const updatedDoctorList = await DoctorList.findByIdAndUpdate(id, body, { new: true });

        if (!updatedDoctorList) {
            return NextResponse.json({ error: 'Update DoctorList not found' }, { status: 404 });
        }

        return NextResponse.json(updatedDoctorList, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating DoctorList' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedDoctorList = await DoctorList.findByIdAndDelete(id);

        if (!deletedDoctorList) {
            return NextResponse.json({ error: 'DoctorList not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'DoctorList deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting DoctorList' }, { status: 500 });
    }
}
