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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Product Authenticity Checker</h1>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter IPFS hash from QR code"
          value={ipfsInput}
          onChange={(e) => setIpfsInput(e.target.value)}
        />
        <Button onClick={handleVerify}>Verify</Button>
      </div>

      {trace && (
        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Traceability Chain:</h2>
          {trace.map((entry, index) => (
            <div key={index} className="border rounded p-4">
              <p><strong>Role:</strong> {entry.role}</p>
              <p><strong>ID:</strong> {entry.id}</p>
              <p><strong>Name:</strong> {entry.name}</p>
              <p><strong>Product:</strong> {entry.product}</p>
              <p><strong>Date:</strong> {entry.date}</p>
              <p>
                <strong>IPFS:</strong>{" "}
                <a
                  href={`https://ipfs.io/ipfs/${entry.ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {entry.ipfsHash}
                </a>
              </p>
            </div>
          ))}

          <div className="bg-green-100 text-green-800 border border-green-300 rounded p-4 text-center mt-6">
            ✅ Product is Authentic and Fully Traceable!
          </div>
        </div>
      )}
    </div>
  )
}
