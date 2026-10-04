"use client";

import { useRef, useEffect, ReactNode } from "react";

export default function Modal({
    isOpen,
    onClose,
    children,
    className,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            className={`px-(--section-px) backdrop:bg-black/50 bg-transparent ${className}`}
        ><div className="rounded-lg p-6 bg-(--color-white) gap-y-3">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                >
                    ✕
                </button>
                {children}
            </div>

        </dialog>
    );
}