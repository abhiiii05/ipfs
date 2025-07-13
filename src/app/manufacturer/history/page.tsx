"use client"

import Link from "next/link"

const dummyManufacturingHistory = [
  {
    manufacturerId: "MFG78901",
    companyName: "FabTech Industries",
    productName: "Cotton Shirt",
    rawMaterialUsed: "Organic Cotton",
    quantityUsed: "50",
    productionDate: "2025-07-08",
    batchId: "MFG-BATCH-01",
    ipfsHash: "QmManufacturerHashXYZ",
    timestamp: "2025-07-08T11:20:00Z",
  },
  {
    manufacturerId: "MFG32199",
    companyName: "MilkCraft Co.",
    productName: "Flavored Yogurt",
    rawMaterialUsed: "Milk",
    quantityUsed: "30",
    productionDate: "2025-07-07",
    batchId: "MFG-MILK-02",
    ipfsHash: "QmManufacturerHashMilk",
    timestamp: "2025-07-07T09:10:00Z",
  },
]

export default function ManufacturerHistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-100 px-4 py-10">
  <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-3xl border border-slate-200">
    <h1 className="text-4xl font-bold text-teal-700 mb-8 text-center">
      Manufacturing History
    </h1>

    {dummyManufacturingHistory.map((entry, index) => (
      <div
        key={index}
        className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm transition-transform hover:scale-[1.01]"
      >
        <div className="space-y-1 text-slate-800 text-[15px] leading-relaxed">
          <p>
            <span className="font-semibold text-teal-600">Manufacturer ID:</span> {entry.manufacturerId}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Company Name:</span> {entry.companyName}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Product Name:</span> {entry.productName}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Raw Material Used:</span> {entry.rawMaterialUsed}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Quantity Used:</span> {entry.quantityUsed} kg
          </p>
          <p>
            <span className="font-semibold text-teal-600">Production Date:</span> {entry.productionDate}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Batch ID:</span> {entry.batchId}
          </p>
          <p>
            <span className="font-semibold text-teal-600">IPFS Hash:</span>{" "}
            <a
              href={`https://ipfs.io/ipfs/${entry.ipfsHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 transition"
            >
              {entry.ipfsHash}
            </a>
          </p>
          <p>
            <span className="font-semibold text-teal-600">Timestamp:</span>{" "}
            {new Date(entry.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    ))}

    <Link href="/manufacturer">
      <span className="text-teal-700 hover:text-teal-900 font-medium underline mt-6 inline-block transition">
        ← Back to Manufacturer Dashboard
      </span>
    </Link>
  </div>
</div>
  )
}
