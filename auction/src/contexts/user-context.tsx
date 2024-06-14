"use client";

import { createContext, useContext } from "react";

const UserContext = createContext<string | undefined>("");

export const UserContextProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string | undefined;
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};