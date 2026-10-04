export default async function DormsCard({
    sName,
    sAdminNo,
    sDorm,
    className,

}: {
    sName: string,
    sAdminNo: string,
    sDorm: string | null,
    className?: string,
}) {

    return (
        <div className={`w-full bg-white px-4 py-6 sm:px-6 gap-y-4 rounded-lg  ${className}`}>
            <h2 className="text-(length:--heading-base) font-[500] border-b border-gray-200 pb-1 uppercase">{sName}</h2>
            <div className="text-(--color-primary) gap-x-2">
                <span><strong>Admission No: </strong>{sAdminNo}</span>
                <span><strong>{sDorm ?? "Unassigned"}</strong></span>
            </div>
        </div>
    )
}