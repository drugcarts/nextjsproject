import { authenticateUser, adminAuthorization } from "../../../utils/middleware";
import Product from "../../../models/Product";
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
  return name.trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "").toLowerCase();
}

export async function POST(request) {
  try {
    await connnectionToDatabase();
    const { success, user, message } = await adminAuthorization();

    if (!success) {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    const {
      cat_name,
      subcat_name,
      generices,
      product_code,
      product_name,
      url,
      genericname,
      form,
      brand,
      product_type,
      manufactuer,
      manufactueraddress,
      tabscount,
      strength,
      packageName,
      price,
      packing,
      product_img,
      description,
      disclaimer,
      stock,
      saleprice,
      percentage,
      rexrequired,
      orgin,
      storage,
      temperature,
      timestamp,
      writebyid,
      reviewbyid,
      faq,
      reference,
      metatitle,
      metakeyword,
      metadesc,
      varient,
      imagealt,
      vedio,
      vedioalt,
      userupdate,
      updatetimestamp,
      userid,
      date,
      referwebsite,
      keybenefits,
      keyingredients,
      expires,
      usesofmeds,
      useofbenefits,
      indicat,
      indication,
      mechanism,
      medicinework,
      contraindications,
      sideeffects,
      faqs,
      pregnancy,
      breastfeeding,
      kidneyproblem,
      liverdisease,
      heartdisease,
      asthma,
      takemedicine,
      adult,
      childrenmed,
      elderlymed,
      alcohol,
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
      ingredients,
      direction,
      dosages,
      precaution,
      prostatus,
      paymenttype,
      retunpolicy,
      gst,
      hsn,
    } = await request.json();

    let uploadedImageFileName = "";

    if (product_img && product_img.base64 && product_img.name) {
      const base64Data = product_img.base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      const uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + product_img.name
      const fileName = `category/product/${imageFileName(uniqueSuffix)}`
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: product_img.type,
        ContentDisposition: "inline",
        ACL: "public-read",
      };

      await s3.send(new PutObjectCommand(uploadParams));
      uploadedImageFileName = fileName;
    }

    const isProduct = await Product.findOne({ product_name });
    if (isProduct) {
      return NextResponse.json(
        { error: "Product already exist" },
        { status: 401 }
      );
    }
    const sale = (percentage / 100) * price;
    const saleDetail = price - sale;

    // const rexs = rexrequired;
    // if (rexs === "Yes") {
    //   rexvalue = "rx required";
    // } else {
    //   rexvalue = "";
    // }
    //     const rss = ""
    // const rexs = rexrequired;
    // if (rexs === "Yes") {
    //      rss = "rx required"
    // } else {
    //      rss = ""
    // }

    const addProduct = new Product({
      cat_name,
      subcat_name,
      generices,
      product_code,
      product_name,
      url,
      genericname,
      form,
      brand,
      product_type,
      manufactuer,
      manufactueraddress,
      tabscount,
      strength,
      packageName,
      price,
      packing,
      product_img: uploadedImageFileName,
      description,
      disclaimer,
      stock,
      saleprice,
      percentage,
      rexrequired,
      orgin,
      storage,
      temperature,
      timestamp,
      writebyid,
      reviewbyid,
      faq,
      reference,
      metatitle,
      metakeyword,
      metadesc,
      varient,
      imagealt,
      vedio,
      vedioalt,
      userupdate,
      updatetimestamp,
      userid,
      date,
      referwebsite,
      keybenefits,
      keyingredients,
      expires,
      usesofmeds,
      useofbenefits,
      indicat,
      indication,
      mechanism,
      medicinework,
      contraindications,
      sideeffects,
      faqs,
      pregnancy,
      breastfeeding,
      kidneyproblem,
      liverdisease,
      heartdisease,
      asthma,
      takemedicine,
      adult,
      childrenmed,
      elderlymed,
      alcohol,
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
      ingredients,
      direction,
      dosages,
      precaution,
      prostatus,
      paymenttype,
      retunpolicy,
      gst,
      hsn,
      userid: user?.id
    });

    await addProduct.save();
    return NextResponse.json(addProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const generices = searchParams.get("generices") || "";
  // const brand = searchParams.get("brand") || "";

  const filters = {};

  if (search) {
    filters.brand = { $regex: search, $options: "i" };
  }

  if (generices) {
    filters.generices = { $regex: generices, $options: "i" };
  }

  // if (brand) {
  //     filters.brand = { $regex: brand, $options: "i" };
  // }

  try {
    await connnectionToDatabase();

    const skip = (page - 1) * limit;

    const ProductItems = await Product.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit);

    const totalItems = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json(
      {
        products: ProductItems,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Product items:", error);
    return NextResponse.json(
      { error: "Failed to fetch Product items" },
      { status: 500 }
    );
  }
}
