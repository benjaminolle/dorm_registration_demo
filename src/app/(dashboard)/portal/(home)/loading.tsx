export default function Loading() {
    return (

        <section className="w-full py-10 items-center justify-center " aria-label="Loading">
            <div className="gap-y-10">
                <div className="size-10 animate-spin rounded-full border-4 border-gray-300 border-t-(--color-primary)"
                    role="status"
                    aria-label="Loading"
                />

            </div>
        </section >
    );
}