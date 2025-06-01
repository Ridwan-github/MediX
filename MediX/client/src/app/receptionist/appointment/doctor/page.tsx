"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type Doctor = {
        name: string;
        specialization: string;
        degree: string;
        contact: string;
        available: boolean;
    };

    const mockDoctors: Doctor[] = [
    {
        name: "Mahadi",
        specialization: "Medicine",
        degree: "MBBS",
        contact: "01305070854",
        available: true,
    },
    {
        name: "Sakib",
        specialization: "Cardiology",
        degree: "MBBS, MD",
        contact: "01305070854",
        available: true,
    },
    {
        name: "Rafiq",
        specialization: "Neurology",
        degree: "MBBS, MD",
        contact: "01305070854",
        available: true,
    },
    {
        name: "Tania",
        specialization: "Pediatrics",
        degree: "MBBS, MD",
        contact: "01305070854",
        available: false,
    },
    // Add more mock doctors as needed
];

export default function AppointmentPage() {
    const lowerNavBgColor = '#1F4604';
    const lowerNavTextColor = '#ffffff';

    const [search, setSearch] = useState("");
    const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(search.toLowerCase())
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
      <div className="flex justify-center items-center space-x-4 mb-8">
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
            <option value="name" className="text-black">Name</option>
            <option value="specialization" className="text-black">Specialization</option>
            <option value="degree" className="text-black">Degree</option>
            <option value="availability" className="text-black">Availability</option>
          </select>
        </div>
        <button className="bg-green-700 text-white px-4 py-2 mt-6 rounded hover:bg-green-900">
          SEARCH
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-900 text-white text-xl">
            <th className="p-4 border">Doctor</th>
            <th className="p-4 border">Specification</th>
            <th className="p-4 border">Degree</th>
            <th className="p-4 border">Contact Number</th>
            <th className="p-4 border">Availability</th>
            {/* <th className="p-4 border bg-purple-800">Appointment</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doc, idx) => (
            <tr key={idx} className="text-center text-lg font-semibold">
              <td className="p-4 border">{doc.name}</td>
              <td className="p-4 border">{doc.specialization}</td>
              <td className="p-4 border">{doc.degree}</td>
              <td className="p-4 border">{doc.contact}</td>
              <td className="p-4 border">{doc.available ? "Yes" : "No"}</td>
              {/* <td className="p-4 border"> */}
                {/* Add Appointment Button or Link here */}
                {/* <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-900">
                  Book
                </button>
              </td> */}
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