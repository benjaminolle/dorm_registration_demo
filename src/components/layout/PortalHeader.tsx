import { ReactNode } from "react";
import Link from "next/link";
import PrimaryLogo from "@/assets/full-logo.svg";

export default function PortalHeader({ children }: { children: ReactNode }) {
    return <header className="sticky top-0 z-999 md:relative">
        <section className="bg-(--color-primary) py-4 md:px-(--topbar-px) ">
            <div className="justify-between wrap text-(length:--text-base) flex-row gap-x-3 items-center text-(--color-offwhite)">
                <Link href="/">
                    <PrimaryLogo className="w-32" alt="Dorm Registration Portal Logo" />
                </Link>

                {children}
            </div>
        </section>
    </header>
}