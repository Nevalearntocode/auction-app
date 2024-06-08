import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const currentItems = await database.query.items.findMany();
  const session = await auth();

  if(!session) return null
  const user = session.user
  if(!user) return null

  return (
    <main className="container mx-auto my-12">
      {session ? <SignOut /> : <SignIn />}
      <form
        action={async (formData: FormData) => {
          "use server";
          await database.insert(items).values({
            name: formData.get("item") as string,
            userId: user.id!,
          });
          revalidatePath("/");
        }}
      >
        <Input name="item" placeholder="Name your item" />
        <Button type="submit">Post item</Button>
      </form>
      {currentItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </main>
  );
}
