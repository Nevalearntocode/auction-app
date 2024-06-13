"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/image-upload";
import axios from "axios";
import { toast } from "sonner";
import { createItemAction, createUploadUrlAction } from "../actions";
import { Button } from "@/components/ui/button";

type Props = {};

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  startingPrice: z.string().min(1, { message: "Starting price is required" }),
  file: z.instanceof(File).nullable(),
  bidInterval: z.string().default("1"),
});

export type CreateItemFormType = z.infer<typeof formSchema>;

const CreateForm = (props: Props) => {
  const form = useForm<CreateItemFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      startingPrice: "",
      file: null,
      bidInterval: "1",
    },
  });

  const { handleSubmit, register, formState: { errors } } = form;
  const isLoading = form.formState.isSubmitting;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("file", file);
    }
  };

  const removeFile = () => {
    form.setValue("file", null);
  };

  const onSubmit = async (data: CreateItemFormType) => {
    if (!data.file) {
      toast.error("Please upload an image");
      return;
    }
    const bidInterval = parseFloat(data.bidInterval);
    const startingPrice = parseFloat(data.startingPrice);

    try {
      const uploadUrl = await createUploadUrlAction(data.file.name, data.file.type);
      await axios.put(uploadUrl, data.file, {
        headers: {
          "Content-Type": data.file.type,
        }
      });
      await createItemAction({
        name: data.name,
        startingPrice,
        interval: bidInterval,
        fileName: data.file.name,
      });
      toast.success("Item created successfully"); 
    } catch (error) {
      console.log(error);
      toast.error("Failed to create item");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-lg flex-col space-y-4 rounded-xl border p-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  required
                  className="max-w-lg"
                  placeholder="Name your item"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startingPrice"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  required
                  type="number"
                  step="0.01"
                  className="max-w-lg"
                  placeholder="What do you want to start the auction at?"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUpload
                  onChange={handleFileChange}
                  onRemove={removeFile}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bidInterval"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  className="max-w-lg"
                  placeholder="Interval"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="self-end"
        >
          {isLoading ? "Posting..." : "Post Item"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateForm;

