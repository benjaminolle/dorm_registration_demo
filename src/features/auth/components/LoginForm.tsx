"use client";

import { useActionState, useState, useEffect } from "react";
import { FormState, loginUser } from "@/features/auth/actions/users";
import ShowPasswordToggle from "@/features/auth/components/ShowPasswordToggle";

export default function LoginForm() {

    const initialState: FormState = { errors: {}, };

    const [state, formAction, isPending] = useActionState(loginUser, initialState);
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const [showPwd, setShowPwd] = useState(false);


    const hasChanged = email.trim() !== "" && pwd.trim() !== "";

    return <form id="login-form" action={formAction} className="flex flex-col w-full max-w-[400]">
        {state.errors.general && <p className="text-red-500 mb-4">{state.errors.general}</p>}
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" className={`${state.errors.email ? "border-red-500" : ""}`} value={email} onChange={(e) => { setEmail(e.target.value) }} autoComplete="off" />
            {state.errors.email && <p className="text-red-500">{state.errors.email}</p>}
        </div>

        <div className="form-group">
            <label htmlFor="pwd">Password</label>
            <div>
                <input id="pwd" type={showPwd ? "text" : "password"} name="pwd" className={`${state.errors.pwd ? "border-red-500" : ""}`} value={pwd} onChange={(e) => { setPwd(e.target.value) }} autoComplete="off" />
                <ShowPasswordToggle visible={showPwd} onToggle={() => setShowPwd(v => !v)} />
            </div>
            {state.errors.pwd && <p className="text-red-500">{state.errors.pwd}</p>}
        </div>

        <div className="btn-wrapper">
            <button type="submit" aria-label="Log in" className={`primary-btn btn w-full text-center ${hasChanged ? "opacity-100" : ""}`} disabled={isPending || !hasChanged}>{isPending ? "Loggin In...." : "Log In"}</button>
        </div>

    </form>
}