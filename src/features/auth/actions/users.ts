"use server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { signIn, auth, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";


const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

function isUniqueViolation(error: unknown): boolean {
    return typeof error === "object" && error !== null && "code" in error && error.code === "23505";
}

function validatePasswordStrength(pwd: string): string | null {
    if (pwd.length < 8) return "Password must be at least 8 characters";
    if (!/[a-z]/.test(pwd)) return "Password must include a lowercase letter";
    if (!/[A-Z]/.test(pwd)) return "Password must include an uppercase letter";
    if (!/\d/.test(pwd)) return "Password must include a number";
    if (!/[^A-Za-z0-9]/.test(pwd)) return "Password must include a symbol";
    return null;
}

export type Errors = {
    general?: string;
    username?: string;
    email?: string;
    pwd?: string;
    newPwd?: string;
    currentPwd?: string;
}

export type FormState = {
    errors: Errors;
    success?: boolean;
}


/*======================
REGISTER AND LOGIN USER
========================*/

/*----------------
REGISTER USER
-----------------*/
export async function registerUser(prevState: FormState, formData: FormData): Promise<FormState> {

    const userName = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const pwd = formData.get("pwd") as string;

    const errors: Errors = {};


    //Validate username
    if (!userName || userName.trim() === "") {
        errors.username = "This field cannot be empty";
    }

    if (userName.length < 2) {
        errors.username = "This field must be more than 2 characters long";
    }

    //Validate email
    if (!email || email.trim().length === 0) {
        errors.email = "This field cannot be empty";
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
        errors.email = "Please enter a valid email address";
    }

    //Check password complexity
    const pwdError = validatePasswordStrength(pwd);

    if (pwdError) {
        errors.pwd = pwdError;
    }

    //Display all errors
    if (Object.keys(errors).length > 0) {
        return { errors };
    }


    const passwordHash = await bcrypt.hash(pwd, 10);

    try {
        //Set demo expiration date
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2); // 2 days from creation

        await pool.query(
            "INSERT INTO users (username, email, password_hash, is_demo, demo_expires_at) VALUES ($1, $2, $3, $4, $5)",
            [userName, email, passwordHash, true, expiresAt]
        );
    } catch (error: unknown) {
        if (isUniqueViolation(error)) {
            return { errors: { email: "An account with this email already exists, login instead." } };
        }

        return { errors: { pwd: "Something went wrong. Please try again" } };
    }
    redirect("/login"); // send them to login after successful signup
}

/*-------------
LOGIN USER
-------------*/

export async function loginUser(prevState: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get("email") as string;
    const pwd = formData.get("pwd") as string;

    //Validate email
    if (!email || email.trim().length === 0) {
        return { errors: { email: "This field cannot be empty" } };
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
        return { errors: { email: "Please enter a valid email address" } };
    }

    if (pwd.length < 8) {
        return { errors: { pwd: "Password must be more than 8 characters" } };
    }
    try {
        await signIn("credentials", {
            email,
            password: pwd,
            redirectTo: "/portal",
        });
        return { errors: {} };
    } catch (error) {
        if (error instanceof AuthError) {
            return { errors: { general: "Invalid email or password" } };
        }
        throw error; // NextAuth uses thrown redirects internally — must rethrow non-auth errors
    }
}

/*--------------
USER LOGOUT
--------------*/
export async function logoutAction() {
    await signOut({ redirectTo: "/login" });
}


/*======================
GET USER INFO
========================*/

/*--------------------
GET USER DETAILS BY ID
----------------------*/
export const getUserById = cache(async (userId: number) => {
    const result = await pool.query(
        `SELECT id, username, email, password_hash FROM users WHERE id = $1`,
        [userId]
    );
    return result.rows[0];
});

/*-----------------
GET USERNAME BY ID
------------------*/
export const getUsernameById = cache(async (userId: number) => {
    const result = await pool.query(
        `SELECT username FROM users WHERE id = $1`,
        [userId]
    );
    return result.rows[0]?.username;
});



/*======================
UPDATE USER DETAILS
========================*/

/*------------------
UPDATE USERNAME
-------------------*/
export async function updateUsernameAction(prevState: FormState, formData: FormData): Promise<FormState> {

    const username = formData.get("userName") as string;
    const session = await auth();
    const userId = Number(session?.user?.id);


    if (!userId) {
        return { errors: { username: "You are not authenticated!" } };
    }
    if (username.trim() === "") {
        return { errors: { username: "This field cannot be empty" } };
    }

    if (username.length < 2) {
        return { errors: { username: "This field must be more than 2 characters long" } };
    }


    try {
        await pool.query(
            "UPDATE users SET username = $1 WHERE id = $2",
            [username.trim(), userId]
        );

    } catch {
        return { errors: { username: "Error With username" } };
    }

    revalidatePath("/portal/profile");
    return { errors: {}, success: true };
}

/*------------------
UPDATE EMAIL
-------------------*/
export async function updateUserEmail(prevState: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get("email") as string;
    const session = await auth();
    const userId = Number(session?.user?.id);


    if (!userId) {
        return { errors: { email: "You are not authenticated!" } };
    }

    if (!email || email.trim().length === 0) {
        return { errors: { email: "This field cannot be empty" } };
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
        return { errors: { email: "Please enter a valid email address" } };
    }
    try {
        await pool.query(
            "UPDATE users SET email = $1 WHERE id = $2",
            [email, userId]
        );
    }

    catch (error: unknown) {
        if (isUniqueViolation(error)) {
            return { errors: { email: "This email is already in use" } };
        }
        return { errors: { general: "Something went wrong. Please try again" } };
    }

    revalidatePath("/portal/profile");
    return { errors: {}, success: true };

}

/*------------------
UPDATE PASSWORD
-------------------*/
export async function updateUserPassword(prevState: FormState, formData: FormData): Promise<FormState> {

    const currentPwd = formData.get("currentPwd") as string;
    const newPwd = formData.get("newPwd") as string

    if (!newPwd?.trim()) {
        return { errors: { newPwd: "This field cannot be left empty" } };
    }

    if (!currentPwd?.trim()) {
        return { errors: { currentPwd: "This field cannot be left empty" } };
    }

    //Check password complexity
    const pwdError = validatePasswordStrength(newPwd);

    if (pwdError) {
        return { errors: { newPwd: pwdError } };
    }


    const session = await auth();
    const userId = Number(session?.user?.id);
    if (!userId || Number.isNaN(userId)) {
        return { errors: { general: "You do not have permission to perform this action" } };
    }

    const userInfo = await getUserById(userId);
    if (!userInfo?.password_hash) {
        return { errors: { general: "You do not have permission to perform this action" } };
    }

    const pwdVerified = await bcrypt.compare(currentPwd, userInfo.password_hash);
    if (!pwdVerified) {
        return { errors: { currentPwd: "Incorrect Password" } };
    }

    try {

        const newPwdHash = await bcrypt.hash(newPwd, 10);

        await pool.query(
            "UPDATE users SET password_hash= $1 WHERE id=$2",
            [newPwdHash, userId]
        );


    } catch {
        return { errors: { general: "Something went wrong. Please try again" } };
    }

    revalidatePath("/portal/profile");
    return { errors: {}, success: true };
}