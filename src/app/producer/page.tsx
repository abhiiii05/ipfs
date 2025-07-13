"use client"

import { use, useState } from "react"
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
import { FormDataForContractOfProducer } from "../../../utils/contract";

const formSchema = z.object({
  producerId: z.string().min(1, { message: "Producer ID is required." }),
  fullName: z.string().min(1, { message: "Full name is required." }),
  materialType: z.string().min(1, { message: "Material type is required." }),
  quantity: z.string().min(1, { message: "Quantity is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  extractDate: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: "Invalid date.",
  }),
  batchId: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const form = useForm<FormData>({
    defaultValues: {
      producerId: "",
      fullName: "",
      materialType: "",
      quantity: "",
      location: "",
      extractDate: "",
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

      const contractFormDataProducer: FormDataForContractOfProducer = {
        ...data,
        extractDate: new Date(data.extractDate).toISOString(),
        timestamp: new Date().toISOString(),
      };

      const blockchainResult = await blockchainService.storeProducerData(
        ipfsData.cid,
        contractFormDataProducer
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
    form.reset();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-100 flex items-center justify-center px-4 py-10">
  <div className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-10 border border-slate-200 backdrop-blur-sm">
    <h1 className="text-4xl font-bold text-teal-700 mb-8 text-center">
      Raw Material Submission (Producer)
    </h1>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Producer ID */}
        <FormField
          control={form.control}
          name="producerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Producer ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., PRD12345"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Ramesh Patel"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Material Type */}
        <FormField
          control={form.control}
          name="materialType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Material Type</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Cotton, Milk, Wheat"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Quantity */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Quantity (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 100"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Rajkot, Gujarat"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Extraction Date */}
        <FormField
          control={form.control}
          name="extractDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Harvest/Extraction Date</FormLabel>
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
                  placeholder="Optional: e.g., BATCH-X001"
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
            className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-2.5 rounded-xl transition duration-200 shadow-md"
          >
            Submit Material
          </Button>
        </div>
      </form>
    </Form>
  </div>
</div>
  )
}
