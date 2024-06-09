import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Header = async (props: Props) => {
  const session = await auth();

  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={"/"} className="flex items-center gap-1 hover:underline">
            <Image src={`/logo.png`} width={50} height={50} alt="logo" />
            Auction.com
          </Link>
          <Link href={`/bids/create`} className="hover:underline">
            Post an item
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div>{session?.user?.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
