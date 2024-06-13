import React from "react";
import ItemImage from "./_components/item-image";
import BiddingInfo from "./_components/bidding-info";
import ItemInfo from "./_components/item-info";
import { getBidsWithUsernameAndImageByItemId } from "@/data-access/bids";
type Props = {
  params: {
    itemId: string;
  };
};

const ItemDetail = async ({ params }: Props) => {
  const bids = await getBidsWithUsernameAndImageByItemId(params.itemId)
  return (
    <main className="w-full">
      <div className="grid w-full grid-cols-2 gap-8">
        <ItemImage />
        <BiddingInfo bids={bids} />
        <ItemInfo />
      </div>
    </main>
  );
};

export default ItemDetail;
