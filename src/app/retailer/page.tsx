"use client"

import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { blockchainService } from "../../../utils/blockchainService";
import { FormDataForContractOfRetailer } from "../../../utils/contract";
import { useState } from "react";

const formSchema = z.object({
  retailerId: z.string().min(1, { message: "Retailer ID is required." }),
  storeName: z.string().min(1, { message: "Store name is required." }),
  productReceived: z.string().min(1, { message: "Product received is required." }),
  wholesalerId: z.string().min(1, { message: "Wholesaler ID is required." }),
  quantityReceived: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
  receivedDate: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Invalid date" }),
  batchId: z.string().min(1, { message: "Batch ID is required." }),
});

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const form = useForm<FormData>({
    defaultValues: {
      retailerId: "",
      storeName: "",
      productReceived: "",
      wholesalerId: "",
      quantityReceived: 0,
      receivedDate: "",
      batchId: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("Starting the submission process...");

    const payload = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    try {
      setSubmitStatus("Uploading data to IPFS...");
      const res = await fetch("/api/uploadToIPFS", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const ipfsData = await res.json();
      if (!ipfsData.success) {
        throw new Error(`IPFS upload failed: ${ipfsData.error}`);
      }

      setSubmitStatus("IPFS upload successful! Storing on blockchain...");

      const contractFormDataRetail: FormDataForContractOfRetailer = {
        ...data,
        timestamp: payload.timestamp,
      };

      const blockchainResult = await blockchainService.storeRetailerData(
        ipfsData.cid,
        contractFormDataRetail
      );

      if (!blockchainResult.success) {
        throw new Error(`Blockchain storage failed: ${blockchainResult.error}`);
      }

      setSubmitStatus("🎉 Success! Data stored on IPFS and Blockchain!");
      alert(
        `SUCCESS!\n\n` +
        `IPFS Hash: ${ipfsData.cid}\n` +
        `Blockchain Tx: ${blockchainResult.txHash}\n` +
        `Batch ID: ${data.batchId}\n\n` +
        `Your data is now permanently stored!`
      );
      form.reset();
    } catch (error: any) {
      setSubmitStatus(error.message || "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-100 flex items-center justify-center px-4 py-10">
  <div className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-10 border border-slate-200 backdrop-blur-sm">
    <h1 className="text-4xl font-bold text-teal-700 mb-8 text-center">
      Retailer Dashboard
    </h1>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Retailer ID */}
        <FormField
          control={form.control}
          name="retailerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Retailer ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., RTL99887"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Store Name */}
        <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Store Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Fashion Hub"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Product Received */}
        <FormField
          control={form.control}
          name="productReceived"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Product Received</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Cotton Shirt"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Wholesaler ID */}
        <FormField
          control={form.control}
          name="wholesalerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Wholesaler ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., WHL56789"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Quantity Received */}
        <FormField
          control={form.control}
          name="quantityReceived"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Quantity Received</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 120"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Received Date */}
        <FormField
          control={form.control}
          name="receivedDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Received Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Batch ID */}
        <FormField
          control={form.control}
          name="batchId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Batch ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., BATCH-RTL-01"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-2.5 rounded-xl transition duration-200 shadow-md"
          >
            {isSubmitting ? "Submitting..." : "Submit Retail Data"}
          </Button>

          {submitStatus && (
            <div className="text-sm text-slate-600 mt-3 text-center animate-fade-in">
              {submitStatus}
            </div>
          )}
        </div>
      </form>
    </Form>
  </div>
</div>

  );
}
