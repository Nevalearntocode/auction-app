"use client";

import { useItemContext } from "@/contexts/item-context";
import React from "react";
import BiddingButton from "./bidding-button";
import { bid } from "@/types";

type Props = {
};

const ItemInfo = ({}: Props) => {
  const item = useItemContext();
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col">
        <div className="text-xl font-semibold pb-2">
          Starting price: <span className="font-bold">${item.startingPrice}</span>
        </div>
        <div className="pt-2">
          <p className="text-sm font-semibold pb-2">
            Current price: <span className="font-bold">${item.currentBid}</span>
          </p>
        </div>
        <div className="pt-2">
          <p className="text-sm italic pb-2">
            Bid interval: <span className="font-semibold">${item.bidInterval}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;

