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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Retailer Transaction History</h1>

      {dummyRetailerHistory.map((entry, index) => (
        <div key={index} className="border border-gray-300 rounded-md p-4 mb-4">
          <p><strong>Retailer ID:</strong> {entry.retailerId}</p>
          <p><strong>Store Name:</strong> {entry.storeName}</p>
          <p><strong>Product:</strong> {entry.productReceived}</p>
          <p><strong>Wholesaler ID:</strong> {entry.wholesalerId}</p>
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

      <Link href="/retailer">
        <span className="text-blue-600 underline mt-6 inline-block">← Back to Retailer Dashboard</span>
      </Link>
    </div>
  )
}
