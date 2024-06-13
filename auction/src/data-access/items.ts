import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentSession } from "./users";

export async function getAllItems() {
  // todo: add pagination
  const allItems = await database.query.items.findMany({});
  return allItems;
}

export async function getCurrentUserItems() {
  const { user } = await getCurrentSession();
  if (!user || !user.id) {
    return [];
  }
  const userItems = await database.query.items.findMany({
    where: eq(items.userId, user.id),
  });
  return userItems;
}

export async function getItemById(id: string) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(id)),
  });
  return item;
}
