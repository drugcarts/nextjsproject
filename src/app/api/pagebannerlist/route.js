import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import PageBanner from '../../../models/PageBanner';
import { NextResponse } from 'next/server';
// import connnectionToDatabase from '@/lib/mongodb';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import connnectionToDatabase from '@/lib/mongodb';
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
            pagename,
            image,
            alt,
            status,
        } = await request.json();

        const base64Data = image.base64.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        const uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + image.name
        const fileName = `admincolor/homepage/pagebanner/${imageFileName(uniqueSuffix)}`
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: image.type,
            ContentDisposition: "inline",
            ACL: "public-read",
        };

        await s3.send(new PutObjectCommand(uploadParams));

        const isPageBanner = await PageBanner.findOne({ pagename });
        if (isPageBanner) {
            return NextResponse.json({ error: 'page name already exist' }, { status: 404 })
        }

        const addPageBanner = new PageBanner({
            pagename,
            image: imageFileName(uniqueSuffix),
            alt,
            status,
        });

        await addPageBanner.save();
        return NextResponse.json(addPageBanner, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { pagename: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const skip = (page - 1) * limit;

        const PageBannerItems = await PageBanner.find(filters)
            .sort({ updated_at: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await PageBanner.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const PageBannerIndex = PageBannerItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                page_bannners: PageBannerIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching PageBanner items:", error);
        return NextResponse.json(
            { error: "Failed to fetch PageBanner items" },
            { status: 500 }
        );
    }
}