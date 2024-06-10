"use client"

import { items } from '@/db/schema'
import { getImageUrl } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    item: (typeof items.$inferSelect),
}

const ItemCard = ({item}: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded-md border p-4">
      <Image
        src={getImageUrl(item.fileName)}
        alt={item.name}
        width={200}
        height={200}
        className="h-36 w-auto rounded-md"
      />
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p>Starting price: $ {item.startingPrice}</p>
      <div></div>
    </div>
  );
}

export default ItemCard