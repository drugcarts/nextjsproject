import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Diseases from '../../../models/Diseases';
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
            url,
            picture,
            alt,
            generics,
            video,
            videoalt,
            about,
            structure,
            epidemiology,
            classfi,
            causativefa,
            riskfc,
            pathophysiology,
            routes,
            symptoms,
            labtest,
            radiology,
            diagnostic,
            medical,
            surgical,
            prognosis,
            comp,
            prevention,
            reference,
            metatitle,
            metakeyboard,
            metadesc,
            date,
            status,
            timestamp,
            updated_at
        } = await request.json();

        let uploadedImageFileName = "";

        if (picture && picture.base64 && picture.name) {
            const base64Data = picture.base64.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");

            const uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + picture.name
            const fileName = `press/${imageFileName(uniqueSuffix)}`
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
        const isDiseases = await Diseases.findOne({ name });
        if (isDiseases) {
            return NextResponse.json({ error: 'Diseases already exist' }, { status: 401 })
        }

        const addDiseases = new Diseases({
            name,
            url,
            picture: uploadedImageFileName,
            alt,
            generics,
            video,
            videoalt,
            about,
            structure,
            epidemiology,
            classfi,
            causativefa,
            riskfc,
            pathophysiology,
            routes,
            symptoms,
            labtest,
            radiology,
            diagnostic,
            medical,
            surgical,
            prognosis,
            comp,
            prevention,
            reference,
            metatitle,
            metakeyboard,
            metadesc,
            date,
            status,
            timestamp,
            updated_at
        });

        await addDiseases.save();
        return NextResponse.json(addDiseases, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { name: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const skip = (page - 1) * limit;

        const DiseasesItems = await Diseases.find(filters)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Diseases.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const DiseasesIndex = DiseasesItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                diseases_list: DiseasesIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching Diseases items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Diseases items" },
            { status: 500 }
        );
    }
}