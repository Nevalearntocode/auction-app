import { getAllItems } from "@/data-access/items";
import ItemList from "./_components/item-list";


export default async function Home() {
  const allItems = await getAllItems()
  return (
    <main className="flex flex-col gap-8">
      <ItemList items={allItems} />
    </main>
  );
}
