import connectionToDatabase from '../../../../lib/mongodb'
import Lab from '../../../../models/Lab'
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
        await connectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }
        const { id } = await params;
        const LabId = await Lab.findById(id);
        if (!LabId) {
            return NextResponse.json({ error: 'Lab not found' }, { status: 404 });
        }

        return NextResponse.json(LabId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Lab' }, { status: 500 });
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

        const existingLab = await Lab.findById(id);
        if (!existingLab) {
            return NextResponse.json({ error: 'Lab not found' }, { status: 404 });
        }

        let newImageKey = existingLab.image;

        // If new image is sent (base64 or blob-like), process it
        if (body.image && typeof body.image === 'object' && body.image.name) {
            const { name, type, data } = body.image; // expects image as { name, type, data (base64) }

            // Upload new image
            const buffer = Buffer.from(data, 'base64');
            const uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + name
            newImageKey = `admincolor/lab/lablogo/${imageFileName(uniqueSuffix)}`;

            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: newImageKey,
                Body: buffer,
                ContentType: type,
                ContentDisposition: "inline",
                ACL: "public-read",
            };

            await s3.send(new PutObjectCommand(uploadParams));
            // Delete old image from S3
            //   if (existingLabPackage.image) {
            //     await s3.send(new DeleteObjectCommand({
            //       Bucket: process.env.AWS_BUCKET_NAME,
            //       Key: existingLabPackage.image,
            //     }));
            //   }
        }

        const updatedData = {
            ...body,
            image: newImageKey,
        };

        const updatedLab = await Lab.findByIdAndUpdate(id, updatedData, { new: true });

        return NextResponse.json(updatedLab, { status: 200 });
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
        const deletedLab = await Lab.findByIdAndDelete(id);

        if (!deletedLab) {
            return NextResponse.json({ error: 'Lab not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Lab deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Lab' }, { status: 500 });
    }
}
