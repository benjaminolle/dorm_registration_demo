"use client";

import SidebarLeftIcon from "@/assets/sidebar-left.svg";
import SidebarRightIcon from "@/assets/sidebar-right.svg";
import DashboardIcon from "@/assets/dashboard.svg";
import DownloadIcon from "@/assets/download-square.svg";
import { useSidebar } from "@/context/SidebarContext";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const navigation = [
    {
        title: "Dashboard",
        icon: DashboardIcon,
        url: "/portal",
    },
    {
        title: "Profile",
        icon: DownloadIcon,
        url: "/portal/profile",
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { isExpanded, toggleExpanded, isMobileOpen, closeMobile } = useSidebar();

    return (
        <>
            {/* Mobile backdrop*/}
            <div
                onClick={closeMobile}
                className={`fixed inset-0 bg-black/40 z-90 transition-all duration-700 ease-in-out pointer-events-none ${isMobileOpen ? "opacity-100" : "opacity-0"} lg:hidden`}
            />

            <aside
                className={`fixed max-lg:h-full lg:grow text-(length:--text-base) top-0 max-lg:pt-25 leading-[0] left-0 lg:relative lg:inset-auto side-nav bg-white py-5 border-r border-gray-300 shadow z-100 transition-all duration-700 ease-in-out gap-y-9 max-lg:w-full max-lg:max-w-(--mobile-menu-width) flex flex-col ${isExpanded ? "lg:w-[180px]" : "lg:w-(--sidebar-width)"} ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <div className="border-b border-gray-300 font-[600] text-(length:--text-xs) pb-4 px-(--side-nav-px) max-lg:hidden overflow-hidden">
                    <button
                        onClick={toggleExpanded}
                        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                        className={`flex flex-row items-center gap-x-2 w-fit ${isExpanded ? "" : "self-center"}`}
                    >
                        {isExpanded ? <>
                            <SidebarLeftIcon aria-hidden="true" className="sidebar-icon" />
                            <span>Collapse</span>
                        </> : <SidebarRightIcon aria-hidden="true" className="sidebar-icon" />

                        }


                    </button>
                </div>

                <nav className="overflow-hidden">
                    <ul className={`flex flex-col gap-y-2 px-(--side-nav-px) ${isExpanded ? "" : "lg:items-center"}`}>
                        {navigation.map((nav) => {
                            const isActive = pathname === nav.url;
                            const Icon = nav.icon;
                            return (
                                <li key={nav.title} className="w-full items-center">
                                    <Link
                                        href={nav.url}
                                        onClick={closeMobile}
                                        title={!isExpanded ? nav.title : undefined}
                                        className={`flex items-center rounded-lg py-2 gap-2 justify-start px-(--side-navlink-px) ${isExpanded ? "" : "lg:px-2 lg:justify-center lg:gap-0"
                                            } ${isActive ? "bg-(--nav-active-bg)" : "hover:bg-(--nav-hover-bg)"}`}
                                    >
                                        <div className="items-center">
                                            <Icon className="text-gray-500 hover:text-(--color-primary) w-[20px]" aria-hidden="true" />
                                        </div>
                                        <span
                                            className={`transition-[width] duration-300 ease-in-out ${isExpanded ? "" : "lg:opacity-0 lg:w-0"
                                                }`}
                                        >
                                            {isActive ? <strong>{nav.title}</strong> : nav.title}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}