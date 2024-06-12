"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatTimestamp } from "@/lib/utils";
import { useItemContext } from "@/contexts/item-context";
import ItemImage from "./_components/item-image";
import BiddingInfo from "./_components/bidding-info";
type Props = {
  params: {
    itemId: string;
  };
};

const ItemDetail = ({ params }: Props) => {
  const item = useItemContext()

  return (
    <main className="w-full">
      <div className="grid w-full grid-cols-2 gap-8">
        <ItemImage itemImage={item.fileName} itemName={item.name} />
        <BiddingInfo />
        <div className="flex flex-col">
          <div className="text-xl">
            Starting price of{" "}
            <span className="font-bold">${item.startingPrice}</span>
          </div>
          <div>
            <p className="text-sm italic">
              Bid interval:{" "}
              <span className="font-semibold">${item.bidInterval}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ItemDetail;
