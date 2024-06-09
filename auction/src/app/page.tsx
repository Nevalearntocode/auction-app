import ItemForm from "./_components/item-form";
import ItemList from "./_components/item-list";

export default async function Home() {
  return (
    <main className="container mx-auto my-12 flex flex-col gap-8">
      <ItemForm />
      <ItemList />
    </main>
  );
}
