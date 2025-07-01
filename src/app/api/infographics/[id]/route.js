import InfoGraphics from '../../../../models/InfoGraphics'
import { authenticateUser, adminAuthorization } from '../../../../utils/middleware';
import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import connnectionToDatabase from '../../../../lib/mongodb';

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
        const InfoGraphicsId = await InfoGraphics.findById(id);
        if (!InfoGraphicsId) {
            return NextResponse.json({ error: 'InfoGraphics not found' }, { status: 404 });
        }

        return NextResponse.json(InfoGraphicsId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching InfoGraphics' }, { status: 500 });
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

        const existingInfoGraphics = await InfoGraphics.findById(id);
        if (!existingInfoGraphics) {
            return NextResponse.json({ error: 'InfoGraphics not found' }, { status: 404 });
        }

        let uniqueSuffix = null;

        if (body.picture && typeof body.picture === 'object' && body.picture.name) {
            const { name, type, data } = body.picture;
            const buffer = Buffer.from(data, 'base64');

            uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + name;
            const newImageKey = `admincolor/homepage/infogra/${imageFileName(uniqueSuffix)}`;

            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: newImageKey,
                Body: buffer,
                ContentType: type,
                ContentDisposition: "inline",
                ACL: "public-read",
            };
            await s3.send(new PutObjectCommand(uploadParams));
        }

        const updatedData = {
            ...body,
            picture: uniqueSuffix
                ? imageFileName(uniqueSuffix)
                : existingInfoGraphics.picture,
            thuming: uniqueSuffix
                ? imageFileName(uniqueSuffix)
                : existingInfoGraphics.picture,
        };

        const updatedInfoGraphics = await InfoGraphics.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        return NextResponse.json(updatedInfoGraphics, { status: 200 });
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

        const { id } = await params;
        const deletedInfoGraphics = await InfoGraphics.findByIdAndDelete(id);

        if (!deletedInfoGraphics) {
            return NextResponse.json({ error: 'InfoGraphics not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'InfoGraphics deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting InfoGraphics' }, { status: 500 });
    }
}
