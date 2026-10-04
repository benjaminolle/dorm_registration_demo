// lib/db.ts
import { Pool } from 'pg';

const globalForPool = globalThis as unknown as { pool: Pool | undefined };

export const pool: Pool = globalForPool.pool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;

if (process.env.NODE_ENV !== 'production') {
  globalForPool.pool = pool;
}

export async function initDb(): Promise<void> {
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        username text NOT NULL,
        email text NOT NULL UNIQUE,
        password_hash text NOT NULL,
        is_demo BOOLEAN DEFAULT false,
        demo_expires_at timestamptz,
        created_at timestamptz DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS projects (
        id serial PRIMARY KEY,
        user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name text NOT NULL,
        closed_at timestamptz,
        created_at timestamptz DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS dorms (
        id serial PRIMARY KEY,
        project_id integer NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        name text NOT NULL,
        capacity integer NOT NULL,
        assignment_order integer NOT NULL DEFAULT 0,
        created_at timestamptz DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS students (
        id serial PRIMARY KEY,
        project_id integer NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        dorm_id integer REFERENCES dorms(id) ON DELETE SET NULL,
        admission_no text,
        full_name text NOT NULL,
        date_of_birth date,
        program text,
        guardian_name text,
        guardian_phone varchar(10) CHECK (guardian_phone ~ '^[0-9]{0,10}$'),
        guardian_occupation text,
        guardian_relation text,
        guardian2_name text,
        guardian2_phone varchar(10) CHECK (guardian2_phone ~ '^[0-9]{0,10}$'),
        guardian2_occupation text,
        guardian2_relation text,
        interests text,
        declaration boolean,
        med_condition text,
        address text,
        created_at timestamptz DEFAULT now(),
        UNIQUE (project_id, admission_no)
    );

    CREATE TABLE IF NOT EXISTS download_logs (
        id serial PRIMARY KEY,
        project_id integer NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        downloaded_at timestamptz DEFAULT now()
    );
`;

  await pool.query(createTablesQuery);
}