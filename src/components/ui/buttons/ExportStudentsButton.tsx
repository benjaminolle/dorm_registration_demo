
"use client";

import { useState } from "react";
import { exportStudentsCsv } from "@/features/projects/actions/exports";

export default function ExportStudentsButton({ projectId }: { projectId: number }) {
    const [isDownloading, setIsDownloading] = useState(false);

    async function handleDownload() {
        setIsDownloading(true);
        const csv = await exportStudentsCsv(projectId);

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `students-project-${projectId}-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);

        setIsDownloading(false);
    }

    return (
        <button onClick={handleDownload} disabled={isDownloading} className="primary-btn btn">
            {isDownloading ? "Preparing..." : "Download Full Student Data (CSV)"}
        </button>
    );
}