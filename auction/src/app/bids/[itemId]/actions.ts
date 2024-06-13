"use server"

import { getCurrentSession } from "@/app/actions";
import { database } from "@/db/database";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBidAction(itemId: number, amount: number) {
    const {user} = await getCurrentSession();

    if(!user || !user.id){
        throw new Error("Unauthorized");
    }

    const item = await database.query.items.findFirst({where: eq(items.id, itemId)});
    
    if (!item) {
        throw new Error("Item not found");
    }
    const latestBidValue = item.currentBid + amount;

    await database.insert(bids).values({
        amount,
        itemId,
        userId: user.id
    })

    await database.update(items).set({currentBid: latestBidValue}).where(eq(items.id, itemId))
    revalidatePath(`/bids/${itemId}`)
}