"use client"

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  amount: number;
  name: string;
  id: string,
};

const NotificationMessage = ({ amount, name, id }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/bids/${id}`);
  };

  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md"
      onClick={handleClick}
    >
      <p className="text-sm text-muted-foreground">
        Other user has outbid you on
        <span className="font-semibold">
          &nbsp;{name}
        </span>
        . Current price is
        <span className="font-semibold">
          &nbsp;${amount.toFixed(2)}
        </span>
      </p>
      <Link href={`/bids/${id}`} className="text-blue-600 hover:underline">
        Click here to check the latest bid
      </Link>
    </div>
  );
};

export default NotificationMessage;

