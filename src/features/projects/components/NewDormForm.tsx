"use client";

import { useActionState, useState } from "react";
import { DormFormState, createDormAction } from "@/features/projects/actions/dorms";


export default function NewDormForm({ projectId }: { projectId: number }) {
    const initialState: DormFormState = { errors: {} };

    const bindAction = createDormAction.bind(null, projectId);
    const [state, formAction, isPending] = useActionState(bindAction, initialState);
    const [dormName, setDormName] = useState("");
    const [dormCapacity, setDormCapacity] = useState("");

    const hasChanged = dormName.trim() !== "" && dormCapacity !== "";


    return (
        <form id="new-dorm" action={formAction} className="flex flex-col w-full">
            {state.errors.general && <p className="text-red-500">{state.errors.general}</p>}
            <div className="form-group ">
                <label htmlFor="dormName">Dorm Name</label>
                <input id="dormName" type="text" name="dormName" className={`${state.errors.dormName ? "border-red-500" : ""}`} value={dormName} onChange={(e) => setDormName(e.target.value)} autoComplete="off" />
                {state.errors.dormName && <p className="text-red-500">{state.errors.dormName}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="dormCapacity">Dorm Capacity</label>
                <input id="dormCapacity" type="number" name="dormCapacity" className={`${state.errors.dormCapacity ? "border-red-500" : ""}`} value={dormCapacity} onChange={(e) => setDormCapacity(e.target.value)} autoComplete="off" />
                {state.errors.dormCapacity && <p className="text-red-500">{state.errors.dormCapacity}</p>}
            </div>

            <div className="btn-wrapper">
                <button type="submit" className={`primary-btn btn disabled:opacity-75 disabled:cursor-default w-fit ${hasChanged ? "opacity-100" : ""}`} disabled={isPending || !hasChanged}>{isPending ? "Creating Dorm..." : "Create Dorm"}</button>
            </div>

        </form>
    );
}

