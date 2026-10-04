// components/forms/dorm-settings-form.tsx
"use client";

import { useActionState } from "react";
import { updateDormSettingsAction, UpdateDormsState } from "@/features/projects/actions/dorms";

type Dorm = { id: number; name: string; capacity: number; assignment_order?: number };

export default function DormSettingsForm({
    projectId,
    dorms,
    onClose,
}: {
    projectId: number;
    dorms: Dorm[];
    onClose: () => void;
}) {
    const initialState: UpdateDormsState = { errors: {} };
    const boundAction = updateDormSettingsAction.bind(null, projectId);
    const [state, formAction, isPending] = useActionState(boundAction, initialState);

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Dorm Fill Order & Capacity</h2>
            <p className="text-sm text-gray-500">
                Dorms fill in order, lowest number first. Adjust capacity or reorder as needed.
            </p>

            {state.errors.general && <p className="text-red-500">{state.errors.general}</p>}

            <div className="flex flex-col gap-3">
                {dorms.map((dorm) => (
                    <div key={dorm.id} className="flex-row items-center gap-3 border-b pb-3">
                        <input type="hidden" name="dormId" value={dorm.id} />
                        <span className="flex-1 font-medium">{dorm.name}</span>

                        <label className="flex flex-col text-xs">
                            Fill Order
                            <input
                                type="number"

                                name="assignmentOrder"
                                defaultValue={dorm.assignment_order ?? 0}
                                className="border rounded px-2 py-1 w-20"
                            />
                        </label>

                        <label className="flex flex-col text-xs">
                            Capacity
                            <input
                                type="number"
                                min="0"
                                name="capacity"
                                defaultValue={dorm.capacity}
                                className="border rounded px-2 py-1 w-20"
                            />
                        </label>
                    </div>
                ))}
            </div>

            {state.success && <p className="text-green-600">Settings updated!</p>}

            <div className="flex-row gap-3 mt-4">
                <button type="submit" disabled={isPending} className="primary-btn btn">
                    {isPending ? "Saving..." : "Save Changes"}
                </button>
                <button type="button" onClick={onClose} className="btn">
                    Close
                </button>
            </div>
        </form>
    );
}