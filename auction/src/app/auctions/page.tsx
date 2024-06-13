import React from "react";
import ItemList from "../_components/item-list";
import EmptyState from "./empty-state";
import { getCurrentUserItems } from "@/data-access/items";

type Props = {};

const Auctions = async(props: Props) => {
  const userItems = await getCurrentUserItems()

  if (userItems.length === 0) {
    return <EmptyState />
  }
  
  return (
    <main className="flex flex-col gap-8">
      <ItemList items={userItems} label="Your selling items" />
    </main>
  );

};

export default Auctions;
