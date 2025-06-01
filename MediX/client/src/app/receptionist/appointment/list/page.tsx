"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type Appointment = {
    patientId: string;
    patientName: string;
    patientPhone: string;
    doctorName: string;
    serialNumber: string;
    time: string;
    age: string;
    height: string;
    weight: string;
    pressure: string;
};

const mockAppointments: Appointment[] = [
    {
        patientId: "P001",
        patientName: "John Doe",
        patientPhone: "0123456789",
        doctorName: "Dr. Smith",
        serialNumber: "S001",
        time: "10:00 AM",
        age: "30",
        height: "5'9\"",
        weight: "70 kg",
        pressure: "120/80"
    },
    {
        patientId: "P002",
        patientName: "Jane Doe",
        patientPhone: "0987654321",
        doctorName: "Dr. Jones",
        serialNumber: "S002",
        time: "11:00 AM",
        age: "25",
        height: "5'6\"",
        weight: "60 kg",
        pressure: "110/70"
    },
];

export default function AppointmentPage() {
    const lowerNavBgColor = '#1F4604';
    const lowerNavTextColor = '#ffffff';

    const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
    const [search, setSearch] = useState("");

    const filteredAppointments = appointments.filter(appointment =>
        appointment.patientName.toLowerCase().includes(search.toLowerCase())
    );

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
                <div className="p-10">
                    <div className="flex justify-center mb-8 space-x-4 items-center">
                        <div>
                            <label className="text-white-800 font-semibold">Search</label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="border border-white-600 rounded px-4 py-2 w-96 block"
                            />
                        </div>
                        <div>
                            <label className="text-white-800 font-semibold">Filter</label>
                            <select className="border border-white-600 rounded px-4 py-2 w-96 block">
                                <option value="patientId" className="text-black">Patient ID</option>
                                <option value="patientName" className="text-black">Patient Name</option>
                                <option value="doctorName" className="text-black">Doctor Name</option>
                                <option value="time" className="text-black">Time</option>
                            </select>
                        </div>
                        <button className="bg-green-700 text-white px-4 py-2 mt-6 rounded hover:bg-green-900">
                            SEARCH
                        </button>
                    </div>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-green-900 text-white text-xl">
                                <th className="p-4 border">Patient ID</th>
                                <th className="p-4 border">Patient Name</th>
                                <th className="p-4 border">Phone</th>
                                <th className="p-4 border">Doctor Name</th>
                                <th className="p-4 border">Serial Number</th>
                                <th className="p-4 border">Time</th>
                                <th className="p-4 border">Age</th>
                                <th className="p-4 border">Height</th>
                                <th className="p-4 border">Weight</th>
                                <th className="p-4 border">Pressure</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map((appointment, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="p-4 border">{appointment.patientId}</td>
                                    <td className="p-4 border">{appointment.patientName}</td>
                                    <td className="p-4 border">{appointment.patientPhone}</td>
                                    <td className="p-4 border">{appointment.doctorName}</td>
                                    <td className="p-4 border">{appointment.serialNumber}</td>
                                    <td className="p-4 border">{appointment.time}</td>
                                    <td className="p-4 border">{appointment.age}</td>
                                    <td className="p-4 border">{appointment.height}</td>
                                    <td className="p-4 border">{appointment.weight}</td>
                                    <td className="p-4 border">{appointment.pressure}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </main>
            <Footer />
        </div>
    );
}