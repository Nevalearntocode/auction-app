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
  interval,
}: {
  name: string;
  startingPrice: number;
  fileName: string;
  interval: number;
}) {
  const { user } = await getCurrentSession();

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  const formattedInterval = parseFloat(interval.toFixed(2));
  const formattedStartingPrice = parseFloat(startingPrice.toFixed(2));

  await database.insert(items).values({
    name: name,
    startingPrice: formattedStartingPrice,
    fileName,
    userId: user.id,
    bidInterval: formattedInterval,
    currentBid: formattedStartingPrice,
  });

  redirect("/");
}
