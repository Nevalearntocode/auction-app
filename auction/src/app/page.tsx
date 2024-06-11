import ItemList from "./_components/item-list";
import { getAllItems } from "./actions";


export default async function Home() {
  const allItems = await getAllItems()
  return (
    <main className="flex flex-col gap-8">
      <ItemList items={allItems} />
    </main>
  );
}
