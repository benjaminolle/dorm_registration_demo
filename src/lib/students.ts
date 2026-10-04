import pool from "@/lib/db";

export type StudentRow = {
    id: number;
    admission_no: string;
    full_name: string;
    dorm_name: string | null;
    program?: string | null;
    created_at?: string;
};

export async function getStudents(projectId: number): Promise<StudentRow[]> {
    const result = await pool.query<StudentRow>(
        `SELECT s.id, s.admission_no, s.full_name, s.program, d.name AS dorm_name
     FROM students s
     LEFT JOIN dorms d ON s.dorm_id = d.id
     WHERE s.project_id = $1
     ORDER BY s.full_name`,
        [projectId]
    );
    return result.rows;
}

export async function getRecentStudents(projectId: number, limit: number = 4): Promise<StudentRow[]> {
    const result = await pool.query<StudentRow>(
        `SELECT s.id, s.admission_no, s.full_name, d.name AS dorm_name
     FROM students s
     LEFT JOIN dorms d ON s.dorm_id = d.id
     WHERE s.project_id = $1
     ORDER BY s.created_at DESC
     LIMIT $2`,
        [projectId, limit]
    );
    return result.rows;
}

export async function getStudentsFullExport(projectId: number): Promise<StudentRow[]> {
    const result = await pool.query<StudentRow>(
        `SELECT s.*, d.name AS dorm_name
     FROM students s
     LEFT JOIN dorms d ON s.dorm_id = d.id
     WHERE s.project_id = $1
     ORDER BY s.full_name`,
        [projectId]
    );
    return result.rows;
}