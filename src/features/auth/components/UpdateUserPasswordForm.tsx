"use client";
import { useActionState, useState, useEffect } from "react";
import { FormState, updateUserPassword } from "@/features/auth/actions/users";
import ShowPasswordToggle from "@/features/auth/components/ShowPasswordToggle";


export default function UpdatePasswordForm() {

    const initialState: FormState = { errors: {}, success: false };
    const [state, formAction, isPending] = useActionState(updateUserPassword, initialState);


    const [currentPwd, setCurrentPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const hasChanged = currentPwd.trim() !== "" && newPwd.trim() !== "";

    useEffect(() => {
        if (state.success) {
            setShowSuccess(true);
            setCurrentPwd("");
            setNewPwd("");
            setShowCurrent(false);
            setShowNew(false);

            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [state]);


    return (
        <form action={formAction} className="w-full gap-x-5">
            {state.errors.general && <p className="text-red-500 mb-4">{state.errors.general}</p>}
            <div className="form-group gap-y-2 mb-5">
                <label htmlFor="currentPwd" > Current Password</label>
                <div>
                    <input id="currentPwd" type={showCurrent ? "text" : "password"} name="currentPwd" className={`${state.errors.currentPwd ? "border-red-500" : ""}`} value={currentPwd}
                        onChange={(e) => setCurrentPwd(e.target.value)} autoComplete="off"
                    />
                    <ShowPasswordToggle visible={showCurrent} onToggle={() => setShowCurrent(v => !v)} />
                </div>

                {state.errors.currentPwd && <p className="text-red-500">{state.errors.currentPwd}</p>}

            </div>

            <div className="form-group gap-y-2 ">
                <label htmlFor="newPwd" > New Password </label>
                <div>
                    <input id="newPwd" type={showNew ? "text" : "password"} className={`${state.errors.newPwd ? "border-red-500" : ""}`} name="newPwd" value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)} autoComplete="off" />

                    <ShowPasswordToggle visible={showNew} onToggle={() => setShowNew(v => !v)} />
                </div>

                {state.errors.newPwd && <p className="text-red-500">{state.errors.newPwd}</p>}
                {showSuccess && <p className="text-green-500">Password changed successfully</p>}
            </div>
            {hasChanged && <div className="form-group">
                <button className={`primary-btn btn disabled:opacity-75 disabled:cursor-default w-fit ${hasChanged ? "opacity-100" : ""}`} type="submit" disabled={isPending || !hasChanged}>{isPending ? "Saving changes" : "Save changes"}</button>
            </div>}


        </form>
    );


}