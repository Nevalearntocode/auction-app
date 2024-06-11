import React from "react";
import { database } from "@/db/database";
import { eq } from "drizzle-orm";
import { items } from "@/db/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { formatTimestamp, getImageUrl } from "@/lib/utils";
type Props = {
  params: {
    itemId: string;
  };
};

const ItemDetail = async ({ params }: Props) => {
  const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(params.itemId)),
  });

  // const bids = [
  //   {
  //     id: 1,
  //     name: "Bidder 1",
  //     amount: 100,
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: 2,
  //     name: "Bidder 2",
  //     amount: 200,
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: 3,
  //     name: "Bidder 3",
  //     amount: 300,
  //     timestamp: new Date(),
  //   },
  // ];

  const bids: {
    id: number;
    name: string;
    amount: number;
    timestamp: Date;
  }[] = [];

  const hasBids = bids.length > 0;

  if (!item) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <h1 className="text-2xl font-semibold">Item not found</h1>
        <p className="text-center">
          The item you are looking for does not exist.
          <br />
          Please go back and search for a different item.
        </p>
        <Image src={`/notfound.svg`} alt="notfound" width={200} height={200} />
        <Button asChild>
          <Link href="/">Go back</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="w-full">
      <div className="grid w-full grid-cols-2 gap-8">
        <div className="flex w-full flex-col space-y-8">
          <h1 className="text-3xl font-bold">
            <span className="font-normal">Auction for </span>
            {item.name}
          </h1>
          <div className="relative aspect-[1.2/1] w-5/6 flex-1 rounded-xl">
            <Image
              src={getImageUrl(item.fileName)}
              alt={item.name}
              fill
              className="aspect-video rounded-xl bg-muted p-12"
            />
          </div>
        </div>
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
                <Button>Bid now</Button>
              </div>
            </div>
          )}
        </div>
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
