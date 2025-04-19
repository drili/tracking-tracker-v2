"use client"

import { useEffect, useState } from "react"

export default function PropertyTable() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
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
    }, [])

    if (loading) {
        return (
            <div className="p-4 flex items-center gap-4">
                <p>Fetching your GA4 properties...</p>
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-4 text-error">Error: {error}</div>
        )
    }

    return (
        <div className="grid gap-4">
            {data.map((item) => (
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