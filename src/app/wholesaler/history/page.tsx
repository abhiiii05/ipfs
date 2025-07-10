"use client"

import Link from "next/link"

const dummyWholesalerHistory = [
  {
    wholesalerId: "WHL56789",
    companyName: "BulkMart India Pvt. Ltd.",
    productReceived: "Cotton Shirt",
    manufacturerId: "MFG78901",
    quantityReceived: "200",
    receivedDate: "2025-07-09",
    batchId: "MFG-BATCH-01",
    ipfsHash: "QmWholesalerHash123",
    timestamp: "2025-07-09T15:30:00Z",
  },
  {
    wholesalerId: "WHL89100",
    companyName: "DairyWholesales LLP",
    productReceived: "Flavored Yogurt",
    manufacturerId: "MFG32199",
    quantityReceived: "150",
    receivedDate: "2025-07-08",
    batchId: "MFG-MILK-02",
    ipfsHash: "QmWholesalerHashMilk",
    timestamp: "2025-07-08T13:10:00Z",
  },
]

export default function WholesalerHistoryPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Wholesaler Transaction History</h1>

      {dummyWholesalerHistory.map((entry, index) => (
        <div key={index} className="border border-gray-300 rounded-md p-4 mb-4">
          <p><strong>Wholesaler ID:</strong> {entry.wholesalerId}</p>
          <p><strong>Company:</strong> {entry.companyName}</p>
          <p><strong>Product:</strong> {entry.productReceived}</p>
          <p><strong>Manufacturer ID:</strong> {entry.manufacturerId}</p>
          <p><strong>Quantity Received:</strong> {entry.quantityReceived}</p>
          <p><strong>Received Date:</strong> {entry.receivedDate}</p>
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

      <Link href="/wholesaler">
        <span className="text-blue-600 underline mt-6 inline-block">← Back to Wholesaler Dashboard</span>
      </Link>
    </div>
  )
}
