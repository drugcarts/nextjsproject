import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function imageFileName(name) {
  return name.trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "").toLowerCase();
}

async function uploadFileToS3(file, folder, fileName, fileType, path = "") {
  const fileBuffer = file;
  const uniqueSuffix = Date.now() + '-' + uuidv4() + '-' + fileName
// const folder = "mycategory";
  // const fileName = ${folder}/${uuidv4()}.${fileExt};
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}/${path}${imageFileName(uniqueSuffix)}`,
    Body: fileBuffer,
    ContentType: fileType?.type,
    ContentDisposition: "inline",
    ACL: "public-read",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${path}${imageFileName(uniqueSuffix)}`;
  return url;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");
    const path = formData.get("path") || "";

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadFileToS3(buffer, folder, file.name, file, path);

    return NextResponse.json({ success: true, url });
  } catch (error) {
    return NextResponse.json({ error });
  }
}


export async function DELETE(request) {
  try {
    const { fileName } = await request.json();

    if (!fileName) {
      return NextResponse.json({ error: "fileName is required" }, { status: 400 });
    }

    // Format the file path as it was saved
    const formattedFileName = `mycategory/${imageFileName(fileName)}`;
console.log(formattedFileName);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: formattedFileName,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
