"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Zap } from "lucide-react";

export default function StagePage() {
  const [formData, setFormData] = useState({
    userEmail: "",
    api: "",
    manufac: "",
    purity: "",
    gmpId: "",
    batchId: "",
    country: "",
    productionDate: "",
    expDate: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async() => {
    // console.log("Form submitted:", formData);
    // alert("Form submitted successfully!");
    if(!isFormValid) return;

    const payload = {
      api: formData.api,
      BatchId : formData.batchId,
      Manufacturer : formData.manufac,
      Country: formData.country,
      Purity: formData.purity,
      ProductionDate: formData.productionDate,
      ExpiryDate: formData.expDate,
      GMPID: formData.gmpId,
      UploaderEmail: formData.userEmail || "user@gmail.com"
    };

    try{
      const res = await fetch("/api/uploadToIPFS",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body : JSON.stringify(payload)
      });

      const data = await res.json();

      if(data.success){
        alert("Data pinned to IPFS!\nCID: " + data.cid);
        console.log("🔗 IPFS URL:", `https://gateway.pinata.cloud/ipfs/${data.cid}`);
      }
      else {
        alert("❌ IPFS upload failed. Check console for details.");
        console.error(data.error);
      }
    }
    catch(error){
      alert("something went wrong")
      console.log(error);
    }
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-slate-400" />
              <span className="text-slate-300">user @gmail.com</span>
            </div>
            <div className="text-slate-400">
              {"Role/Stage"}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Row 1: API and BatchID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="api" className="text-slate-300">API</Label>
              <Input
                id="api"
                value={formData.api}
                onChange={(e) => handleInputChange("api", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Enter API"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchId" className="text-slate-300">BatchID</Label>
              <Input
                id="batchId"
                value={formData.batchId}
                onChange={(e) => handleInputChange("batchId", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Enter Batch ID"
              />
            </div>
          </div>

          {/* Row 2: Manufac and Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="manufac" className="text-slate-300">Manufac</Label>
              <Input
                id="manufac"
                value={formData.manufac}
                onChange={(e) => handleInputChange("manufac", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Enter Manufacturer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country" className="text-slate-300">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Enter Country"
              />
            </div>
          </div>

          {/* Row 3: Purity and Production Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purity" className="text-slate-300">Purity</Label>
              <Input
                id="purity"
                value={formData.purity}
                onChange={(e) => handleInputChange("purity", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Enter Purity %"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productionDate" className="text-slate-300">Production Date</Label>
              <Input
                id="productionDate"
                type="date"
                value={formData.productionDate}
                onChange={(e) => handleInputChange("productionDate", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Row 4: GMPID and EXP Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gmpId" className="text-slate-300">GMPID</Label>
              <Input
                id="gmpId"
                value={formData.gmpId}
                onChange={(e) => handleInputChange("gmpId", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Enter GMP ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expDate" className="text-slate-300">EXP Date</Label>
              <Input
                id="expDate"
                type="date"
                value={formData.expDate}
                onChange={(e) => handleInputChange("expDate", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Row 5: User Email */}
          <div className="space-y-2">
            <Label htmlFor="userEmail" className="text-slate-300">User Email</Label>
            <Input
              id="userEmail"
              type="email"
              value={formData.userEmail}
              onChange={(e) => handleInputChange("userEmail", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              placeholder="Enter your email address"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full bg-slate-600 hover:bg-slate-500 text-white font-medium py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="h-4 w-4 mr-2" />
              Submit
            </Button>
          </div>

          {/* Form Status */}
          {!isFormValid && (
            <p className="text-sm text-slate-400 text-center">
              Please fill in all fields to submit the form
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
