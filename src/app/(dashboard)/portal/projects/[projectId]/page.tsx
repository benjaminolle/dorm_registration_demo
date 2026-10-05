import CreateDormButton from "@/components/ui/buttons/CreateDormButton";
import RegisterStudentButton from "@/components/ui/buttons/RegisterStudentButton";
import DormsCard from "@/features/projects/components/DormDetailsCard";
import StudentsCard from "@/features/projects/components/StudentsDetailsCard";
import SuccessTicker from "@/components/SuccessTicker";
import { getDormsByProject, getDormsForEdit } from "@/lib/dorms";
import { getRecentStudents } from "@/lib/students";
import DormSettingsButton from "@/components/ui/buttons/DormSettingsButton";

export const metadata = {
    title: "Project Details",
};

export default async function ProjectDetails({
    params,
    searchParams,
}: {
    params: Promise<{ projectId: string }>;
    searchParams: Promise<{ created?: string }>;
}) {
    const { projectId: projectIdRaw } = await params;
    const { created } = await searchParams;
    const projectId = Number(projectIdRaw);


    const dorms = await getDormsByProject(projectId);
    const dormsEdit = await getDormsForEdit(Number(projectId));
    const students = await getRecentStudents(projectId, 6);

    return (
        <>
            <section className="pt-20 pb-15 gap-y-20">
                <div className="bo-container gap-y-5">
                    <div className="max-md: gap-y-4 md:flex-row gap-x-7 justify-between md:items-end">
                        <h2 className="text-(length:--heading-md) text-(--color-primary)">Recently Assigned Students</h2>
                        <RegisterStudentButton href={`/portal/projects/${projectId}/register`} />
                    </div>

                    {/*Students to be displayed - Query students per project for specific user and displays their assigned dorms */}
                    {students.length > 0 ?
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {students.map((student) => (
                                <StudentsCard key={student.id} sName={student.full_name} sAdminNo={student.admission_no} sDorm={student.dorm_name ?? "Unassigned"} />
                            ))}
                        </div> : <p className="text-red-500">No students assigned yet</p>}
                </div>

                <div className="bo-container gap-y-5">
                    {created === "dorm" && <SuccessTicker message="Dorm created successfully." />}
                    <div className="max-md:gap-y-4 md:flex-row gap-x-7 justify-between md:items-end">
                        <h2 className="text-(length:--heading-md) text-(--color-primary)">Dorms</h2>
                        <div className="flex-row flex-wrap gap-3">
                            {dorms.length > 0 && <DormSettingsButton projectId={Number(projectId)} dorms={dormsEdit.map((dorm) => ({ ...dorm, assignment_order: dorm.assignment_order ?? 0 }))} />}
                            <CreateDormButton projectId={projectId} />
                        </div>
                    </div>

                    {/*Dorms to be displayed - Query dorms per project for specific user */}
                    {dorms.length > 0 ?
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {dorms.map((dorm) => (
                                <DormsCard key={dorm.name} dname={dorm.name} dvacancy={Number(dorm.vacancy ?? 0)} dcapacity={Number(dorm.capacity)} />
                            ))}
                        </div> : <p className="text-red-500">No dorms created yet</p>}
                </div>

            </section>
        </>
    );
}

