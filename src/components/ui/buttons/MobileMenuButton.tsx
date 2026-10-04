"use client";
import { useSidebar } from "@/context/SidebarContext";
import MenuIcon from "@/assets/menu-4.svg";

export default function MobileMenuButton() {
    const { toggleMobile, isMobileOpen } = useSidebar();
    return (
        <button onClick={toggleMobile} className="hover:bg-(--nav-hover-bg)/20 p-1 rounded-lg lg:hidden" aria-label="Toggle menu">
            <MenuIcon className={`w-[18px] menu-icon ${isMobileOpen ? "is-open" : ""}`} />
        </button>
    );
}