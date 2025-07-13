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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-100 px-4 py-10">
  <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-3xl border border-slate-200">
    <h1 className="text-4xl font-bold text-teal-700 mb-8 text-center">
      Submission History (Producer)
    </h1>

    {dummyProducerHistory.map((entry, index) => (
      <div
        key={index}
        className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm transition-transform hover:scale-[1.01]"
      >
        <div className="space-y-1 text-slate-800 text-[15px] leading-relaxed">
          <p>
            <span className="font-semibold text-teal-600">Producer ID:</span> {entry.producerId}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Name:</span> {entry.fullName}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Material:</span> {entry.materialType}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Quantity:</span> {entry.quantity} kg
          </p>
          <p>
            <span className="font-semibold text-teal-600">Location:</span> {entry.location}
          </p>
          <p>
            <span className="font-semibold text-teal-600">Harvest/Extract Date:</span> {entry.extractDate}
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

    <Link href="/producer">
      <span className="text-teal-700 hover:text-teal-900 font-medium underline mt-6 inline-block transition">
        ← Back to Producer Dashboard
      </span>
    </Link>
  </div>
</div>

  )
}
