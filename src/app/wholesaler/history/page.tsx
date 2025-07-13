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
   <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-100 px-4 py-10">
  <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-3xl border border-slate-200">
    <h1 className="text-4xl font-bold text-teal-700 mb-8 text-center">
      Wholesaler Transaction History
    </h1>

    {dummyWholesalerHistory.map((entry, index) => (
      <div
        key={index}
        className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm transition-transform hover:scale-[1.01]"
      >
        <div className="space-y-1 text-slate-800">
          <p><span className="font-semibold text-teal-600">Wholesaler ID:</span> {entry.wholesalerId}</p>
          <p><span className="font-semibold text-teal-600">Company:</span> {entry.companyName}</p>
          <p><span className="font-semibold text-teal-600">Product:</span> {entry.productReceived}</p>
          <p><span className="font-semibold text-teal-600">Manufacturer ID:</span> {entry.manufacturerId}</p>
          <p><span className="font-semibold text-teal-600">Quantity Received:</span> {entry.quantityReceived}</p>
          <p><span className="font-semibold text-teal-600">Received Date:</span> {entry.receivedDate}</p>
          <p><span className="font-semibold text-teal-600">Batch ID:</span> {entry.batchId}</p>
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
          <p><span className="font-semibold text-teal-600">Timestamp:</span> {new Date(entry.timestamp).toLocaleString()}</p>
        </div>
      </div>
    ))}

    <Link href="/wholesaler">
      <span className="text-teal-700 hover:text-teal-900 font-medium underline mt-6 inline-block transition">
        ← Back to Wholesaler Dashboard
      </span>
    </Link>
  </div>
</div>

  )
}
