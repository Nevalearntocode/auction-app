import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const EmptyState = (props: Props) => {
  return (
    <div className="my-12 flex flex-col items-center justify-center space-y-8">
      <Image src={`/notfound.svg`} alt="notfound" width={200} height={200} />
      <h2 className="text-2xl font-bold">You have no auctions yet</h2>
      <Button asChild>
        <Link href={`/bids/create`}>Create an auction</Link>
      </Button>
    </div>
  );
};

export default EmptyState;
