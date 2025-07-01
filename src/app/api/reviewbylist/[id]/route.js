import connnectionToDatabase from '../../../../lib/mongodb';
import ReviewBy from '../../../../models/ReviewBy'
import { authenticateUser, adminAuthorization } from '../../../../utils/middleware';
import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

function imageFileName(name) {
    return name.trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "").toLowerCase();
}

export async function GET(request, { params }) {
    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }
        const { id } = await params;
        const ReviewById = await ReviewBy.findById(id);
        if (!ReviewById) {
            return NextResponse.json({ error: 'ReviewBy not found' }, { status: 404 });
        }

        return NextResponse.json(ReviewById, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching ReviewBy' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connnectionToDatabase();
        const { success, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        const existingReviewBy = await ReviewBy.findById(id);
        if (!existingReviewBy) {
            return NextResponse.json({ error: 'ReviewBy not found' }, { status: 404 });
        }

        let uniqueSuffix = null;

        if (body.picture && typeof body.picture === 'object' && body.picture.name) {
            const { name, type, data } = body.picture;
            const buffer = Buffer.from(data, 'base64');

            uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + name;
            const newImageKey = `admincolor/reviewby/${imageFileName(uniqueSuffix)}`;

            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: newImageKey,
                Body: buffer,
                ContentType: type,
                ContentDisposition: "inline",
                ACL: "public-read",
            };

            await s3.send(new PutObjectCommand(uploadParams));

            // Optionally delete the old image from S3 here
        }

        const updatedData = {
            ...body,
            picture: uniqueSuffix
                ? imageFileName(uniqueSuffix)
                : existingReviewBy.picture,
        };

        const updatedReviewBy = await ReviewBy.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        return NextResponse.json(updatedReviewBy, { status: 200 });
    } catch (error) {
        console.error('PUT error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        if (user?.role !== "admin") {
            return NextResponse.json({ error: 'Permission not found' }, { status: 404 });
        }

        const { id } = await params;
        const deletedReviewBy = await ReviewBy.findByIdAndDelete(id);

        if (!deletedReviewBy) {
            return NextResponse.json({ error: 'ReviewBy not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'ReviewBy deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting ReviewBy' }, { status: 500 });
    }
}
