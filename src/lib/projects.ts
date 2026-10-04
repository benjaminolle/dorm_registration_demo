import pool from "@/lib/db";
import { cache } from "react";

export type ProjectRow = {
    id: number;
    name: string;
    closed_at: string | null;
    created_at: string;
    user_id?: number;
};

export const getProjects = cache(async (userId: number): Promise<ProjectRow[]> => {
    const result = await pool.query<ProjectRow>(
        `SELECT id, name, closed_at, created_at
     FROM projects
     WHERE user_id = $1 AND closed_at IS NULL
     ORDER BY created_at DESC`,
        [userId]
    );
    return result.rows;
});


export const getProjectById = cache(async (projectId: number, userId: number): Promise<ProjectRow | undefined> => {
    const result = await pool.query<ProjectRow>(
        `SELECT * FROM projects WHERE id = $1 AND user_id = $2`,
        [projectId, userId]
    );
    return result.rows[0];
});