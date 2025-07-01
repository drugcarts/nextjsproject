import connectionToDatabase from '../../../../lib/mongodb'
import ReportError from '../../../../models/ReportError'
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
        const reportForm = await ReportError.findById(id);
        if (!reportForm) {
            return NextResponse.json({ error: 'reportForm not found' }, { status: 404 });
        }

        return NextResponse.json(reportForm, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching reportForm' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedReportError = await ReportError.findByIdAndDelete(id);

        if (!deletedReportError) {
            return NextResponse.json({ error: 'Report Error not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Report Error deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Report Error' }, { status: 500 });
    }
}
