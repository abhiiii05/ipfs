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
import { FormDataForContractOfManufacturer } from "../../../utils/contract";
import { useState } from "react";

const formSchema = z.object({
  manufacturerId: z.string().min(1, { message: "Manufacturer ID is required." }),
  companyName: z.string().min(1, { message: "Company name is required." }),
  productName: z.string().min(1, { message: "Product name is required." }),
  rawMaterialUsed: z.string().min(1, { message: "Raw material used is required." }),
  quantityUsed: z.string().min(1, { message: "Quantity used is required." }),
  productionDate: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: "Invalid production date.",
  }),
  batchId: z.string().min(1, { message: "Batch ID is required." }),
});

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const form = useForm<FormData>({
    defaultValues: {
      manufacturerId: "",
      companyName: "",
      productName: "",
      rawMaterialUsed: "",
      quantityUsed: "",
      productionDate: "",
      batchId: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onChange",
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("Starting the submission process...");
    const payload = {
      ...data,
      timestamp: new Date().toISOString(),
    }
    try {
      setSubmitStatus("Uploading data to IPFS...");
      const res = await fetch("/api/uploadToIPFS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const ipfsData = await res.json();
      if (!ipfsData.success) {
        throw new Error("Failed to upload data to IPFS");
      }

      setSubmitStatus("IPFS upload successful! Storing on blockchain...");

      const contractFormDataManufacturer: FormDataForContractOfManufacturer = {
        ...data,
        productionDate: new Date(data.productionDate).toISOString(),
      };

      const blockchainResult = await blockchainService.storeManufacturerData(
        ipfsData.cid,
        contractFormDataManufacturer
      );
      if (!blockchainResult.success) {
        throw new Error("Failed to store data on blockchain");
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
    }
    catch (error: any) {
      console.error("Submission failed:", error);
      setSubmitStatus(`Error: ${error.message || "Unknown error occurred"}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manufacturer Dashboard</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="manufacturerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturer ID</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., MFG78901" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., FabTech Industries" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Cotton Shirt" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rawMaterialUsed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raw Material Used</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Organic Cotton" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantityUsed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity Used (kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 50" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Production Date</FormLabel>
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
                  <Input placeholder="e.g., MFG-BATCH-01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormControl>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Manufacturing Data"}
              </Button>
            </FormControl>
            <FormMessage>
              {submitStatus && (
                <div className="mt-2 text-sm text-gray-600">{submitStatus}</div>
              )}
            </FormMessage>
          </FormItem>
        </form>
      </Form>
    </div>
  )
}
