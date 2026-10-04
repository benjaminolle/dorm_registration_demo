"use client";

import { useEffect, useState } from "react";

export default function SuccessTicker({ message }: { message: string }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = window.setTimeout(() => setVisible(false), 4000);

        return () => window.clearTimeout(timeout);
    }, []);

    if (!visible) return null;

    return (
        <div className="mb-4 flex-row items-center justify-between gap-4 border border-green-600 bg-green-50 px-4 py-3 text-green-800"
            role="status">
            <span>{message}</span>
            <button type="button" onClick={() => setVisible(false)} aria-label="Dismiss notification">x</button>
        </div>
    );
}