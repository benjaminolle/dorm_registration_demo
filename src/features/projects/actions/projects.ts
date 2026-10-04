"use server";

import { requireUserId, auth } from "@/lib/auth";
import pool from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export type ProjectFormState = {
    errors: {
        projectName?: string;
    };
    success?: boolean;
};


/*===============
PROJECT ACTIONS
============== */

/*-------------
CREATE PROJECT
------------ */
export async function createProjectAction(
    prevState: ProjectFormState,
    formData: FormData
): Promise<ProjectFormState> {
    const userId = await requireUserId();
    const name = formData.get("name") as string;

    if (!name || name.trim().length === 0) {
        return { errors: { projectName: "Project name is required" } };
    }

    try {
        await pool.query(
            `INSERT INTO projects (user_id, name) VALUES ($1, $2)`,
            [userId, name.trim()]
        );
    } catch {
        return { errors: { projectName: "Something went wrong creating the project. Please try again." } };
    }

    revalidatePath("/portal");
    return { errors: {} };
}


/*---------------
UPDATE PROJECT
---------------*/
export async function updateProjectNameAction(
    projectId: number,
    prevState: ProjectFormState,
    formData: FormData
): Promise<ProjectFormState> {
    const session = await auth();
    const userId = Number(session?.user?.id);

    const newName = formData.get("projectName") as string;

    if (!userId) {
        return { errors: { projectName: "You cannot perform this operation" } };
    }

    if (!newName || newName.trim() === "") {
        return { errors: { projectName: "This field cannot be empty" } };
    }

    try {
        await pool.query(
            `UPDATE projects SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING id`,
            [newName, projectId, userId]
        );

    } catch (error) {
        return { errors: { projectName: "Something went wrong, please try again" } };
    }

    revalidatePath(`/portal/projects/${projectId}`);
    return { errors: {}, success: true };
}