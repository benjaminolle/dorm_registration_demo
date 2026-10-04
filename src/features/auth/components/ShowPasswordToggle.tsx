"use client";
import EyeIcon from "@/assets/eye.svg";
import EyeClosedIcon from "@/assets/eye-closed.svg";

export default function ShowPasswordToggle({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={`absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center ${visible ? "" : "opacity-60 hover:opacity-100 "}transition-all duration-300`}
            aria-label={visible ? "Hide password" : "Show password"}
            tabIndex={-1}
        >
            {visible ? <EyeClosedIcon className="w-[20px]" /> : <EyeIcon className="w-[20px]" />}
        </button>
    );
}
