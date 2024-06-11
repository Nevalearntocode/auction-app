"use client";

import { Button } from "@/components/ui/button";
import { items } from "@/db/schema";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  item: typeof items.$inferSelect;
};

const ItemCard = ({ item }: Props) => {
  return (
    <div className="flex flex-col justify-between gap-2 rounded-xl border p-8">
      <Image
        src={getImageUrl(item.fileName)}
        alt={item.name}
        width={400}
        height={400}
        className="aspect-[1.2/1] w-full rounded-lg border"
      />
      <div className="flex flex-col gap-y-2">
        <h3 className="text-xl font-semibold">{item.name}</h3>
        <p className="text-lg">Starting price: $ {item.startingPrice}</p>
        <Button asChild>
          <Link href={`/bids/${item.id}`}>Place Bid</Link>
        </Button>
      </div>
    </div>
  );
};

export default ItemCard;
