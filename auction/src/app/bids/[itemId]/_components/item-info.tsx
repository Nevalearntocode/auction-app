"use client";

import { useItemContext } from "@/contexts/item-context";
import React from "react";

type Props = {};

const ItemInfo = (props: Props) => {
  const item = useItemContext();
  return (
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
  );
};

export default ItemInfo;
