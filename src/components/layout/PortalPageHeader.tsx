import { ReactNode } from "react";


export default function PortalPageHeader({ children, className, title = "Menu Header" }: { children?: ReactNode, className?: string, title: ReactNode }) {

    return <section className={`w-full py-0 px-0 gap-y-12 bg-(--color-white) ${className ?? ""}`}>
        {/*Header Container*/}
        <div className="bo-container sm:flex-row gap-x-10 gap-y-3 sm:items-center px-(--section-px) pt-24 pb-12 sm:pb-8">
            <h1 className="text-(length:--heading-xl) font-[300] capitalize">{title}</h1>
            {children}
        </div>

    </section>
}