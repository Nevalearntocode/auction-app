import { database } from "@/db/database";
import { desc, eq } from "drizzle-orm";
import { bids } from "@/db/schema";

export async function getBidsWithUsernameAndImageByItemId(itemId: string) {
  const currentBids = await database.query.bids.findMany({
    where: eq(bids.itemId, parseInt(itemId)),
    orderBy: desc(bids.id),
    with: {
      user: {
        columns: {
          name: true,
          image: true,
        },
      },
    },
    limit: 4,
  });
  return currentBids;
}
