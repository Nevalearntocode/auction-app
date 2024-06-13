"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { useBidModal } from "@/hooks/use-bid-modal";
import { useItemContext } from "@/contexts/item-context";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createBidAction } from "@/app/bids/[itemId]/actions";
import { toast } from "sonner";

type Props = {};

const formSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required" }),
});

type FormType = z.infer<typeof formSchema>;

const BiddingModal = (props: Props) => {
  const item = useItemContext();
  const { onClose, isOpen } = useBidModal();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: item.bidInterval.toString(),
    },
  });

  const isLoading = form.formState.isSubmitting;
  const interval = item.bidInterval
  const currentBid = item.currentBid
  const biddingAmount: string | number = form.watch("amount");
  function calculateTotalPrice(
    biddingAmount: string | number,
    currentBid: number,
  ): number {
    const parsedBiddingAmount =
      typeof biddingAmount === "string"
        ? parseFloat(biddingAmount)
        : biddingAmount;

    if (isNaN(parsedBiddingAmount)) {
      return currentBid;
    }
    return parseFloat((parsedBiddingAmount + currentBid).toFixed(2));
  }

  const totalPrice = calculateTotalPrice(biddingAmount, currentBid);

  const onSubmit = async (data: FormType) => {
    try {
      await createBidAction(item.id, parseFloat(data.amount));
      toast.success("Bid created successfully");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create bid");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <p>
            Currently bidding for{" "}
            <span className="font-semibold">{item.name}</span>
          </p>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-2">
                  <p className="italic">
                    Current bid:{" "}
                    <span className="font-semibold">${item.currentBid}</span>
                  </p>
                  <Input
                    {...field}
                    placeholder="Amount"
                    step={0.01}
                    type="number"
                    min={interval}
                    className="focus-visible:ring-0"
                  />
                  <p className="italic">
                    Total price:{" "}
                    <span className="font-semibold">${totalPrice}</span>
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="flex self-end">Confirm</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BiddingModal;
