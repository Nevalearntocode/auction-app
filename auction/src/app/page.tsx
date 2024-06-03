import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { bids } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function  Home() {
  const currentBids = await database.query.bids.findMany()

  return ( 
    <main className="container mx-auto my-12">
      <form action={
        async (formData: FormData) => {
          "use server"
          await database.insert(bids).values({})
          revalidatePath("/")
        }
      }>
        <Input name="bid" placeholder="Bid" />
        <Button type="submit">
          Place bid
        </Button>
      </form>
      {currentBids.map((bid) => (
        <div key={bid.id}>
          {bid.id}
        </div>
      ))}
    </main>
  );
}
