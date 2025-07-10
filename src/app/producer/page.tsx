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

type ProducerFormValues = {
  producerId: string
  fullName: string
  materialType: string
  quantity: string
  location: string
  extractDate: string
  batchId: string
}

export default function Page() {
  const form = useForm<ProducerFormValues>({
    defaultValues: {
      producerId: "",
      fullName: "",
      materialType: "",
      quantity: "",
      location: "",
      extractDate: "",
      batchId: "",
    },
  })

  const onSubmit = (data: ProducerFormValues) => {
    const ipfsHash = "QmDummyIPFSProducerData123"
    const payload = {
      ...data,
      ipfsHash,
      timestamp: new Date().toISOString(),
    }

    console.log("Producer submitted:", data)
    console.log("Data for blockchain:", payload)

    form.reset()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Raw Material Submission (Producer)</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="producerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producer ID</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., PRD12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Ramesh Patel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="materialType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Cotton, Milk, Wheat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity (kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Rajkot, Gujarat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="extractDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harvest/Extraction Date</FormLabel>
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
                  <Input placeholder="Optional: e.g., BATCH-X001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit Material</Button>
        </form>
      </Form>
    </div>
  )
}
