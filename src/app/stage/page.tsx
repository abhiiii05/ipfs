"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Zap, AlertCircle } from "lucide-react";

const formSchema = z.object({
  userEmail: z.string().email({ message: "Please enter a valid email address." }),
  api: z.string().min(1, { message: "API name is required." }),
  manufac: z.string().min(1, { message: "Manufacturer name is required." }),
  purity: z.coerce.number().min(0, "Must be positive").max(100, "Cannot exceed 100"),
  gmpId: z.string().min(1, { message: "GMP ID is required." }),
  batchId: z.string().min(1, { message: "Batch ID is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  productionDate: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Invalid date" }),
  expDate: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Invalid date" }),
});

type FormData = z.infer<typeof formSchema>;

export default function StagePage() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: FormData) => {
    const payload = {
      api: formData.api,
      BatchId: formData.batchId,
      Manufacturer: formData.manufac,
      Country: formData.country,
      Purity: formData.purity,
      ProductionDate: formData.productionDate,
      ExpiryDate: formData.expDate,
      GMPID: formData.gmpId,
      UploaderEmail: formData.userEmail || "user@gmail.com",
    };

    try {
      const res = await fetch("/api/uploadToIPFS", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert(`Data pinned to IPFS!\nCID: ${data.cid}`);
        console.log(`🔗 IPFS URL: https://gateway.pinata.cloud/ipfs/${data.cid}`);
      } else {
        alert("❌ IPFS upload failed. Check console for details.");
        console.error(data.error);
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-slate-400" />
              <span className="text-slate-300">user@gmail.com</span>
            </div>
            <div className="text-slate-400">{"Role/Stage"}</div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Row 1: API and BatchID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="api" className="text-slate-300">API</Label>
                <Input id="api" {...register("api")} className="bg-slate-700 border-slate-600 text-white" placeholder="Enter API" />
                {errors.api && <p className="text-red-500 text-xs flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.api.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchId" className="text-slate-300">BatchID</Label>
                <Input id="batchId" {...register("batchId")} className="bg-slate-700 border-slate-600 text-white" placeholder="Enter Batch ID" />
                {errors.batchId && <p className="text-red-500 text-xs flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.batchId.message}</p>}
              </div>
            </div>

            {/* Row 2: Manufac and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manufac" className="text-slate-300">Manufacturer</Label>
                <Input id="manufac" {...register("manufac")} className="bg-slate-700 border-slate-600 text-white" placeholder="Enter Manufacturer" />
                {errors.manufac && <p className="text-red-500 text-xs flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.manufac.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="text-slate-300">Country</Label>
                <Input id="country" {...register("country")} className="bg-slate-700 border-slate-600 text-white" placeholder="Enter Country" />
                {errors.country && <p className="text-red-500 text-xs flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.country.message}</p>}
              </div>
            </div>

            {/* Row 3: Purity and Production Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purity" className="text-slate-300">Purity (%)</Label>
                <Input id="purity" type="number" {...register("purity")} className="bg-slate-700 border-slate-600 text-white" placeholder="Enter Purity %" />
                {errors.purity && <p className="text-red-500 text-xs flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.purity.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="productionDate" className="text-slate-300">Production Date</Label>
                <Input id="productionDate" type="date" {...register("productionDate")} className="bg-slate-700 border-slate-600 text-white" />
                {errors.productionDate && <p className="text-red-500 text-xs flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.productionDate.message}</p>}
              </div>
            </div>

            {/* Row 4: GMPID and EXP Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gmpId" className="text-slate-300">GMPID</Label>
                <Input id="gmpId" {...register("gmpId")} className="bg-slate-700 border-slate-600 text-white" placeholder="Enter GMP ID" />
                {errors.gmpId && <p className="text-red-500 text-xs flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.gmpId.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="expDate" className="text-slate-300">EXP Date</Label>
                <Input id="expDate" type="date" {...register("expDate")} className="bg-slate-700 border-slate-600 text-white" />
                {errors.expDate && <p className="text-red-500 text-xs flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.expDate.message}</p>}
              </div>
            </div>

            {/* Row 5: User Email */}
            <div className="space-y-2">
              <Label htmlFor="userEmail" className="text-slate-300">User Email</Label>
              <Input id="userEmail" type="email" {...register("userEmail")} className="bg-slate-700 border-slate-600 text-white" placeholder="Enter your email address" />
              {errors.userEmail && <p className="text-red-500 text-xs flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.userEmail.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" disabled={!isValid} className="w-full bg-slate-600 hover:bg-slate-500 text-white font-medium py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                <Zap className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </div>
            
            {!isValid && (
              <p className="text-sm text-slate-400 text-center">
                Please fill in all fields correctly to submit the form.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
