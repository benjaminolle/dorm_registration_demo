// components/dorm-settings-button.tsx
"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import DormSettingsForm from "@/features/projects/components/DormSettingsForm";

type Dorm = { id: number; name: string; capacity: number; assignment_order?: number };

export default function DormSettingsButton({ projectId, dorms }: { projectId: number; dorms: Dorm[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="secondary-btn btn">
                Adjust Dorms
            </button>

            <Modal className="w-full max-w-[700px] fixed inset-0 m-auto " isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <DormSettingsForm projectId={projectId} dorms={dorms} onClose={() => setIsOpen(false)} />
            </Modal>
        </>
    );
}