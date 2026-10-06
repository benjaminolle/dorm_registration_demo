"use client";

export default function Error({
    reset,
}: {
    reset: () => void;
}) {
    return (
        <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
            <h2 className="text-(length:--heading-md)">Unable to load project details</h2>
            <p>Check your connection and try again.</p>

            <button onClick={reset} className="primary-btn btn">
                Try again
            </button>
        </section>
    );
}