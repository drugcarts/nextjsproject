import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import ReviewBy from '../../../models/ReviewBy';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

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

export async function POST(request) {
    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const {
            name,
            picture,
            imagealt,
            qualification,
            desgination,
            experience,
            expdetails,
            about,
            education,
            date,
            timestamp,
            updated_at,
            status
        } = await request.json();

        let uploadedImageFileName = "";

        if (picture && picture.base64 && picture.name) {
            const base64Data = picture.base64.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");

            const uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + picture.name
            const fileName = `admincolor/reviewby/${imageFileName(uniqueSuffix)}`
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName,
                Body: buffer,
                ContentType: picture.type,
                ContentDisposition: "inline",
                ACL: "public-read",
            };

            await s3.send(new PutObjectCommand(uploadParams));
            uploadedImageFileName = imageFileName(uniqueSuffix);
        }
        const isReviewBy = await ReviewBy.findOne({ name });
        if (isReviewBy) {
            return NextResponse.json({ error: 'Name already exist' }, { status: 401 })
        }

        const addReviewBy = new ReviewBy({
            name,
            picture: uploadedImageFileName,
            imagealt,
            qualification,
            desgination,
            experience,
            expdetails,
            about,
            date,
            timestamp,
            updated_at,
            education,
            status
        });

        await addReviewBy.save();
        return NextResponse.json(addReviewBy, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit"));
    const search = searchParams.get("search") || "";

    const filters = search ? { name: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const skip = (page - 1) * limit;

        const ReviewByItems = await ReviewBy.find(filters)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await ReviewBy.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const ReviewByItemsIndex = ReviewByItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                review_by_lists: ReviewByItemsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Writtenby items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Writtenby items" },
            { status: 500 }
        );
    }
}