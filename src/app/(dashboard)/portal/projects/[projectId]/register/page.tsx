import NewStudentForm from "@/features/projects/components/RegisterStudentForm";
import { getRecentStudents } from "@/lib/students";
import StudentsCard from "@/features/projects/components/StudentsDetailsCard";
import { getProjectVacancy } from "@/lib/dorms";


export const metadata = {
    title: "Register Students",
};


export default async function RegisterStudents(
    { params,

    }: {
        params: Promise<{ projectId: string }>;

    }) {

    const { projectId: projectIdRaw } = await params;
    const projectId = Number(projectIdRaw);
    const students = await getRecentStudents(projectId);
    const vacancy = (await getProjectVacancy(projectId)) ?? {
        total_capacity: 0,
        total_occupied: 0,
        total_vacancy: 0,
    };
    const totalVacancy = Number(vacancy.total_vacancy ?? 0);

    return (
        <section className="py-15">
            <div className="bo-container grid lg:grid-cols-[2fr_1fr] xl:grid-cols-[2.6fr_1fr] gap-[7rem]">
                <div className="w-full gap-y-7">
                    {totalVacancy > 0 ?
                        <p className="text-(length:--text-md) px-5 py-2 bg-green-100">Dorm Vacancy Available: <strong>{totalVacancy}</strong>
                        </p> : ""}

                    <h2 className="text-(length:--heading-md) text-(--color-primary)">Register New Student</h2>

                    {totalVacancy > 0 ?
                        <div className="gap-y-7">

                            <NewStudentForm projectId={projectId} />
                        </div> : <p className="text-red-500 max-w-[600px]">No vacancy available in this project. Please increase dorm vacancy or create a dorm with available vacancy to register students.</p>}

                </div>

                {totalVacancy > 0 &&
                    /*Card to display recently added students - Query students for specific table that belongs to user*/
                    <div className="w-full gap-y-5">
                        {/*Students to be displayed - Query students per project for specific user and displays their assigned dorms */}
                        <h2 className="text-(length:--heading-md) text-(--color-primary)">Recently Registered Students</h2>
                        {students.length > 0 ? <div className="gap-y-8">
                            {students.map((student) => (
                                <StudentsCard key={student.id} sName={student.full_name} sAdminNo={student.admission_no} sDorm={student.dorm_name ?? "Unassigned"} />
                            ))}
                        </div> : <p className="text-red-500 max-w-[600px]">No students assigned yet</p>}
                    </div>}

            </div>
        </section>

    );
}