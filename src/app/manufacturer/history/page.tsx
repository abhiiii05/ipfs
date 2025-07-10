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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manufacturing History</h1>

      {dummyManufacturingHistory.map((entry, index) => (
        <div key={index} className="border border-gray-300 rounded-md p-4 mb-4">
          <p><strong>Manufacturer ID:</strong> {entry.manufacturerId}</p>
          <p><strong>Company Name:</strong> {entry.companyName}</p>
          <p><strong>Product Name:</strong> {entry.productName}</p>
          <p><strong>Raw Material Used:</strong> {entry.rawMaterialUsed}</p>
          <p><strong>Quantity Used:</strong> {entry.quantityUsed} kg</p>
          <p><strong>Production Date:</strong> {entry.productionDate}</p>
          <p><strong>Batch ID:</strong> {entry.batchId}</p>
          <p>
            <strong>IPFS Hash:</strong>{" "}
            <a
              href={`https://ipfs.io/ipfs/${entry.ipfsHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {entry.ipfsHash}
            </a>
          </p>
          <p><strong>Timestamp:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
        </div>
      ))}

      <Link href="/manufacturer">
        <span className="text-blue-600 underline mt-6 inline-block">← Back to Manufacturer Dashboard</span>
      </Link>
    </div>
  )
}
