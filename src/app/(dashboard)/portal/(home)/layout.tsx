import type { ReactNode } from "react";
import PortalHeader from "@/components/layout/PortalHeader";
import SideBar from "@/components/layout/Sidebar";
import { getUsernameById, logoutAction, getUserById } from "@/features/auth/actions/users";
import { auth } from "@/lib/auth";
import NavLink from "@/components/ui/NavLink";
import UserDropdown from "@/components/ui/UserDropdown";
import { SidebarProvider } from "@/context/SidebarContext";
import ProfileIcon from "@/assets/user-square.svg";
import LogoutIcon from "@/assets/sign-out.svg";
import MobileMenuButton from "@/components/ui/buttons/MobileMenuButton";
import DemoCountdown from "@/features/auth/components/DemoCountdown";

export default async function PortalLayout({ children }: { children: ReactNode }) {

    const session = await auth();
    const userId = Number(session?.user?.id);
    // const userName = await getUsernameById(userId);
    const userInfo = await getUserById(userId);


    return (
        <SidebarProvider>
            <PortalHeader>
                <div className="flex-row items-center gap-1">
                    <MobileMenuButton />
                    <UserDropdown userName={userInfo.username}>
                        <NavLink href="/portal/profile" title="My Profile" icon={<ProfileIcon />} />
                        <form action={logoutAction}>
                            <button type="submit" className="w-full text-start flex-row inline-flex items-center gap-3"><LogoutIcon className="w-[22px]" />Logout</button>
                        </form>
                    </UserDropdown>
                </div>
            </PortalHeader>

            <main className="flex flex-row">
                <SideBar />
                {children}
            </main>

            {userInfo.is_demo && userInfo.demo_expires_at && (
                <div className="lg:fixed lg:bottom-0 lg:right-0 bg-transparent w-full items-end px-(--section-px) py-5">
                    <DemoCountdown expiresAt={userInfo.demo_expires_at.toISOString()} />
                </div>
            )}

        </SidebarProvider>

    );
}
