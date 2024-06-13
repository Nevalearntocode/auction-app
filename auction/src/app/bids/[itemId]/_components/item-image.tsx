"use client"

import { useItemContext } from '@/contexts/item-context';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

type Props = {
}

const ItemImage = ({}: Props) => {
  const item = useItemContext();

  return (
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
  );
}

export default ItemImage