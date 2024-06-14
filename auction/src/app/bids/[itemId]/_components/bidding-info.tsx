"use client";

import { formatTimestamp } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { bid } from "@/types";
import { useItemContext } from "@/contexts/item-context";
import { useUserContext } from "@/contexts/user-context";
import BiddingButton from "./bidding-button";

type Props = {
  bids: (bid & {
    user: {
      name: string | null;
      image: string | null;
    };
  })[];
};

const BiddingInfo = ({ bids }: Props) => {
  const item = useItemContext();
  const userId = useUserContext()
  const hasBids = bids.length > 0;
  const shouldShowBiddingButton = !item.endDate || item.endDate >= new Date();
  const isOwner = userId === item.userId;
  return (
    <div className="flex w-full flex-col items-center space-y-8">
      <div className="flex w-full justify-between">
        <h2 className="text-3xl font-bold">
          {hasBids ? `Current bids` : `Auction has ended`}
        </h2>
        {shouldShowBiddingButton && !isOwner && <BiddingButton state="manual" />}
      </div>
      {hasBids ? (
        <div className="flex h-full flex-col justify-between self-start w-full">
          <ul className="space-y-8">
            {bids.map((bid) => (
              <li
                className="gap-2 rounded-xl bg-gray-100 p-8 transition hover:bg-gray-200"
                key={bid.id}
              >
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <span className="font-bold">${bid.total}</span> by
                    <span className="font-semibold">{bid.user.name}</span>
                    <span className="text-sm">
                      {formatTimestamp(bid.timestamp)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="h-full w-full rounded-xl bg-muted">
          <div className="flex h-5/6 w-full flex-1 flex-col items-center justify-center gap-8 rounded-xl">
            <h2 className="text-2xl font-semibold">
              No bids have been placed yet
            </h2>
            <p className="text-center">Please check back later.</p>
            <Image
              src={`/notfound.svg`}
              alt="notfound"
              width={200}
              height={200}
            />
            {userId !== item.userId && <BiddingButton state="manual" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddingInfo;

