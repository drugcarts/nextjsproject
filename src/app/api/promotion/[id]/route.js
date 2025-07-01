import Promotion from '../../../../models/Promotion'
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
        const PromotionId = await Promotion.findById(id);
        if (!PromotionId) {
            return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
        }

        return NextResponse.json(PromotionId, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching Promotion' }, { status: 500 });
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

        const existingPromotion = await Promotion.findById(id);
        if (!existingPromotion) {
            return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
        }

        let uniqueSuffix = null;

        if (body.image && typeof body.image === 'object' && body.image.name) {
            const { name, type, data } = body.image;
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
        }

        const updatedData = {
            ...body,
            image: uniqueSuffix
                ? imageFileName(uniqueSuffix)
                : existingPromotion.image,
        };

        const updatedPromotion = await Promotion.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        return NextResponse.json(updatedPromotion, { status: 200 });
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
        const deletedPromotion = await Promotion.findByIdAndDelete(id);

        if (!deletedPromotion) {
            return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Promotion deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Promotion' }, { status: 500 });
    }
}
