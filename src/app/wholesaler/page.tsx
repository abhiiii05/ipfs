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

type WholesalerFormValues = {
  wholesalerId: string
  companyName: string
  productReceived: string
  manufacturerId: string
  quantityReceived: string
  receivedDate: string
  batchId: string
}

export default function Page() {
  const form = useForm<WholesalerFormValues>({
    defaultValues: {
      wholesalerId: "",
      companyName: "",
      productReceived: "",
      manufacturerId: "",
      quantityReceived: "",
      receivedDate: "",
      batchId: "",
    },
  })

  const onSubmit = (data: WholesalerFormValues) => {
    const ipfsHash = "QmWholesalerHash123"
    const payload = {
      ...data,
      ipfsHash,
      timestamp: new Date().toISOString(),
    }

    console.log("Wholesaler Submitted:", data)
    console.log("Blockchain Payload:", payload)

    form.reset()
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-100 flex items-center justify-center px-4 py-10">
  <div className="bg-white shadow-2xl rounded-3xl w-full max-w-3xl p-10 border border-slate-200 backdrop-blur-sm">
    <h1 className="text-4xl font-bold text-teal-700 text-center mb-8">
      Wholesaler Dashboard
    </h1>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., BulkMart India Pvt. Ltd."
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
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
        <FormField
          control={form.control}
          name="quantityReceived"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-slate-700 font-semibold">Quantity Received</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 200"
                  {...field}
                  className="rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-sm"
                />
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

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-2.5 rounded-xl transition duration-200 shadow-md"
          >
            Submit Wholesaler Entry
          </Button>
        </div>
      </form>
    </Form>
  </div>
</div>


  )
}
