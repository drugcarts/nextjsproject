import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Herbs from '../../../models/Herbs';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function POST(request) {
    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const {
            title,
            url,
            picture,
            alt,
            description,
            languages,
            origin,
            composition,
            types,
            infection,
            eydsorder,
            hedsorder,
            significance,
            dailylife,
            sideeffects,
            compounds,
            modernview,
            dosage,
            precautions,
            contraindicate,
            benefits,
            faq,
            reference,
            metatitle,
            metakeyboard,
            metadesc,
            reviewsy,
            writensy,
            medicinal,
            treatment,
            date,
            status,
            timestamp,
            updated_at
        } = await request.json();

        const isHerbs = await Herbs.findOne({ title });
        if (isHerbs) {
            return NextResponse.json({ error: 'Herbs already exist' }, { status: 401 })
        }

        const addHerbs = new Herbs({
            title,
            url,
            picture,
            alt,
            description,
            languages,
            origin,
            composition,
            types,
            infection,
            eydsorder,
            hedsorder,
            significance,
            dailylife,
            sideeffects,
            compounds,
            modernview,
            dosage,
            precautions,
            contraindicate,
            benefits,
            faq,
            reference,
            metatitle,
            metakeyboard,
            metadesc,
            reviewsy,
            writensy,
            medicinal,
            treatment,
            date,
            status,
            timestamp,
            updated_at
        });

        await addHerbs.save();
        return NextResponse.json(addHerbs, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const filters = search ? { title: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();

        const skip = (page - 1) * limit;

        const HerbsItems = await Herbs.find(filters)
            .sort({ updated_at: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Herbs.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const HerbsIndex = HerbsItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                herbs_list: HerbsIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching InfoGraphics items:", error);
        return NextResponse.json(
            { error: "Failed to fetch InfoGraphics items" },
            { status: 500 }
        );
    }
}