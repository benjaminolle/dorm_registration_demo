import ExportStudentsButton from "@/components/ui/buttons/ExportStudentsButton";
import { getStudents } from "@/lib/students";

export default async function ViewStudents(
    { params
    }: {
        params: Promise<{ projectId: string }>;
    }) {

    const { projectId: projectIdRaw } = await params;
    const projectId = Number(projectIdRaw);
    const students = await getStudents(projectId);

    return (
        <section className="py-15">

            {students.length > 0 ?
                <div className="bo-container gap-y-8">

                    <div className="flex-row justify-between">
                        <h2 className="text-(length:--heading-md) text-(--color-primary)">Registered Students</h2>
                        <ExportStudentsButton projectId={projectId} />
                    </div>


                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left border-b border-gray-400">
                                <th className="p-2">No.</th>
                                <th className="p-2">Admission No</th>
                                <th className="p-2">Full Name</th>
                                <th className="p-2">Dorm</th>
                                <th className="p-2">Program</th>
                            </tr>
                        </thead>
                        <tbody> {students.map((s, index) => (
                            <tr key={s.id} className="border-b border-gray-400 uppercase">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{s.admission_no}</td>
                                <td className="p-2">{s.full_name}</td>
                                <td className="p-2">{s.dorm_name || "Unassigned"}</td>
                                <td className="p-2">{s.program}</td>
                            </tr>
                        ))} </tbody>
                    </table>
                </div> : <div className="bo-container gap-y-6">

                    <h2 className="text-(length:--heading-md) text-(--color-primary)">Registered Students</h2>
                    <p className="text-red-500">No students registered yet. Please register students to view them here.</p>

                </div>}
        </section>
    );
}