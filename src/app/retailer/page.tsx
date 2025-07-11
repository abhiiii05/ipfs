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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Retailer Dashboard</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="retailerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Retailer ID</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., RTL99887" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Fashion Hub" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productReceived"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Received</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Cotton Shirt" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wholesalerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wholesaler ID</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., WHL56789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantityReceived"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity Received</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 120" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="receivedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Received Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="batchId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch ID</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., BATCH-RTL-01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Retail Data"}
          </Button>
          {submitStatus && (
            <div className="text-sm text-gray-600 mt-2">{submitStatus}</div>
          )}
        </form>
      </Form>
    </div>
  );
}
