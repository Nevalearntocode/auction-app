import React from "react";
import ItemImage from "./_components/item-image";
import BiddingInfo from "./_components/bidding-info";
import ItemInfo from "./_components/item-info";
import { database } from "@/db/database";
import { bids } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
type Props = {
  params: {
    itemId: string;
  };
};

const ItemDetail = async ({ params }: Props) => {
  const currentBids = await database.query.bids.findMany({
    where: eq(bids.itemId, parseInt(params.itemId)),
    orderBy: desc(bids.id),
    with: { user: true },
    limit: 4,
  })

  return (
    <main className="w-full">
      <div className="grid w-full grid-cols-2 gap-8">
        <ItemImage />
        <BiddingInfo bids={currentBids} />
        <ItemInfo bids={currentBids} />
      </div>
    </main>
  );
};

export default ItemDetail;
