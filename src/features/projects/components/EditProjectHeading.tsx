
"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import { updateProjectNameAction, ProjectFormState } from "@/features/projects/actions/projects";
import PencilIcon from "@/assets/pencil.svg";

export default function EditProjectHeading({ projectId, initialName }: { projectId: number; initialName: string }) {

    const initialState: ProjectFormState = { errors: {}, success: false };
    const bindAction = updateProjectNameAction.bind(null, projectId);
    const [state, formAction, isPending] = useActionState(bindAction, initialState);

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);
    const [showSuccess, setShowSuccess] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const hasChanged = name.trim() !== "" && name.trim() !== initialName;

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.select();
        }
    }, [isEditing]);

    useEffect(() => {
        if (state.success) {
            setIsEditing(false);
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }

    }, [state]);

    // async function save() {
    //     if (name.trim() === "" || name === initialName) {
    //         setName(initialName); // revert if empty or unchanged
    //         setIsEditing(false);
    //         return;
    //     }

    //     setIsSaving(true);
    //     await updateProjectNameAction(projectId, name.trim());
    //     setIsSaving(false);
    //     setIsEditing(false);
    // }

    if (isEditing) {
        return (
            <form action={formAction}>
                <div className="flex-row w-fit border-b border-gray-400 items-center">
                    <input
                        ref={inputRef}
                        value={name}
                        name="projectName"
                        onChange={(e) => setName(e.target.value)}
                        // onBlur={(e) => setIsEditing(false)}
                        onKeyDown={(e) => {
                            // if (e.key === "Enter") save();
                            if (e.key === "Escape") {
                                setName(initialName);
                                setIsEditing(false);
                            }
                        }}
                        className="text-(length:--heading-xl) bg-transparent w-fit border-0 font-[600]"
                    />
                    {isPending || hasChanged && <button type="submit" className="btn light-btn rounded-sm leading-none py-2 h-fit">Save</button>}

                    {isPending && <span className="text-(length:--text-sm) text-white">Saving...</span>}

                </div>
                {state.errors.projectName && <p className="text-red-500">{state.errors.projectName}</p>}
            </form>


        );
    }

    return (
        <div className="flex-row">
            <h1 className="text-(length:--heading-xl) text-(--color-offwhite)">{name}</h1>
            <button onClick={() => setIsEditing(true)} aria-label="Edit name" className="max-lg:absolute shrink-0 -mt-4"><PencilIcon className="w-[14px] lg:ml-2" />
            </button>
            {showSuccess && <p className="text-red-500">Project Name updated successfully.</p>}
        </div>

    );
}