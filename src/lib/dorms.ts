// lib/dorms.ts
import pool from "@/lib/db";

export type DormRow = {
    id: number;
    name: string;
    capacity: number;
    created_at: string;
    occupied?: number | string;
    vacancy: number | string;
    assignment_order?: number;
};

export type VacancyRow = {
    total_capacity: number | string | null;
    total_occupied: number | string | null;
    total_vacancy: number | string | null;
};

//Check Dorms vacancy under a project

export async function getProjectVacancy(projectId: number): Promise<VacancyRow | undefined> {
    const result = await pool.query<VacancyRow>(
        `SELECT
           COALESCE(SUM(d.capacity), 0) AS total_capacity,
           COALESCE(SUM(occupied.count), 0) AS total_occupied,
           COALESCE(SUM(d.capacity), 0) - COALESCE(SUM(occupied.count), 0) AS total_vacancy
         FROM dorms d
         LEFT JOIN (
             SELECT dorm_id, COUNT(*) AS count
             FROM students
             GROUP BY dorm_id
         ) occupied ON occupied.dorm_id = d.id
         WHERE d.project_id = $1`,
        [projectId]
    );
    return result.rows[0];
}

//Get Dorms under a project

export async function getDormsByProject(projectId: number): Promise<DormRow[]> {
    const result = await pool.query<DormRow>(
        `SELECT
       d.id,
       d.name,
       d.capacity,
       d.created_at,
       COUNT(s.id) AS occupied,
       d.capacity - COUNT(s.id) AS vacancy
     FROM dorms d
     LEFT JOIN students s ON s.dorm_id = d.id
     WHERE d.project_id = $1
     GROUP BY d.id
     ORDER BY d.created_at DESC`,
        [projectId]
    );
    return result.rows;
}


export async function getDormsForEdit(projectId: number): Promise<DormRow[]> {
    const result = await pool.query<DormRow>(
        `SELECT id, name, capacity, assignment_order
     FROM dorms
     WHERE project_id = $1
     ORDER BY assignment_order ASC, id ASC`,
        [projectId]
    );
    return result.rows;
}