import CreateProjectButton from "@/components/ui/buttons/CreateProjectButton";
import ProjectDetailsCard from "@/features/projects/components/ProjectDetailsCard";
import { requireUserId } from "@/lib/auth";
import { getProjects } from "@/lib/projects";
import PortalPageHeader from "@/components/layout/PortalPageHeader";
import { getUsernameById } from "@/features/auth/actions/users";

export default async function AppPortal() {
    const userId = await requireUserId();
    const projects = await getProjects(userId);
    const userName = await getUsernameById(userId);
    const possessiveName = userName?.endsWith("s") ? `${userName}` + "'" : `${userName}` + "'s";


    return projects.length > 0 ? (
        <div className="w-full gap-y-6 md:gap-y-10">
            <PortalPageHeader title={
                <>
                    <strong>{possessiveName}</strong> Projects
                </>
            }>
                <CreateProjectButton />
            </PortalPageHeader>


            <section className="w-full py-0 px-0 pb-(--section-py) gap-y-12">
                <div className="bo-container gap-y-12">
                    <div className="gap-y-8 px-(--section-px)">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {projects.map((project) => (
                                <ProjectDetailsCard project_id={project.id} pname={project.name} key={project.id} />
                            ))}
                        </div>

                    </div>

                </div>
            </section >

        </div >

    ) : (
        <section className="w-full items-center justify-center py-6">
            <div className="items-center gap-y-3">
                <p className="text-2xl">You have not created any projects yet.</p>
                <CreateProjectButton />
            </div>
        </section>
    );
}
