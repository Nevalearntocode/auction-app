import { Button } from "@/components/ui/button";
import { formatTimestamp } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import BiddingButton from "./bidding-button";

type Props = {};

const BiddingInfo = (props: Props) => {
  const bids: {
    id: number;
    name: string;
    amount: number;
    timestamp: Date;
  }[] = [];

  const hasBids = bids.length > 0;
  return (
    <div className="flex w-full flex-col items-center space-y-8">
      <h2 className="text-2xl font-bold">Current bids</h2>
      {hasBids ? (
        <>
          <ul className="space-y-8">
            {bids.map((bid) => (
              <li
                className="gap-2 rounded-xl bg-gray-100 p-8 transition hover:bg-gray-200"
                key={bid.id}
              >
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <span className="font-bold">${bid.amount}</span> by
                    <span className="font-semibold">{bid.name}</span>
                  </div>
                  <div>
                    <span className="text-sm">
                      {formatTimestamp(bid.timestamp)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="h-full w-full rounded-xl bg-muted">
          <div className="flex h-5/6 w-full flex-1 flex-col items-center justify-center gap-8 rounded-xl">
            <h2 className="text-2xl font-semibold">
              No bids have been placed yet
            </h2>
            <p className="text-center">Be the first to bid on this item.</p>
            <Image
              src={`/notfound.svg`}
              alt="notfound"
              width={200}
              height={200}
            />
            <BiddingButton state="manual" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddingInfo;
