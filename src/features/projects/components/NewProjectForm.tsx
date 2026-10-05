"use client";

import { useActionState, useEffect, useState } from "react";
import { ProjectFormState, createProjectAction } from "@/features/projects/actions/projects";


export default function NewProjectForm({ onSuccess }: { onSuccess: () => void }) {
    const initialState: ProjectFormState = { errors: {} };
    const [state, formAction, isPending] = useActionState(createProjectAction, initialState);
    const [projectName, setProjectName] = useState("");

    useEffect(() => {
        if (state.success) onSuccess();
    }, [state, onSuccess]);

    const hasChanged = projectName.trim() !== "";

    return (
        <form action={formAction} className="flex flex-col gap-3 max-w-[400px]">
            <div className="form-group">
                <label htmlFor="projectName"></label>
                <input id="projectName" type="text" name="name" placeholder="Project name" className={`${state.errors.projectName ? "border-red-500" : ""}`} onChange={(e) => setProjectName(e.target.value)} autoComplete="off" />
                {state.errors.projectName && <p className="text-red-500">{state.errors.projectName}</p>}
            </div>

            <div className="btn-wrapper mt-2">
                <button type="submit" className={`primary-btn btn disabled:opacity-75 disabled:cursor-default w-fit ${hasChanged ? "opacity-100" : ""}`} disabled={isPending || !hasChanged}>{isPending ? "Creating Project..." : "Create Project"}</button>
            </div>

        </form>
    );
}
