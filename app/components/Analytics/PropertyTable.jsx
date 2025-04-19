"use client"

import { useEffect, useState } from "react"

export default function PropertyTable() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleReSyncGA4Data = async () => {
        setLoading(true)

        fetch("/api/ga4/properties")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch GA4 properties")
                }

                return res.json()
            })
            .then((json) => setData(json))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    if (error) {
        return (
            <div className="p-4 text-error">Error: {error}</div>
        )
    }

    return (
        <div className="grid gap-4">
            <span className="flex flex-col">
                <div className="mb-10">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">GA4 Properties</h1>
                        <p className="text-xs">Click the button below to fetch your GA4 properties linked to your Google account.</p>
                        <p className="text-xs">Add them to your Tracked Properties for each property by clicking the "Add" button.</p>
                    </div>
                </div>
                <button onClick={() => handleReSyncGA4Data()} className="btn btn-neutral">Fetch your linked GA4 properties</button>
            </span>

            {loading ? (
                <div className="p-4 flex items-center gap-4">
                    <p>Fetching your GA4 properties...</p>
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            ) : null}

            {data && data.map((item) => (
                <div
                    key={`${item.propertyId}-${item.streamId}`}
                    className="card bg-base-100 shadow-md p-4"
                >
                    <h2 className="text-lg font-semibold">
                        {item.propertyName} <span className="text-sm text-neutral">({item.propertyId})</span>
                    </h2>
                    <p>
                        <strong>Stream:</strong> {item.streamName}{" "}
                        <span className="text-sm text-neutral">({item.streamId})</span>
                    </p>
                    <p>
                        <strong>Measurement ID:</strong> {item.measurementId}
                    </p>
                    <p>
                        <strong>URL:</strong>{" "}
                        <a
                            href={item.defaultUri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                        >
                            {item.defaultUri}
                        </a>
                    </p>
                    <p className="text-xs text-neutral mt-2">
                        Created: {new Date(item.createTime).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    )
}