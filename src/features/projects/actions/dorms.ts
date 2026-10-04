"use server";

import pool from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type DormFormState = {
    errors: {
        general?: string;
        dormName?: string;
        dormCapacity?: string;
    };
};

export type UpdateDormsState = {
    errors: { general?: string };
    success?: boolean;
};

/*===============
DORM ACTIONS
============== */

/*-------------
CREATE DORM
------------ */
export async function createDormAction(
    projectId: number,
    prevState: DormFormState,
    formData: FormData,
): Promise<DormFormState> {

    const name = formData.get("dormName") as string;
    const capacityRaw = formData.get("dormCapacity") as string;
    const capacity = Number(capacityRaw);

    const errors: DormFormState["errors"] = {};


    if (!projectId || projectId === 0) {
        errors.dormName = "Dorm name is required";
    }

    if (!name || name.trim().length === 0) {
        errors.dormName = "Dorm name is required";
    }

    if (!capacityRaw || isNaN(capacity) || capacity <= 0) {
        errors.dormCapacity = "Capacity must be a positive number";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    try {
        await pool.query(
            `INSERT INTO dorms (project_id, name, capacity) VALUES ($1, $2, $3)`,
            [projectId, name.trim(), capacity]
        );
    } catch (error) {
        console.error(error);
        return { errors: { general: "Something went wrong creating the dorm. Please try again." } };
    }

    redirect(`/portal/projects/${projectId}?created=dorm`);
}



/*------------------
UPDATE DORM DETAILS
----------------- */

export async function updateDormSettingsAction(
    projectId: number,
    prevState: UpdateDormsState,
    formData: FormData
): Promise<UpdateDormsState> {
    const dormIds = formData.getAll("dormId") as string[];
    const capacities = formData.getAll("capacity") as string[];
    const orders = formData.getAll("assignmentOrder") as string[];

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        for (let i = 0; i < dormIds.length; i++) {
            const capacity = Number(capacities[i]);
            const order = Number(orders[i]);

            if (isNaN(capacity) || capacity <= 0) {
                await client.query("ROLLBACK");
                return { errors: { general: "All capacities must be positive numbers" } };
            }

            await client.query(
                `UPDATE dorms SET capacity = $1, assignment_order = $2 WHERE id = $3 AND project_id = $4`,
                [capacity, order, dormIds[i], projectId]
            );
        }

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error(error);
        return { errors: { general: "Something went wrong. Please try again." } };
    } finally {
        client.release();
    }

    revalidatePath(`/portal/projects/${projectId}`);
    return { errors: {}, success: true };
}