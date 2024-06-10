"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction, createUploadUrlAction } from "./actions";

export default function CreatePage() {
  return (
    <main className="container space-y-8 px-12 py-12">
      <h1 className="text-3xl font-bold">Post an Item</h1>

      <form
        className="flex max-w-lg flex-col space-y-4 rounded-xl border p-8"
        onSubmit={async (e) => {
          e.preventDefault();

          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const file = formData.get("file") as File;

          const uploadUrl = await createUploadUrlAction(file.name, file.type);

          await fetch(uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            }
          });

          const name = formData.get("name") as string;
          const startingPrice = parseFloat(
            formData.get("startingPrice") as string,
          );

          await createItemAction({
            name,
            startingPrice,
            fileName: file.name,
          });
        }}
      >
        <Input
          required
          className="max-w-lg"
          name="name"
          placeholder="Name your item"
        />
        <Input
          required
          className="max-w-lg"
          name="startingPrice"
          type="number"
          step="0.01"
          placeholder="What to start your auction at"
        />
        <Input type="file" name="file"></Input>
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
