import { items } from "@/db/schema";
import React from "react";

type Props = {
  items: (typeof items.$inferSelect)[];
};

const ItemList = ({ items }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Item for sale</h2>
      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 rounded-md border p-4"
          >
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p>Starting price: $ {item.startingPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
