import connectionToDatabase from '../../../../lib/mongodb'
import ContactUs from '../../../../models/ContactUs'
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
        const ContactUsForm = await ContactUs.findById(id);
        if (!ContactUsForm) {
            return NextResponse.json({ error: 'ContactUs not found' }, { status: 404 });
        }

        return NextResponse.json(ContactUsForm, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching ContactUs' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedContactUs = await ContactUs.findByIdAndDelete(id);

        if (!deletedContactUs) {
            return NextResponse.json({ error: 'ContactUs not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'ContactUs deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting ContactUs' }, { status: 500 });
    }
}
