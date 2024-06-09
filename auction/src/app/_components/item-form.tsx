"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {};

const formSchema = z.object({
  name: z.string(),
});

type FormType = z.infer<typeof formSchema>;

const ItemForm = (props: Props) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: FormType) => {
    console.log(data);
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
        <Button className="w-1/4 self-end" disabled={isLoading}>
          Post item
        </Button>
      </form>
    </Form>
  );
};

export default ItemForm;
