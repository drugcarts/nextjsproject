import {
  authenticateUser,
  adminAuthorization,
} from "../../../utils/middleware";
import Category from "../../../models/Category";
import { NextResponse } from "next/server";
import connnectionToDatabase from "@/lib/mongodb";
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
  return name
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.\-_]/g, "")
    .toLowerCase();
}

export async function POST(request) {
  try {
    await connnectionToDatabase();
    const { success, message } = await adminAuthorization();

    if (!success) {
      return NextResponse.json({ error: message }, { status: 401 });
    }

    const {
      url,
      category_name,
      cat_type,
      cat_img, // Optional
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
      const fileName = `category/thumb/${imageFileName(uniqueSuffix)}`;

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: cat_img.type,
        ContentDisposition: "inline",
        ACL: "public-read",
      };

      await s3.send(new PutObjectCommand(uploadParams));
      uploadedImageFileName = imageFileName(uniqueSuffix);
    }

    const isCategory = await Category.findOne({ category_name });
    if (isCategory) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 }
      );
    }

    const newCategory = new Category({
      url,
      category_name,
      cat_type,
      cat_img: uploadedImageFileName,
      imagealt,
      metatitle,
      metadesc,
      metakeyboard,
    });

    await newCategory.save();

    return NextResponse.json(newCategory, { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const rawPage = parseInt(searchParams.get("page"));
  const rawLimit = parseInt(searchParams.get("limit"));

  const page = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
  const limit = Number.isNaN(rawLimit) || rawLimit < 1 ? 10 : rawLimit;

  const search = searchParams.get("search") || "";
  const cat_type = searchParams.get("cat_type") || "";

  try {
    await connnectionToDatabase();
    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.category_name = { $regex: search, $options: "i" };
    }

    if (cat_type) {
      query.cat_type = cat_type;
    }

    const categoryItems = await Category.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalItems = await Category.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const categoriesWithIndex = categoryItems.map((category, index) => ({
      ...category.toObject(),
      sno: skip + index + 1,
    }));

    return NextResponse.json(
      {
        categories: categoriesWithIndex,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching category items:", error);
    return NextResponse.json(
      { error: "Failed to fetch category items" },
      { status: 500 }
    );
  }
}

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const page = parseInt(searchParams.get("page")) || 1;
//   const limit = parseInt(searchParams.get("limit"));
//   const search = searchParams.get("search") || "";
//   const cat_type = searchParams.get("cat_type") || "";

//   try {
//     await connnectionToDatabase();
//     const skip = (page - 1) * limit;

//     let query = {};

//     if (search) {
//       query.category_name = { $regex: search, $options: "i" };
//     }

//     if (cat_type) {
//       query.cat_type = cat_type;
//     }

//     const categoryItems = await Category.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const totalItems = await Category.countDocuments(query);
//     const totalPages = Math.ceil(totalItems / limit);

//     const categoriesWithIndex = categoryItems.map((category, index) => ({
//       ...category.toObject(),
//       sno: skip + index + 1,
//     }));

//     return NextResponse.json(
//       {
//         categories: categoriesWithIndex,
//         pagination: {
//           totalItems,
//           totalPages,
//           currentPage: page,
//         },
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching category items:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch category items" },
//       { status: 500 }
//     );
//   }
// }
