"use client";
import { useActionState, useState, useEffect } from "react";
import { FormState, updateUserEmail } from "@/features/auth/actions/users";

export default function EditUserEmailForm({ email }: { email: string }) {

    const initialState: FormState = { errors: {}, success: false };
    const [state, formAction, isPending] = useActionState(updateUserEmail, initialState);
    const [inputValue, setInputValue] = useState(email);
    const hasChanged = inputValue.trim() !== "" && inputValue.trim() !== email.trim();

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (state.success) {
            setShowSuccess(true);

            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [state]);

    return (
        <form action={formAction} className="w-full gap-x-5">
            {state.errors.general && <p className="text-red-500 mb-4">{state.errors.general}</p>}
            <div className="form-group gap-y-2">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" value={inputValue} className={`${state.errors.email ? "border-red-500" : ""}`}
                    onChange={(e) => setInputValue(e.target.value)} autoComplete="off"
                />

                {state.errors.email && <p className="text-red-500">{state.errors.email}</p>}
                {showSuccess && <p className="text-green-500">Email successfully changed</p>}

            </div>
            {hasChanged && <div className="w-fit">
                <div className="btn-wrapper">
                    <button type="submit" className={`btn primary-btn w-fit opacity-75 disabled:opacity-75 ${hasChanged ? "opacity-100" : ""}`} disabled={isPending || !hasChanged}>{isPending ? "Saving changes" : "Save changes"}</button>
                </div>
            </div>}


        </form>
    );
} 