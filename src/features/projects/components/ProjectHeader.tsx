"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EditProjectHeading from "@/features/projects/components/EditProjectHeading";

export default function ProjectHeader({ title = "Title", projectId }: { title: string, projectId: string }) {
    const pathname = usePathname();
    const projPath = "/portal/projects/";

    const detailsPath = `${projPath}${projectId}`;
    const registerPath = `${projPath}${projectId}/register`;
    const viewStudentsPath = `${projPath}${projectId}/view`;

    const projectIdNumber = Number(projectId);

    return (
        <header>
            <section className="bg-(--color-primary) py-10">
                <div className="bo-container text-(--color-offwhite) gap-y-8 items-start">
                    <Link href="/portal" className=" hover:underline opacity-75 mb-10"> ← Go to Dashboard</Link>
                    <EditProjectHeading initialName={title} projectId={projectIdNumber} />

                    <div className="bo-block gap-2 lg:gap-8 lg:flex-row lg:items-center justify-between">
                        <Link className={` hover:underline w-fit ${pathname === detailsPath ? " font-bold underline" : ""}`} href={detailsPath}>View Project Details</Link>

                        <div className="lg:flex-row gap-2 lg:gap-8 lg:items-center">
                            <Link className={`hover:underline ${pathname === registerPath ? "font-bold underline" : ""}`} href={registerPath}>Register Students</Link>
                            <Link className={`hover:underline ${pathname === viewStudentsPath ? "font-bold underline" : ""}`} href={viewStudentsPath}>View Registered Students</Link>
                        </div>
                    </div>
                </div>
            </section>
        </header >
    );
}