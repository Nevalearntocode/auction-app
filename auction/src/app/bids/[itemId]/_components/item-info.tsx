"use client";

import { useItemContext } from "@/contexts/item-context";
import React from "react";
import BiddingButton from "./bidding-button";
import { bid } from "@/types";

type Props = {
  bids: bid[]
};

const ItemInfo = ({bids}: Props) => {
  const item = useItemContext();
  return (
    <div className="flex flex-col gap-y-4">
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
      {bids.length > 0 && (

      <div className="flex items-center gap-8">
        <BiddingButton state="manual" />
      </div>
      )}
    </div>
  );
};

export default ItemInfo;
