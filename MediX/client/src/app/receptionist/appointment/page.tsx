"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AppointmentPage() {
    const lowerNavBgColor = '#1F4604';
    const lowerNavTextColor = '#ffffff';

    const [patient, setPatient] = useState({
        name: '',
        age: '',
        doctor: '',
        appointmentDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatient((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Patient Info Submitted:", patient);
        // You can call an API here to save patient

        // For now, just clear the form after submission
        clearForm();
    };

    const clearForm = () => {
        setPatient({
            name: '',
            age: '',
            doctor: '',
            appointmentDate: '',
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <div style={{ backgroundColor: lowerNavBgColor, color: lowerNavTextColor }} className="p-4 justify-center text-center flex items-center text-2xl">
                    <Link href="/receptionist/appointment" className={usePathname() === "/receptionist/appointment" ? "text-white w-0 flex-1" : "text-black w-0 flex-1"}>Add Appointment</Link>
                    <span> | </span>
                    <Link href="/receptionist/appointment/doctor" className={usePathname() === "/receptionist/appointment/doctor" ? "text-white w-0 flex-1" : "text-black w-0 flex-1"}>Doctor</Link>
                    <span> | </span>
                    <Link href="/receptionist/appointment/list" className={usePathname() === "/receptionist/appointment/list" ? "text-white w-0 flex-1" : "text-black w-0 flex-1"}>Appointment List</Link>
                </div>

                <div className="justify-center text-center mt-10 mb-10">
                    <h1 className="text-3xl font-bold">Patient Info</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4 justify-between space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            value={patient.name}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded"
                            style={{ width: '300px' }}
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            required
                            value={patient.age}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded"
                            style={{ width: '300px' }}
                        />
                        <input
                            type="search"
                            name="doctor"
                            placeholder="Doctor"
                            required
                            value={patient.doctor}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded"
                            style={{ width: '300px' }}
                        />
                        <input
                            type="date"
                            name="appointmentDate"
                            required
                            value={patient.appointmentDate}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded"
                            style={{ width: '300px' }}
                        />
                        <div className="flex justify-center w-half max-w-md space-x-8" style={{ width: '300px' }}>
                            <button
                                type="submit"
                                className="bg-green-500 text-black p-2 rounded transition-colors duration-200 hover:bg-blue-700 hover:text-white"
                            >
                                Add Patient
                            </button>
                            <button
                                type="button"
                                onClick={clearForm}
                                className="bg-red-500 text-white p-2 rounded transition-colors duration-200 hover:bg-red-700 hover:text-white"
                                style={{ width: '110px' }}
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
