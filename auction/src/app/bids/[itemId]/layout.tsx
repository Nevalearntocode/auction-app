import React from "react";
import { database } from "@/db/database";
import { eq } from "drizzle-orm";
import { items } from "@/db/schema";
import { ItemContextProvider } from "@/contexts/item-context";
import EmptyState from "./_components/empty-state";
import ModalProvider from "@/providers/modal-provider";

type Props = {
  params: {
    itemId: string;
  };
  children: React.ReactNode;
};

const ItemLayout = async ({ params, children }: Props) => {
  const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(params.itemId)),
  });

  if (!item) {
    return <EmptyState />;
  }

  return (
    <ItemContextProvider value={item}>
      {" "}
      <ModalProvider />
      {children}
    </ItemContextProvider>
  );
};

export default ItemLayout;
