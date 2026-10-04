"use client";

import { useActionState, useRef, useState } from "react";
import { createStudent, FormState } from "@/features/projects/actions/students";

export default function RegisterStudentForm({ projectId }: { projectId: number }) {
    const formRef = useRef<HTMLFormElement>(null);
    const [showForm, setShowForm] = useState(true);
    const [showGuardian2, setShowGuardian2] = useState(false);

    const initialState: FormState = { errors: {}, values: {}, success: false };

    const bindAction = createStudent.bind(null, projectId);
    const [state, formAction, isPending] = useActionState(bindAction, initialState);

    if (!showForm) {
        return (
            <div className="border rounded p-6 flex flex-col items-center gap-3">
                <p className="text-green-600 text-lg">✓ Student registered successfully!</p>
                <button onClick={() => setShowForm(true)} className="primary-btn btn">+ Register Another Student</button>
            </div>
        );
    }

    return (
        <form ref={formRef} className="flex flex-col gap-3" action={formAction}>
            {state.errors.general && <p className="text-red-500">{state.errors.general}</p>}

            <div className="form-group">
                <label htmlFor="admissionNo">Admission Number</label>
                <input id="admissionNo" name="admissionNo" type="text" className={`${state.errors.admissionNo ? "border-red-500" : ""}`} defaultValue={state.values?.admissionNo} placeholder="Admission Number" autoComplete="off" />
                {state.errors.admissionNo && <p className="text-red-500">{state.errors.admissionNo}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" name="fullName" required type="text" className={`${state.errors.fullName ? "border-red-500" : ""}`} defaultValue={state.values?.fullName} placeholder="Full Name*" autoComplete="off" />
                {state.errors.fullName && <p className="text-red-500">{state.errors.fullName}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input id="dob" name="dob" required type="date" className={`${state.errors.dob ? "border-red-500" : ""}`} defaultValue={state.values?.dob} autoComplete="off" />
                {state.errors.dob && <p className="text-red-500">{state.errors.dob}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="program">Program / Course</label>
                <input id="program" name="program" required type="text" className={`${state.errors.program ? "border-red-500" : ""}`} defaultValue={state.values?.program} placeholder="Enter Program / Course*" autoComplete="off" />
                {state.errors.program && <p className="text-red-500">{state.errors.program}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input id="address" name="address" required type="text" className={`${state.errors.address ? "border-red-500" : ""}`} defaultValue={state.values?.address} placeholder="Address*" autoComplete="off" />
                {state.errors.address && <p className="text-red-500">{state.errors.address}</p>}
            </div>


            <fieldset className="border border-gray-300 pt-7 pb-8 px-4 flex flex-col my-6 rounded-lg">
                <legend>Guardian 1</legend>
                <div className="form-group">
                    <label htmlFor="guardianName">Guardian Name</label>
                    <input id="guardianName" name="guardianName" required type="text" className={`${state.errors.guardianName ? "border-red-500" : ""}`} defaultValue={state.values?.guardianName} placeholder="Guardian Name*" autoComplete="off" />
                    {state.errors.guardianName && <p className="text-red-500">{state.errors.guardianName}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="guardianPhone">Guardian Phone</label>
                    <input id="guardianPhone" name="guardianPhone" required type="tel" className={`${state.errors.guardianPhone ? "border-red-500" : ""}`} defaultValue={state.values?.guardianPhone} placeholder="Guardian Phone*" autoComplete="off" />
                    {state.errors.guardianPhone && <p className="text-red-500">{state.errors.guardianPhone}</p>}
                </div>


                <div className="form-group">
                    <label htmlFor="guardianOccupation">Guardian Occupation</label>
                    <input id="guardianOccupation" name="guardianOccupation" required type="text" className={`${state.errors.guardianOccupation ? "border-red-500" : ""}`} defaultValue={state.values?.guardianOccupation} placeholder="Guardian Occupation*" autoComplete="off" />
                    {state.errors.guardianOccupation && <p className="text-red-500">{state.errors.guardianOccupation}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="guardianRelation">Guardian Relation</label>
                    <input id="guardianRelation" name="guardianRelation" required type="text" className={`${state.errors.guardianRelation ? "border-red-500" : ""}`} defaultValue={state.values?.guardianRelation} placeholder="e.g. Mother, Father, Uncle*" autoComplete="on" />
                    {state.errors.guardianRelation && <p className="text-red-500">{state.errors.guardianRelation}</p>}
                </div>

            </fieldset>

            {showGuardian2 ? (
                <fieldset className="border pt-7 rounded-lg pb-10 px-8 flex flex-col my-6">
                    <legend>Guardian 2</legend>

                    <div className="form-group">
                        <label htmlFor="guardian2Name">Guardian 2 Name</label>
                        <input id="guardian2Name" name="guardian2Name" type="text" className={`${state.errors.guardian2Name ? "border-red-500" : ""}`} defaultValue={state.values?.guardian2Name} placeholder="Guardian 2 Name" autoComplete="off" />
                        {state.errors.guardian2Name && <p className="text-red-500">{state.errors.guardian2Name}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="guardian2Phone">Guardian 2 Phone</label>
                        <input id="guardian2Phone" name="guardian2Phone" type="tel" className={`${state.errors.guardian2Phone ? "border-red-500" : ""}`} defaultValue={state.values?.guardian2Phone} placeholder="Guardian 2 Phone" autoComplete="off" />
                        {state.errors.guardian2Phone && <p className="text-red-500">{state.errors.guardian2Phone}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="guardian2Occupation">Guardian 2 Occupation</label>
                        <input id="guardian2Occupation" name="guardian2Occupation" type="text" className={`${state.errors.guardian2Occupation ? "border-red-500" : ""}`} defaultValue={state.values?.guardian2Occupation} placeholder="Guardian 2 Occupation" autoComplete="off" />
                        {state.errors.guardian2Occupation && <p className="text-red-500">{state.errors.guardian2Occupation}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="guardian2Relation">Guardian 2 Relation</label>
                        <input id="guardian2Relation" name="guardian2Relation" type="text" className={`${state.errors.guardian2Relation ? "border-red-500" : ""}`} defaultValue={state.values?.guardian2Relation} placeholder="e.g. Mother, Father, Uncle" autoComplete="on" />
                        {state.errors.guardian2Relation && <p className="text-red-500">{state.errors.guardian2Relation}</p>}
                    </div>

                    <div className="form-group">
                        <button
                            type="button"
                            onClick={() => setShowGuardian2(false)}
                            className="primary-btn btn text-sm self-start mt-2"
                        >
                            Remove Guardian 2
                        </button>
                    </div>

                </fieldset>
            ) : (
                <div className="form-group -mt-2 mb-2">
                    <button
                        type="button"
                        onClick={() => setShowGuardian2(true)}
                        className="secondary-btn btn self-start"
                    >
                        + Add another guardian
                    </button>
                </div>

            )}

            <div className="form-group">
                <label htmlFor="interests">Student&apos;s Interests</label>
                <textarea id="interests" name="interests" className="border-b min-h-[80] focus:outline-none placeholder:text-gray-600" defaultValue={state.values?.interests} placeholder="Student's interests" autoComplete="off" />
                {state.errors.interests && <p className="text-red-500">{state.errors.interests}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="medCondition">Medical Conditions</label>
                <textarea id="medCondition" name="medCondition" className="border-b min-h-[80] focus:outline-none placeholder:text-gray-600" defaultValue={state.values?.medCondition} placeholder="Any medical conditions to note" autoComplete="off" />
                {state.errors.medCondition && <p className="text-red-500">{state.errors.medCondition}</p>}
            </div>

            <label className="flex items-center gap-3 mt-7 items-start">
                <input id="declaration" name="declaration" type="checkbox" />
                I, the undersigned, declare that the information provided above is accurate to the best of my knowledge. I also commit to ensuring that my ward abides by the rules and regulations of the boarding house and maintains good behaviour at all times.
            </label>
            {state.errors.declaration && <p className="text-red-500">{state.errors.declaration}</p>}

            <div className="form-group mt-5">
                <button type="submit" disabled={isPending} className="primary-btn btn disabled:opacity-75 disabled:cursor-default w-fit ">
                    {isPending ? "Registering..." : "Register Student"}
                </button>
            </div>


        </form>
    )
}