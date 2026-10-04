// src/app/api/cleanup-demo/route.ts
import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const expiredUsers = await pool.query(
            `SELECT * FROM users WHERE is_demo = true AND demo_expires_at < now()`
        );

        if (expiredUsers.rowCount === 0) {
            console.log("Demo cleanup: no expired accounts found");
            return NextResponse.json({ deleted: 0 });
        }

        const result = await pool.query(
            `DELETE FROM users WHERE is_demo = true AND demo_expires_at < now()`
        );
        console.log(`Demo cleanup: deleted ${result.rowCount} expired accounts`);
        return NextResponse.json({ deleted: result.rowCount });
    } catch (error) {
        console.error("Error deleting expired demo accounts:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }



}