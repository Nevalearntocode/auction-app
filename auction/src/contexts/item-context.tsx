"use client";

import { createContext, useContext } from "react";
import { items } from "@/db/schema";

export const ItemContext = createContext<typeof items.$inferSelect | null>(
  null,
);

export function ItemContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: typeof items.$inferSelect;
}) {
  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
}

export function useItemContext() {
  const item = useContext(ItemContext);

  if (!item) {
    throw new Error(
      "useItemContext must be used within an ItemContextProvider",
    );
  }

  return item;
}
