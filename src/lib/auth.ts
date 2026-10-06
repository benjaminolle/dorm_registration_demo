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
                token.id = user.id; // runs once, right after successful login
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string; // copies it onto session.user
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