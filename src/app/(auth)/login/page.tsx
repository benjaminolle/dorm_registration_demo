import LoginForm from "@/features/auth/components/LoginForm";
import Link from "next/link";

export default function Login() {

    return (
        <>
            <h1 className="mb-6 text-(length:--heading-xl)">Login</h1>
            <LoginForm />
            <Link href="/register" className="underline text-(--color-primary)">Create a new account</Link>
        </>
    );
}