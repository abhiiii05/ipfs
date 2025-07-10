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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Wholesaler Dashboard</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., BulkMart India Pvt. Ltd." {...field} />
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
            name="quantityReceived"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity Received</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 200" {...field} />
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
                  <Input placeholder="e.g., MFG-BATCH-01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit Wholesaler Entry</Button>
        </form>
      </Form>
    </div>
  )
}
