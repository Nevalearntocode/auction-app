"use server";

import { getCurrentSession } from "@/data-access/users";
import { database } from "@/db/database";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Knock } from "@knocklabs/node";
import { env } from "@/env";

const knock = new Knock(env.KNOCK_SECRET);

export async function createBidAction(itemId: number, amount: number) {
  const { user } = await getCurrentSession();

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) {
    throw new Error("Item not found");
  }
  const latestBidValue = item.currentBid + amount;

  await database.insert(bids).values({
    amount,
    itemId,
    userId: user.id,
    total: latestBidValue,
    timestamp: new Date(),
  });

  await database
    .update(items)
    .set({ currentBid: latestBidValue })
    .where(eq(items.id, itemId));

  // todo: send notification
  const currentBids = await database.query.bids.findMany({
    where: eq(bids.itemId, itemId),
    with: { user: true },
  });

  // Collect all unique users who have placed bids on the item,
  // excluding the current user
  const recipients: { id: string; name: string; email: string }[] = [];
  for (const bid of currentBids) {
    // If the bid was placed by a different user and that user hasn't
    // already been added to the recipients list
    if (
      bid.userId != user.id &&
      !recipients.find((recipient) => recipient.id === bid.user.id)
    ) {
      // Add the user to the recipients list
      recipients.push({
        id: bid.user.id,
        name: bid.user.name ?? "Anonymous",
        email: bid.user.email,
      });
    }
  } 

  if (recipients.length > 0) {
    // Send a notification to all recipients
    await knock.workflows.trigger("user-place-bid", {
      // The current user placing the bid
      actor: {
        id: user.id,
        name: user.name ?? "Anonymous",
        email: user.email,
        collection: "users",
      },
      // The recipients of the notification
      recipients,
      // Additional data to include in the notification
      data: {
        itemId,
        amount: latestBidValue,
      },
    });
  }
  console.log("error here?");

  revalidatePath(`/bids/${itemId}`);
}
