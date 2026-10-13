import LoginForm from "@/features/auth/components/LoginForm";


export default function Login() {

    return (
        <>
            <h1 className="mb-6 text-(length:--heading-xl)">Login</h1>
            <LoginForm />
            <a href="/register" className="underline text-(--color-primary)">Create a new account</a>
        </>
    );
}