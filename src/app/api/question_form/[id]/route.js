import connectionToDatabase from '../../../../lib/mongodb'
import QuestionForm from '../../../../models/QuestionForm'
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
        const questionForm = await QuestionForm.findById(id);
        if (!questionForm) {
            return NextResponse.json({ error: 'questionForm not found' }, { status: 404 });
        }

        return NextResponse.json(questionForm, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Question' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const deletedQuestionForm = await QuestionForm.findByIdAndDelete(id);

        if (!deletedQuestionForm) {
            return NextResponse.json({ error: 'Question not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Question deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Question' }, { status: 500 });
    }
}
