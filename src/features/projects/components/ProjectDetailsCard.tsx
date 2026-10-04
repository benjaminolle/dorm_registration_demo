import Link from "next/link";
import { getProjectVacancy } from "@/lib/dorms";

export default async function ProjectDetailsCard({ pname, project_id, className }: {
    pname: string,
    project_id: number,
    className?: string,
}) {
    const vacancyData = (await getProjectVacancy(project_id)) ?? {
        total_capacity: 0,
        total_occupied: 0,
        total_vacancy: 0,
    };
    const totalVacancy = Number(vacancyData.total_vacancy ?? 0);
    const totalCapacity = Number(vacancyData.total_capacity ?? 0);
    const totalOccupied = Number(vacancyData.total_occupied ?? 0);

    return (
        <div className={`w-full bg-white px-4 py-6 sm:px-6 gap-y-4 rounded-lg ${className}`}>
            <h2 className="text-(length:--heading-base) font-[500] border-b border-gray-200 pb-1">{pname}</h2>
            <div className="flex-row flex-wrap gap-2">
                <span className="stats-pill text-(--color-primary)">Capacity: <strong>{totalCapacity}</strong></span>
                <span className={`stats-pill ${totalVacancy > 0 ? "text-[green]" : "text-[red]"}`}><strong>Vacancy: </strong>{totalVacancy}</span>
                <span className="stats-pill"><strong>Occupied: </strong>{totalOccupied}</span>
            </div>

            <Link href={`/portal/projects/${project_id}`} className=" secondary-btn btn mt-1">View Project</Link>
        </div>
    )
}