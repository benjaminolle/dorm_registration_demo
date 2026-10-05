"use client";

import { useState, useEffect } from "react";

function getTimeLeft(expiresAt: string): string {
    const diff = new Date(expiresAt).getTime() - Date.now();

    if (diff <= 0) return "deletion imminent";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
}

export default function DemoCountdown({ expiresAt }: { expiresAt: string }) {
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(expiresAt));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(expiresAt));
        }, 1000);
        return () => clearInterval(interval);
    }, [expiresAt]);

    return (
        <p className="text-(length:--text-sm)">
            <strong>Demo account</strong> — data scheduled for deletion in{" "}
            <strong className="text-red-500">{timeLeft}</strong>
        </p>
    );
}