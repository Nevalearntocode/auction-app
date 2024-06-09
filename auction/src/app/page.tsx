import ItemList from "./bids/create/_components/item-list";
import { database } from "@/db/database";

export default async function Home() {
  const items = await database.query.items.findMany()

  return (
    <main className="container mx-auto my-12 flex flex-col gap-8">
      <ItemList items={items} />
    </main>
  );
}
