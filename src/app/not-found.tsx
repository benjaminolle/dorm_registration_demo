import Link from "next/link";

export default function NotFound() {
    return (
        <main>
            <section className="grow justify-center">
                <div className="bo-container justify-center items-center mx-auto">
                    <div className="max-w-150 text-center items-center flex-col gap-y-[1.5rem]">
                        <h1>Oops! Page not Found</h1>

                        <p className="text-(length:--text-sm)">The resource or page your are looking for might have been moved recently or does not exist.</p>
                        <Link href="/" className="btn primary-btn">Return to Homepage</Link>
                    </div>
                </div>
            </section >
        </main>

    )
}