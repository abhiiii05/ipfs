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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-100 flex items-center justify-center px-4 py-10">
  <div className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-10 border border-slate-200 backdrop-blur-sm">
    <h1 className="text-4xl font-bold text-teal-700 mb-8 text-center">
      Manufacturer Dashboard
    </h1>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Manufacturer ID */}
        <FormField
          control={form.control}
          name="manufacturerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Manufacturer ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., MFG78901"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Name */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., FabTech Industries"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Product Name */}
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Product Name</FormLabel>
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

        {/* Raw Material Used */}
        <FormField
          control={form.control}
          name="rawMaterialUsed"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Raw Material Used</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Organic Cotton"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Quantity Used */}
        <FormField
          control={form.control}
          name="quantityUsed"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Quantity Used (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 50"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Production Date */}
        <FormField
          control={form.control}
          name="productionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Production Date</FormLabel>
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
                  placeholder="e.g., MFG-BATCH-01"
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
            {isSubmitting ? "Submitting..." : "Submit Manufacturing Data"}
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
  )
}
