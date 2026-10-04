import type { ReactNode } from "react";
import Link from "next/link";


export default async function AuthLayout({ children }: { children: ReactNode }) {

  return (
    <>
      <main>
        <section className="grow justify-center pb-[10rem]">
          <div className="bo-container items-center gap-y-[1.25rem]">
            {children}
            <Link className="absolute -bottom-40 btn secondary-btn w-full max-w-[150px] text-center" href="/">Home</Link>
          </div>
        </section>
      </main>
    </>
  );
}
