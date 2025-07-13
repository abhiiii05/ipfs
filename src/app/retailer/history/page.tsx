"use client"

import Link from "next/link"

const dummyRetailerHistory = [
  {
    retailerId: "RTL99887",
    storeName: "Fashion Hub",
    productReceived: "Cotton Shirt",
    wholesalerId: "WHL56789",
    quantityReceived: "120",
    receivedDate: "2025-07-10",
    batchId: "BATCH-RTL-01",
    ipfsHash: "QmRetailerIPFSHash123",
    timestamp: "2025-07-10T17:15:00Z",
  },
  {
    retailerId: "RTL33445",
    storeName: "Daily Fresh",
    productReceived: "Flavored Yogurt",
    wholesalerId: "WHL89100",
    quantityReceived: "90",
    receivedDate: "2025-07-09",
    batchId: "BATCH-RTL-02",
    ipfsHash: "QmRetailerIPFSHash456",
    timestamp: "2025-07-09T14:05:00Z",
  },
]

export default function RetailerHistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-100 px-4 py-10">
  <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-3xl border border-slate-200">
    <h1 className="text-4xl font-bold text-teal-700 mb-8 text-center">
      Retailer Transaction History
    </h1>

    {dummyRetailerHistory.map((entry, index) => (
      <div
        key={index}
        className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm transition-transform hover:scale-[1.01]"
      >
        <div className="space-y-1 text-slate-800 text-[15px] leading-relaxed">
          <p>
            <span className="font-semibold text-teal-600">Retailer ID:</span> {entry.retailerId}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Store Name:</span> {entry.storeName}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Product:</span> {entry.productReceived}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Wholesaler ID:</span> {entry.wholesalerId}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Quantity Received:</span> {entry.quantityReceived}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Received Date:</span> {entry.receivedDate}
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

    <Link href="/retailer">
      <span className="text-teal-700 hover:text-teal-900 font-medium underline mt-6 inline-block transition">
        ← Back to Retailer Dashboard
      </span>
    </Link>
  </div>
</div>

  )
}
