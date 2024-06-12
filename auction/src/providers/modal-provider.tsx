"use client";

import BiddingModal from "@/components/modals/bidding-modal";
import React, { useEffect, useState } from "react";

type Props = {};

const ModalProvider = (props: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <BiddingModal />
    </>
  );
};

export default ModalProvider;
