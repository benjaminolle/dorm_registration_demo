import RegisterUserForm from "@/features/auth/components/RegisterUserForm";
import Link from "next/link";

export default function Register() {

    return (
        <>
            <h1 className="mb-6 text-(length:--heading-xl)">Register</h1>
            <RegisterUserForm />
            <p>Already have an account? <Link href="/login" className="underline text-(--color-primary)">Log in</Link></p>
        </>
    );
}