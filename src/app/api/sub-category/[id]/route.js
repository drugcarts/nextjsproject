import connnectionToDatabase from '../../../../lib/mongodb';
import Subcategory from '../../../../models/SubCategory'
import { authenticateUser, adminAuthorization } from '../../../../utils/middleware';
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

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
        const subcategoryId = await Subcategory.findById(id);
        if (!subcategoryId) {
            return NextResponse.json({ error: 'Sub Category not found' }, { status: 404 });
        }

        return NextResponse.json(subcategoryId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
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

        const existingTestPackage = await Subcategory.findById(id);
        if (!existingTestPackage) {
            return NextResponse.json({ error: 'TestPackage not found' }, { status: 404 });
        }

        let uniqueSuffix = null;

        if (body.cat_img && typeof body.cat_img === 'object' && body.cat_img.name) {
            const { name, type, data } = body.cat_img;
            const buffer = Buffer.from(data, 'base64');

            uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + name;
            const newImageKey = `category/thumb/sub${imageFileName(uniqueSuffix)}`;

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
            cat_img: uniqueSuffix
                ? `sub${imageFileName(uniqueSuffix)}`
                : existingTestPackage.cat_img,
        };

        const updatedMainSlider = await Subcategory.findByIdAndUpdate(id, updatedData, {
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

        if (user?.role !== "admin") {
            return NextResponse.json({ error: 'Permission not found' }, { status: 404 });
        }

        const { id } = await params;
        const deletedSubCategory = await Subcategory.findByIdAndDelete(id);

        if (!deletedSubCategory) {
            return NextResponse.json({ error: 'SubCategory not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'SubCategory deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
    }
}
