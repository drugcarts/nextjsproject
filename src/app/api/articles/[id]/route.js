import connnectionToDatabase from '../../../../lib/mongodb';
import Articles from '../../../../models/Articles'
import { adminAuthorization } from '../../../../utils/middleware';
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
        const ArticlesId = await Articles.findById(id);
        if (!ArticlesId) {
            return NextResponse.json({ error: 'Articles not found' }, { status: 404 });
        }

        return NextResponse.json(ArticlesId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Articles' }, { status: 500 });
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

        const existingArticles = await Articles.findById(id);
        if (!existingArticles) {
            return NextResponse.json({ error: 'Articles not found' }, { status: 404 });
        }

        let uniqueSuffix = null;

        if (body.blogimg && typeof body.blogimg === 'object' && body.blogimg.name) {
            const { name, type, data } = body.blogimg;
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
            blogimg: uniqueSuffix
                ? imageFileName(uniqueSuffix)
                : existingArticles.blogimg,
        };

        const updatedArticles = await Articles.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        return NextResponse.json(updatedArticles, { status: 200 });
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
        const deletedArticles = await Articles.findByIdAndDelete(id);

        if (!deletedArticles) {
            return NextResponse.json({ error: 'Articles not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Articles deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Articles' }, { status: 500 });
    }
}
