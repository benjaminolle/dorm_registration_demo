"use client";

import { useActionState, useState } from "react";
import { FormState, registerUser } from "@/features/auth/actions/users";
import ShowPasswordToggle from "@/features/auth/components/ShowPasswordToggle";

export default function RegisterUserForm() {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [pwd, setPwd] = useState("");
    const [showPwd, setShowPwd] = useState(false);

    const hasChanged = email.trim() !== "" && pwd.trim() !== "" && userName.trim() !== "";

    const initialState: FormState = {
        errors: {},
    };

    const [state, formAction, isPending] = useActionState(registerUser, initialState);

    return <form action={formAction} className="flex flex-col w-full max-w-[400]">
        {state.errors.general && <p className="text-red-500 mb-4">{state.errors.general}</p>}
        <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input id="userName" className={`${state.errors.username ? "border-red-500" : ""}`} type="text" name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
            {state.errors.username && <p className="text-red-500">{state.errors.username}</p>}
        </div>

        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" className={`${state.errors.email ? "border-red-500" : ""}`} name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {state.errors.email && <p className="text-red-500">{state.errors.email}</p>}
        </div>

        <div className="form-group">
            <label htmlFor="pwd">Password</label>
            <div>
                <input id="pwd" type={showPwd ? "text" : "password"} name="pwd" className={`${state.errors.pwd ? "border-red-500" : ""}`} value={pwd} onChange={(e) => setPwd(e.target.value)} />
                <ShowPasswordToggle visible={showPwd} onToggle={() => setShowPwd(v => !v)} />
            </div>
            {state.errors.pwd && <p className="text-red-500">{state.errors.pwd}</p>}
        </div>
        <div className="btn-wrapper">
            <button type="submit" className={`primary-btn btn w-full text-center ${hasChanged ? "opacity-100" : ""}`} disabled={isPending || !hasChanged}>{isPending ? "Registering..." : "Register"}</button>
        </div>

    </form>
}