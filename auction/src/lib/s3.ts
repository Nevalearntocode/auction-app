"use server"

import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/env";

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, ACCOUNT_ID, BUCKET_NAME } = env;

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export async function getSignedUrlForS3Object(key: string, type: string) {
  return await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: type,
    }),
    { expiresIn: 3600 },
  );
}

// await S3.send(new ListBucketsCommand(""));
// await S3.send(new ListObjectsV2Command({ Bucket: "my-bucket-name" }));
