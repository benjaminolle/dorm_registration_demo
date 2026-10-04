export default async function DormsCard({
    dname,
    dcapacity,
    dvacancy,

}: {
    dname: string,
    dcapacity: number,
    dvacancy: number,
}) {

    return (

        <div className="w-full bg-white px-4 py-6 sm:px-6 gap-y-4 rounded-lg ">
            <h2 className="text-(length:--heading-base) font-[500] border-b border-gray-200 pb-1 uppercase">{dname}</h2>
            <div className="flex-row flex-wrap gap-2">
                <span className="stats-pill text-(--color-primary)">Capacity: {dcapacity}</span>
                <span className={`stats-pill ${dvacancy > 0 ? "text-[green]" : "text-[red]"}`}>Vacancy: {dvacancy}</span>
            </div>
        </div>
    )
}