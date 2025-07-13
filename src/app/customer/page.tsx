"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type TraceEntry = {
  role: string
  id: string
  name: string
  product: string
  date: string
  ipfsHash: string
}

const dummyTrace: TraceEntry[] = [
  {
    role: "Retailer",
    id: "RTL99887",
    name: "Fashion Hub",
    product: "Cotton Shirt",
    date: "2025-07-10",
    ipfsHash: "QmRetailerIPFSHash123",
  },
  {
    role: "Wholesaler",
    id: "WHL56789",
    name: "BulkMart India Pvt. Ltd.",
    product: "Cotton Shirt",
    date: "2025-07-09",
    ipfsHash: "QmWholesalerHash123",
  },
  {
    role: "Manufacturer",
    id: "MFG78901",
    name: "WeaveCraft Pvt Ltd",
    product: "Processed Cotton",
    date: "2025-07-08",
    ipfsHash: "QmManufacturerHashXYZ",
  },
  {
    role: "Producer",
    id: "PRD12345",
    name: "GreenCotton Farms",
    product: "Raw Cotton",
    date: "2025-07-07",
    ipfsHash: "QmProducerRawHashABC",
  },
]

export default function CustomerPage() {
  const [ipfsInput, setIpfsInput] = useState("")
  const [trace, setTrace] = useState<TraceEntry[] | null>(null)

  const handleVerify = () => {
    // Simulate fetch + trace (would actually use smart contract + IPFS)
    if (ipfsInput) {
      setTrace(dummyTrace)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-100 px-4 py-10">
  <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-3xl border border-slate-200">
    <h1 className="text-4xl font-bold text-teal-700 mb-8 text-center">
      Product Authenticity Checker
    </h1>

    <div className="flex gap-3 items-center mb-6">
      <Input
        placeholder="Enter IPFS hash from QR code"
        value={ipfsInput}
        onChange={(e) => setIpfsInput(e.target.value)}
        className="flex-1 border border-slate-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-300"
      />
      <Button
        onClick={handleVerify}
        className="bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition"
      >
        Verify
      </Button>
    </div>

    {trace && (
      <div className="space-y-6 mt-8">
        <h2 className="text-2xl font-semibold text-slate-700">
          Traceability Chain:
        </h2>

        {trace.map((entry, index) => (
          <div
            key={index}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm transition-transform hover:scale-[1.01]"
          >
            <p className="text-slate-700"><span className="font-semibold text-teal-600">Role:</span> {entry.role}</p>
            <p className="text-slate-700"><span className="font-semibold text-teal-600">ID:</span> {entry.id}</p>
            <p className="text-slate-700"><span className="font-semibold text-teal-600">Name:</span> {entry.name}</p>
            <p className="text-slate-700"><span className="font-semibold text-teal-600">Product:</span> {entry.product}</p>
            <p className="text-slate-700"><span className="font-semibold text-teal-600">Date:</span> {entry.date}</p>
            <p className="text-slate-700">
              <span className="font-semibold text-teal-600">IPFS:</span>{" "}
              <a
                href={`https://ipfs.io/ipfs/${entry.ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition"
              >
                {entry.ipfsHash}
              </a>
            </p>
          </div>
        ))}

        <div className="bg-green-100 text-green-800 border border-green-300 rounded-xl p-4 text-center text-lg font-semibold shadow-sm">
          ✅ Product is Authentic and Fully Traceable!
        </div>
      </div>
    )}
  </div>
</div>

  )
}
