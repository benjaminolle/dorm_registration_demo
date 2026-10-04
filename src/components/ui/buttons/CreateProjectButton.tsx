// components/create-project-button.tsx
"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import NewProjectForm from "@/features/projects/components/NewProjectForm";

export default function CreateProjectButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="primary-btn btn" onClick={() => setIsOpen(true)}>+ New Project</button>

            <Modal className="w-full max-w-[500px] fixed inset-0 m-auto" isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2 className="text-(length:--fs-base)">Create a Project</h2>
                <NewProjectForm />
            </Modal>
        </>
    );
}