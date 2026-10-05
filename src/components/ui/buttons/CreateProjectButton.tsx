// components/create-project-button.tsx
"use client";

import { useCallback, useState } from "react";
import Modal from "@/components/ui/Modal";
import NewProjectForm from "@/features/projects/components/NewProjectForm";

export default function CreateProjectButton() {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = useCallback(() => setIsOpen(false), []);

    return (
        <>
            <button className="primary-btn btn" onClick={() => setIsOpen(true)}>+ New Project</button>

            <Modal className="w-full max-w-[500px] fixed inset-0 m-auto" isOpen={isOpen} onClose={closeModal}>
                <h2 className="text-(length:--fs-base)">Create a Project</h2>
                <NewProjectForm onSuccess={closeModal} />
            </Modal>
        </>
    );
}