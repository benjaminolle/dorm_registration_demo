// auth.ts (project root)
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";
import { redirect } from "next/navigation";
import { cache } from "react";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 1,
        updateAge: 60 * 60,
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const result = await pool.query(
                    "SELECT * FROM users WHERE email = $1",
                    [credentials.email]
                );
                const user = result.rows[0];

                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password_hash
                );

                if (!passwordsMatch) return null;

                return { id: user.id, name: user.username, email: user.email };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                return token;
            }

            if (token?.id) {
                //Verify user exists
                const result = await pool.query(
                    "SELECT id FROM users WHERE id=$1",
                    [token.id]
                );

                const userExists = result.rows[0];

                //If user no longer exists or cron job deletes the demo account, invalidate session and destroy
                if (!userExists) {
                    return null;
                }
            }
            return token;
        },
        async session({ session, token }) {

            //If token was destroyed, invalidate session
            if (!token) {
                return {} as any;
            }
            //Pass the user id if user exists
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },

});

export const getUserId = cache(async () => {
    const session = await auth();
    const userId = Number(session?.user?.id);

    return Number.isInteger(userId) && userId > 0 ? userId : null;
});

export async function requireUserId() {
    const userId = await getUserId();

    if (userId === null) redirect("/login");

    return userId;
}