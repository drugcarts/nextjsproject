import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Subcategory from '../../../models/SubCategory';
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
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const {
      cat_name,
      subcat_name,
      url,
      cat_img,
      imagealt,
      metatitle,
      metadesc,
      metakeyboard,
    } = await request.json();

    let uploadedImageFileName = "";

    if (cat_img && cat_img.base64 && cat_img.name) {
      const base64Data = cat_img.base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      const uniqueSuffix = Date.now() + "-" + uuidv4() + "-" + cat_img.name;
      const fileName = `category/thumb/sub${imageFileName(uniqueSuffix)}`;
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: cat_img.type,
        ContentDisposition: "inline",
        ACL: "public-read",
      };

      await s3.send(new PutObjectCommand(uploadParams));
      uploadedImageFileName = `sub${imageFileName(uniqueSuffix)}`;
    }

    const isSubCategory = await Subcategory.findOne({ subcat_name });
    if (isSubCategory) {
      return NextResponse.json({ error: "Sub category already exists" }, { status: 400 });
    }

    const addSubCategory = new Subcategory({
      cat_name,
      subcat_name,
      url,
      cat_img: uploadedImageFileName,
      imagealt,
      metatitle,
      metadesc,
      metakeyboard,
    });

    await addSubCategory.save();
    return NextResponse.json(addSubCategory, { status: 200 });
  } catch (error) {
    console.error("Subcategory error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(req) {
    try {
        await connnectionToDatabase();
        const { success, user, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 })
        }

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit"));
        const search = searchParams.get("search") || "";

        const filters = search ? { subcat_name: { $regex: search, $options: "i" } } : {};
        const skip = (page - 1) * limit;

        const subcategoryItems = await Subcategory.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalItems = await Subcategory.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        const subcategoryIndex = subcategoryItems.map((item, index) => ({
            ...item.toObject(),
            sno: skip + index + 1,
        }));

        return NextResponse.json(
            {
                subcategoryItems: subcategoryIndex,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching sub category items:", error);
        return NextResponse.json(
            { error: "Failed to fetch sub category items" },
            { status: 500 }
        );
    }
}