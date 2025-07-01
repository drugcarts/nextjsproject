import PageBanner from '../../../../models/PageBanner'
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
        // const { success, user, message } = await adminAuthorization();

        // if (!success) {
        //     return NextResponse.json({ error: message }, { status: 401 });
        // }
        const { id } = await params;
        const PageBannerId = await PageBanner.findById(id);
        if (!PageBannerId) {
            return NextResponse.json({ error: 'PageBanner not found' }, { status: 404 });
        }

        return NextResponse.json(PageBannerId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching PageBanner' }, { status: 500 });
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

        const existingPageBanner = await PageBanner.findById(id);
        if (!existingPageBanner) {
            return NextResponse.json({ error: 'PageBanner not found' }, { status: 404 });
        }

        let uniqueSuffix = null;

        if (body.image && typeof body.image === 'object' && body.image.name) {
            const { name, type, data } = body.image;
            const buffer = Buffer.from(data, 'base64');

            uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + name;
            const newImageKey = `admincolor/homepage/pagebanner/${imageFileName(uniqueSuffix)}`;

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
            image: uniqueSuffix
                ? imageFileName(uniqueSuffix)
                : existingPageBanner.image,
        };

        const updatedPageBanner = await PageBanner.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        return NextResponse.json(updatedPageBanner, { status: 200 });
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
        const deletedPageBanner = await PageBanner.findByIdAndDelete(id);

        if (!deletedPageBanner) {
            return NextResponse.json({ error: 'PageBanner not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'PageBanner deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting PageBanner' }, { status: 500 });
    }
}
