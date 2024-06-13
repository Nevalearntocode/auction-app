import CreateForm from "./_components/create-form";

export default function CreatePage() {
  return (
    <main className="space-y-8 px-12">
      <h1 className="text-3xl font-bold">Post an Item</h1>
      <CreateForm />
    </main>
  );
}
