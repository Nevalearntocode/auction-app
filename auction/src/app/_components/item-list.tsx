import { items } from "@/db/schema";
import React from "react";
import ItemCard from "./item-card";

type Props = {
  items: (typeof items.$inferSelect)[];
};

const ItemList = ({ items }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Item for sale</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
