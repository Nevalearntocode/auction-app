"use server";

import { getCurrentSession } from "@/app/actions";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { redirect } from "next/navigation";
import { getSignedUrlForS3Object } from "@/lib/s3";

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type);
}

export async function createItemAction({
  name,
  startingPrice,
  fileName,
}: {
  name: string;
  startingPrice: number;
  fileName: string;
}) {
  const { user } = await getCurrentSession();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await database.insert(items).values({
    name: name,
    startingPrice,
    userId: user.id as string,
  });

  redirect("/");
}
