import MainSlider from '../../../../models/MainSlider'
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
        // const { success, user, message } = await adminAuthorization();

        // if (!success) {
        //     return NextResponse.json({ error: message }, { status: 401 });
        // }
        const { id } = await params;
        const MainSliderId = await MainSlider.findById(id);
        if (!MainSliderId) {
            return NextResponse.json({ error: 'MainSlider not found' }, { status: 404 });
        }

        return NextResponse.json(MainSliderId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching MainSlider' }, { status: 500 });
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

        const existingTestPackage = await MainSlider.findById(id);
        if (!existingTestPackage) {
            return NextResponse.json({ error: 'TestPackage not found' }, { status: 404 });
        }

        let uniqueSuffix = null;

        if (body.slide_image && typeof body.slide_image === 'object' && body.slide_image.name) {
            const { name, type, data } = body.slide_image;
            const buffer = Buffer.from(data, 'base64');

            uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + name;
            const newImageKey = `admincolor/homepage/slider/${imageFileName(uniqueSuffix)}`;

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
            slide_image: uniqueSuffix
                ? imageFileName(uniqueSuffix)
                : existingTestPackage.slide_image,
        };

        const updatedMainSlider = await MainSlider.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        return NextResponse.json(updatedMainSlider, { status: 200 });
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
        const deletedMainSlider = await MainSlider.findByIdAndDelete(id);

        if (!deletedMainSlider) {
            return NextResponse.json({ error: 'MainSlider not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'MainSlider deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting MainSlider' }, { status: 500 });
    }
}
