"use server";
import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

export type Errors = {
    general?: string;
    admissionNo?: string;
    fullName?: string;
    dob?: string;
    program?: string;
    address?: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianOccupation?: string;
    guardianRelation?: string;
    guardian2Name?: string;
    guardian2Phone?: string;
    guardian2Occupation?: string;
    guardian2Relation?: string;
    interests?: string;
    medCondition?: string;
    declaration?: string;
}

export type Values = {
    admissionNo?: string;
    fullName?: string;
    dob?: string;
    program?: string;
    address?: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianOccupation?: string;
    guardianRelation?: string;
    guardian2Name?: string;
    guardian2Phone?: string;
    guardian2Occupation?: string;
    guardian2Relation?: string;
    interests?: string;
    medCondition?: string;
}

export type FormState = {
    errors: Errors;
    values: Values;
    success?: boolean;
}

export async function createStudent(
    projectId: number,
    prevState: FormState,
    formData: FormData
): Promise<FormState> {

    const admissionNoRaw = formData.get("admissionNo") as string;
    const fullName = formData.get("fullName") as string;
    const dob = formData.get("dob") as string;
    const program = formData.get("program") as string;
    const address = formData.get("address") as string;
    const guardianName = formData.get("guardianName") as string;
    const guardianPhone = formData.get("guardianPhone") as string;
    const guardianOccupation = formData.get("guardianOccupation") as string;
    const guardianRelation = formData.get("guardianRelation") as string;

    const guardian2Name = formData.get("guardian2Name") as string;
    const guardian2Phone = formData.get("guardian2Phone") as string;
    const guardian2Occupation = formData.get("guardian2Occupation") as string;
    const guardian2Relation = formData.get("guardian2Relation") as string;

    const interests = formData.get("interests") as string;
    const medCondition = formData.get("medCondition") as string;
    const declaration = formData.get("declaration") === "on";

    // Blank admission number becomes a real NULL, not an empty string —
    // lets multiple "not yet assigned" students coexist under the UNIQUE constraint.
    const admissionNo = admissionNoRaw && admissionNoRaw.trim().length > 0 ? admissionNoRaw.trim() : null;

    const values: Values = {
        admissionNo: admissionNo ?? "", // keep the input controlled/repopulatable as a string
        fullName, dob, program, address,
        guardianName, guardianPhone, guardianOccupation, guardianRelation,
        guardian2Name, guardian2Phone, guardian2Occupation, guardian2Relation,
        interests, medCondition,
    };

    const errors: Errors = {};

    // admissionNo intentionally not required anymore
    if (!fullName) {
        errors.fullName = "Full name is required";
    }
    if (!dob) {
        errors.dob = "Date of birth is required";
    }
    if (!program) {
        errors.program = "Program is required";
    }
    if (!address) {
        errors.address = "Address is required";
    }
    if (!guardianName) {
        errors.guardianName = "Guardian name is required";
    }
    const phonePattern = /^[0-9]{0,10}$/;

    if (!guardianPhone) {
        errors.guardianPhone = "Guardian phone is required";
    } else if (!phonePattern.test(guardianPhone)) {
        errors.guardianPhone = "Phone must contain digits only (no spaces or symbols), up to 10 digits";
    }
    if (!guardianOccupation) {
        errors.guardianOccupation = "Guardian occupation is required";
    }
    if (!guardianRelation) {
        errors.guardianRelation = "Guardian relation is required";
    }
    if (!declaration) {
        errors.declaration = "You must confirm the declaration to register this student";
    }

    if (Object.keys(errors).length > 0) {
        return { errors, values };
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const dormResult = await client.query(
            `SELECT d.id
         FROM dorms d
         WHERE d.project_id = $1
           AND (
               SELECT COUNT(*)
               FROM students s
               WHERE s.dorm_id = d.id
           ) < d.capacity
         ORDER BY d.assignment_order ASC, d.created_at ASC, d.id ASC
         FOR UPDATE
         LIMIT 1`,
            [projectId]
        );

        const dorm = dormResult.rows[0];

        if (!dorm) {
            await client.query("ROLLBACK");
            return { errors: { general: "All dorms are full." }, values };
        }


        await client.query(
            `INSERT INTO students (
                admission_no, project_id, dorm_id, full_name, date_of_birth,
                program, address, guardian_name, guardian_phone,
                guardian_occupation, guardian_relation,
                guardian2_name, guardian2_phone, guardian2_occupation, guardian2_relation,
                interests, med_condition, declaration
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
            [
                admissionNo, projectId, dorm.id, fullName, dob,
                program, address, guardianName, guardianPhone,
                guardianOccupation, guardianRelation,
                guardian2Name || null, guardian2Phone || null, guardian2Occupation || null, guardian2Relation || null,
                interests || null, medCondition || null, declaration,
            ]
        );

        await client.query("COMMIT");
    } catch (error: unknown) {
        await client.query("ROLLBACK");

        if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
            return { errors: { admissionNo: "This admission number is already in use." }, values };
        }
        return { errors: { general: "Something went wrong. Please try again." }, values };
    } finally {
        client.release();
    }

    revalidatePath(`/portal/project/${projectId}/register`);
    return {
        errors: {},
        values: {},
        success: true,
    };
}