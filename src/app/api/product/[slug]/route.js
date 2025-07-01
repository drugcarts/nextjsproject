import Product from "../../../../models/Product";
import { authenticateUser, adminAuthorization } from "../../../../utils/middleware";
import { NextResponse } from "next/server";
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
    // const { success, user, message } = await authenticateUser();

    // if (!success) {
    //   return NextResponse.json({ error: message }, { status: 401 });
    // }

    const { slug } = await params;
    console.log("Fetching product for slug:", slug);

    let product = await Product.findOne({ url: slug });
    if (!product) {
      product = await Product.findById(slug).catch(() => null);
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Error fetching product" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connnectionToDatabase();

    const { slug } = await params;
    const data = await request.json();

    // Find by URL slug or fallback to _id
    let product = await Product.findOne({ url: slug });
    if (!product) {
      product = await Product.findById(slug).catch(() => null);
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let newImageKey = product.product_img;

    // Check for new image in request
    if (data.product_img && typeof data.product_img === "object" && data.product_img.name) {
       const { name, type, data: imageData } = data.product_img;
      const buffer = Buffer.from(imageData, "base64");

      const uniqueSuffix = Date.now() + "-" + uuidv4() + "-" + name;
      newImageKey = `category/product/${imageFileName(uniqueSuffix)}`;

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: newImageKey,
        Body: buffer,
        ContentType: type,
        ContentDisposition: "inline",
        ACL: "public-read",
      };

      await s3.send(new PutObjectCommand(uploadParams));

      // Optional: delete old image from S3 if needed
    }

    // Update fields
    Object.keys(data).forEach((key) => {
      if (key !== "product_img") {
        product[key] = data[key];
      }
    });

    product.product_img = newImageKey;

    await product.save();

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Error updating product" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connnectionToDatabase();

    const { slug } = await params;

    let product = await Product.findOneAndDelete({ url: slug });

    if (!product) {
      product = await Product.findByIdAndDelete(slug).catch(() => null);
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Error deleting product" }, { status: 500 });
  }
}
