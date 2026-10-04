"use client";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <section className="w-full flex min-h-[70vh] flex-col items-center justify-center gap-4">
            <h1 className="text-(length:--heading-md)">Unable to load</h1>
            <p>Check your connection and try again.</p>

            <button onClick={reset} className="primary-btn btn">
                Try again
            </button>
        </section>
    );
}