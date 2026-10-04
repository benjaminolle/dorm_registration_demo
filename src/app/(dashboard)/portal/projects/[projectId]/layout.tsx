import type { ReactNode } from "react";
import ProjectHeader from "@/features/projects/components/ProjectHeader";
import Footer from "@/components/layout/PortalFooter";
import { getProjectById } from "@/lib/projects";
import { getUserId } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function ProjectsDashboardLayout({ children, params }: { children: ReactNode; params: Promise<{ projectId: string }>; }) {

  const { projectId } = await params;
  const userId = await getUserId();

  const project = await getProjectById(Number(projectId), userId!);
  if (!project) notFound();

  return (
    <>
      <ProjectHeader title={project.name} projectId={projectId} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
