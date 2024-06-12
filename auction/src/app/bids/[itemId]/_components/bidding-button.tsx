"use client";

import { Button } from "@/components/ui/button";
import { useBidModal } from "@/hooks/use-bid-modal";
import React from "react";

type Props = {
  state: "quick" | "manual";
};

const BiddingButton = ({ state = "manual" }: Props) => {
  const { onOpen } = useBidModal();
  const onQuickBidding = () => {
    console.log("Quick Bidding");
  };

  const onStartBidding = () => {
    onOpen()
  };

  return (
    <Button onClick={state === "quick" ? onQuickBidding : onStartBidding}>
      {state === "quick" ? "Quick Bidding" : "Start Bidding"}
    </Button>
  );
};

export default BiddingButton;
