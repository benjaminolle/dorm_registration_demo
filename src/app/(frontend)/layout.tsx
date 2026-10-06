
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/auth";

export default async function FrontendLayout({ children }: { children: ReactNode }) {

  const userId = await getUserId();
  if (userId !== null) redirect("/portal");

  return (
    <>
      <main>{children}</main>s
    </>
  );
}
