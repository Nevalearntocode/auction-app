"use server";

import { auth } from "@/auth";
import { items } from "@/db/schema";
import { database } from "@/db/database";
import { eq } from "drizzle-orm";

export async function getCurrentSession() {
  const session = await auth();

  if (!session || !session.user) {
    return { user: null, session: null };
  }

  return { user: session.user, session };
}

export async function getAllItems(): Promise<(typeof items.$inferSelect)[]> {
  const allItems = await database.query.items.findMany();
  return allItems;
}

export async function getCurrentUserItems(): Promise<(typeof items.$inferSelect)[]> {
  const { user } = await getCurrentSession();
  if (!user || !user.id) {
    return [];
  }
  const userItems = await database.query.items.findMany({
    where: eq(items.userId, user.id)
  })
  return userItems;
}
