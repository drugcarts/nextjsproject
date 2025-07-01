import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Generic from '../../../models/Generic';
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
            catnames,
            subname,
            url,
            generices,
            gen_img,
            imagealt,
            description,
            usesofmeds,
            useofbenefits,
            indicat,
            mechanism,
            medicinework,
            contraindications,
            sideeffects,
            faqs,
            pregnancy,
            breastfeeding,
            kidneyproblem,
            liverdisease,
            asthma,
            takemedicine,
            adult,
            childrenmed,
            elderlymed,
            alcohol,
            heartdisease,
            driving,
            warnings,
            talkdoctor,
            instructions,
            druginteraction,
            drugfood,
            drugdiease,
            fooditems,
            overdose,
            misseddose,
            disposal,
            fasttag,
            refer,
            metatitle,
            metakeyword,
            metadesc
        } = await request.json();

        const isGenerices = await Generic.findOne({ generices });
        if (isGenerices) {
            return NextResponse.json({ error: 'generices already exist' }, { status: 401 })
        }

        const addGeneric = new Generic({
            catnames,
            subname,
            url,
            generices,
            gen_img,
            imagealt,
            description,
            usesofmeds,
            useofbenefits,
            indicat,
            mechanism,
            medicinework,
            contraindications,
            sideeffects,
            faqs,
            pregnancy,
            breastfeeding,
            kidneyproblem,
            liverdisease,
            asthma,
            takemedicine,
            adult,
            childrenmed,
            elderlymed,
            alcohol,
            heartdisease,
            driving,
            warnings,
            talkdoctor,
            instructions,
            druginteraction,
            drugfood,
            drugdiease,
            fooditems,
            overdose,
            misseddose,
            disposal,
            fasttag,
            refer,
            metatitle,
            metakeyword,
            metadesc
        });
        await addGeneric.save();
        return NextResponse.json(addGeneric, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit"));
    const search = searchParams.get("search") || "";

    const filters = search ? { generices: { $regex: search, $options: "i" } } : {};

    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const skip = (page - 1) * limit;

        const genericItems = await Generic.find(filters)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Generic.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const genericItemsWithIndex = genericItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                generics: genericItemsWithIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching generic items:", error);
        return NextResponse.json(
            { error: "Failed to fetch generic items" },
            { status: 500 }
        );
    }
}