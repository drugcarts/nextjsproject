import { adminAuthorization } from '../../../utils/middleware';
import Blog from '../../../models/Blog';
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
            blogname,
            blogimg,
            blogspoturl,
            url,
            description,
            imagealt,
            blogtype,
            metatitle,
            metadesc,
            metakeyword
        } = await request.json();

        let uploadedImageFileName = "";

        if (blogimg && blogimg.base64 && blogimg.name) {
            const base64Data = blogimg.base64.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");

            const uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + blogimg.name
            const fileName = `blogs/${imageFileName(uniqueSuffix)}`
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName,
                Body: buffer,
                ContentType: blogimg.type,
                ContentDisposition: "inline",
                ACL: "public-read",
            };

            await s3.send(new PutObjectCommand(uploadParams));
            uploadedImageFileName = imageFileName(uniqueSuffix);
        }
        const isBlog = await Blog.findOne({ blogname });
        if (isBlog) {
            return NextResponse.json({ error: 'Blog Name already exist' }, { status: 401 })
        }

        const addBlog = new Blog({
            blogname,
            blogimg: uploadedImageFileName,
            blogspoturl,
            url,
            description,
            imagealt,
            blogtype,
            metatitle,
            metadesc,
            metakeyword
        });

        await addBlog.save();
        return NextResponse.json(addBlog, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const blogtype = searchParams.get("blogtype") || "";

    let query = {};

    if (search) {
        query.blogname = { $regex: search, $options: "i" };
    }

    if (blogtype) {
        query.blogtype = blogtype;
    }

    // const filters = search ? { blogname: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const skip = (page - 1) * limit;

        const BlogItems = await Blog.find(query)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Blog.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limit);

        const BlogWithIndex = BlogItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                blogs: BlogWithIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Blog items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Blog items" },
            { status: 500 }
        );
    }
}