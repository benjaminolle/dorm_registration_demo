// components/create-project-button.tsx
"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import NewDormForm from "@/features/projects/components/NewDormForm";

export default function CreateDormButton({ projectId }: { projectId: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="primary-btn btn" onClick={() => setIsOpen(true)}>+ New Dorm</button>

            <Modal className="w-full max-w-[500px] fixed inset-0 m-auto " isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2 className="text-(length:--fs-base) mb-4">Create a Dorm for this Project</h2>

                <NewDormForm projectId={projectId} />
            </Modal>
        </>
    );
}