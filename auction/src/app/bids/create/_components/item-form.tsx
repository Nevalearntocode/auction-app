"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createItemAction } from "../actions";
import { toast } from "sonner";

type Props = {};

const itemFormSchema = z.object({
  name: z.string(),
  price: z.string().default("0"),
});

export type itemFormType = z.infer<typeof itemFormSchema>;

const ItemForm = (props: Props) => {
  const form = useForm<itemFormType>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: "",
      price: "1",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: itemFormType) => {
    // if (!parseFloat(data.price) || parseFloat(data.price) <= 0) {
    //   toast.info("Product price need to be a number and greater than 0.");
    //   return;
    // }
    try {
      await createItemAction(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <FormLabel className="text-3xl font-bold">Post an item to sell</FormLabel>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-lg flex-col gap-4 rounded-md border-2 px-8 py-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <Input
              placeholder="Item name"
              disabled={isLoading}
              {...field}
              className=""
            />
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <div className="relative flex items-center">
              <Input
                placeholder="Starting price"
                disabled={isLoading}
                {...field}
                type="number"
                step="0.01"
                min="0"
                className="px-6"
              />
              <span className="absolute left-2">$</span>
            </div>
          )}
        />
        <Button className="w-1/4 self-end" disabled={isLoading}>
          Post item
        </Button>
      </form>
    </Form>
  );
};

export default ItemForm;
