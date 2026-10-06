// actions/exports.ts
"use server";

import pool from "@/lib/db";
import { getStudentsFullExport } from "@/lib/students";
import { auth } from "@/lib/auth";
import { toCsv } from "@/lib/csv";


/*===============
EXPORT ACTIONS
============== */

/*-----------------------------
EXPORT REGISTERED STUDENTS DATA
---------------------------- */
export async function exportStudentsCsv(projectId: number) {
    const session = await auth();
    const userId = Number(session!.user!.id);

    const students = await getStudentsFullExport(projectId);

    const columns = [
        { key: "admission_no", header: "Admission No" },
        { key: "full_name", header: "Full Name" },
        { key: "date_of_birth", header: "Date of Birth" },
        { key: "program", header: "Program" },
        { key: "address", header: "Address" },
        { key: "dorm_name", header: "Dorm" },
        { key: "guardian_name", header: "Guardian Name" },
        { key: "guardian_phone", header: "Guardian Phone" },
        { key: "guardian_occupation", header: "Guardian Occupation" },
        { key: "guardian_relation", header: "Guardian Relation" },
        { key: "guardian2_name", header: "Guardian 2 Name" },
        { key: "guardian2_phone", header: "Guardian 2 Phone" },
        { key: "guardian2_occupation", header: "Guardian 2 Occupation" },
        { key: "guardian2_relation", header: "Guardian 2 Relation" },
        { key: "interests", header: "Interests" },
        { key: "med_condition", header: "Medical Condition" },
        { key: "declaration", header: "Declaration" },
    ];

    const csv = toCsv(students, columns);

    return csv;
}