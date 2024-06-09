"use server";

import { getCurrentSession } from "@/app/actions";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { redirect } from "next/navigation";
import { itemFormType } from "./_components/item-form";

export async function createItemAction(data: itemFormType) {
  const { user } = await getCurrentSession();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await database.insert(items).values({
    name: data.name,
    startingPrice: parseFloat(data.price),
    userId: user.id as string,
  });

  redirect("/");
}
