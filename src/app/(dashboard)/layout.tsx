import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/auth";

export default async function AppDashboardLayout({ children }: { children: ReactNode }) {

  const userId = await getUserId();
  if (userId === null) redirect("/login");

  return <>{children}</>;

}
