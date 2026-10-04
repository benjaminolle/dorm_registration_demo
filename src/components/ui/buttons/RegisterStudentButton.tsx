"use client";
import Link from "next/link";

export default function RegisterStudentButton({ href }: { href: string }) {

    return <Link className="primary-btn btn" href={href}>+ Add Student</Link >
}