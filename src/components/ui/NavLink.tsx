import Link from "next/link";
import { ReactNode } from "react";


export default function NavLink({ href, icon, title }: { href: string, icon?: ReactNode, title: string }) {
    return <Link href={href} className={` leading-none ${icon ? "flex flex-row gap-3 items-center" : ""} `}>
        {icon && <span className="dropdown-icon items-center [&_svg]:w-[22px]" >
            {icon}
        </span>}
        <span>{title}</span>
    </Link >

}