import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {}

const EmptyState = (props: Props) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-semibold">Item not found</h1>
      <p className="text-center">
        The item you are looking for does not exist.
        <br />
        Please go back and search for a different item.
      </p>
      <Image src={`/notfound.svg`} alt="notfound" width={200} height={200} />
      <Button asChild>
        <Link href="/">Go back</Link>
      </Button>
    </div>
  );
}

export default EmptyState