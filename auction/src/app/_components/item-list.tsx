import { items } from "@/db/schema";
import React from "react";
import ItemCard from "./item-card";

type Props = {
  items: (typeof items.$inferSelect)[];
  label?: string;
};

const ItemList = ({ items, label = "Items for sale" }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{label}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemList;

