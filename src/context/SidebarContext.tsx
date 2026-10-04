"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SidebarContextType = {
    isExpanded: boolean;       // desktop collapse/expand
    toggleExpanded: () => void;
    isMobileOpen: boolean;     // mobile show/hide
    toggleMobile: () => void;
    closeMobile: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <SidebarContext.Provider
            value={{
                isExpanded,
                toggleExpanded: () => setIsExpanded((v) => !v),
                isMobileOpen,
                toggleMobile: () => setIsMobileOpen((v) => !v),
                closeMobile: () => setIsMobileOpen(false),
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
    return context;
}