"use client";
import { FormState, updateUsernameAction } from "@/features/auth/actions/users";
import { useActionState, useState, useEffect } from "react";


export default function EditUsernameForm({ username }: { username: string }) {
    const initialState: FormState = { errors: {} };
    const [state, formAction, isPending] = useActionState(updateUsernameAction, initialState);
    const [inputValue, setInputValue] = useState(username);
    const hasChanged = inputValue.trim() !== "" && inputValue.trim() !== username;

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (state.success) {
            setShowSuccess(true);

            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [state]);

    return (
        <form action={formAction} className=" w-full justify-between">
            {state.errors.general && <p className="text-red-500 mb-4">{state.errors.general}</p>}
            <div className="form-group gap-y-2">
                <label htmlFor="userName">Username</label>
                <input id="userName" type="text" name="userName" value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} autoComplete="off"
                    className={`${state.errors.username ? "border-red-500" : ""}`}
                />

                {state.errors.username && <p className="text-red-500">{state.errors.username}</p>}
                {showSuccess && <p className="text-green-500">Username successfully changed.</p>}
            </div>
            {hasChanged && <div className="w-fit">
                <div className="btn-wrapper">
                    <button type="submit" className={`primary-btn btn disabled:opacity-75 disabled:cursor-default w-fit ${hasChanged ? "opacity-100" : ""}`} disabled={isPending || !hasChanged}>{isPending ? "Saving changes" : "Save changes"}</button>
                </div>
            </div>}


        </form>
    )

}