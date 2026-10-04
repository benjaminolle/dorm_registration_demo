"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import ArrowDownIcon from "@/assets/arrow-down.svg";

export default function UserDropdown({ children, userName }: { children?: ReactNode, userName: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const initials = userName
        ? userName
            .split(" ")
            .map((part: string) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() : "U";



    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-row gap-x-2 items-center cursor-pointer transition-all duration-300 hover:bg-(--nav-active-bg)/20 py-1 px-2 rounded-sm"
            >
                <div
                    aria-hidden="true"
                    className="flex size-7 items-center justify-center rounded-full bg-(--color-offwhite) text-sm font-semibold text-(--color-primary)"
                >
                    {initials}
                </div>
                <span className="text-xl hidden lg:block">
                    <ArrowDownIcon className="w-[16px]" />
                </span>
            </div>
            {isOpen && <div

                className={`bg-(--color-white) text-(--color-ink2) text-(length:--fs-sm) shadow absolute top-10 right-0 p-4 min-w-[240px] rounded-sm [&>*]:p-3 [&>*]:rounded-lg [&>*]:font-[600] [&>*]:hover:bg-(--nav-hover-bg) transition-all duration-200 ease-out `}
            >
                {children}
            </div>}

        </div>
    );
}