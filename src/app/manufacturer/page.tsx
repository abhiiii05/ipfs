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

type ManufacturerFormValues = {
  manufacturerId: string
  companyName: string
  productName: string
  rawMaterialUsed: string
  quantityUsed: string
  productionDate: string
  batchId: string
}

export default function Page() {
  const form = useForm<ManufacturerFormValues>({
    defaultValues: {
      manufacturerId: "",
      companyName: "",
      productName: "",
      rawMaterialUsed: "",
      quantityUsed: "",
      productionDate: "",
      batchId: "",
    },
  })

  const onSubmit = (data: ManufacturerFormValues) => {
    const ipfsHash = "QmManufacturerHashXYZ"
    const payload = {
      ...data,
      ipfsHash,
      timestamp: new Date().toISOString(),
    }

    console.log("Manufacturer Submission:", data)
    console.log("Blockchain Payload:", payload)

    form.reset()
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
          <Button type="submit">Submit Manufacturing Data</Button>
        </form>
      </Form>
    </div>
  )
}
