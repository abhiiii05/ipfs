"use client"

import Link from "next/link"

const dummyProducerHistory = [
  {
    producerId: "PRD12345",
    fullName: "Ramesh Patel",
    materialType: "Cotton",
    quantity: "100",
    location: "Rajkot, Gujarat",
    extractDate: "2025-07-10",
    batchId: "BATCH-X001",
    ipfsHash: "QmDummyHashProducer1",
    timestamp: "2025-07-10T12:00:00Z",
  },
  {
    producerId: "PRD67890",
    fullName: "Sunita Sharma",
    materialType: "Milk",
    quantity: "50",
    location: "Surat, Gujarat",
    extractDate: "2025-07-09",
    batchId: "BATCH-M002",
    ipfsHash: "QmDummyHashProducer2",
    timestamp: "2025-07-09T10:30:00Z",
  },
]

export default function ProducerHistoryPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Submission History (Producer)</h1>

      {dummyProducerHistory.map((entry, index) => (
        <div key={index} className="border border-gray-300 rounded-md p-4 mb-4">
          <p><strong>Producer ID:</strong> {entry.producerId}</p>
          <p><strong>Name:</strong> {entry.fullName}</p>
          <p><strong>Material:</strong> {entry.materialType}</p>
          <p><strong>Quantity:</strong> {entry.quantity} kg</p>
          <p><strong>Location:</strong> {entry.location}</p>
          <p><strong>Harvest/Extract Date:</strong> {entry.extractDate}</p>
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

      <Link href="/producer">
        <span className="text-blue-600 underline mt-6 inline-block">← Back to Producer Dashboard</span>
      </Link>
    </div>
  )
}
