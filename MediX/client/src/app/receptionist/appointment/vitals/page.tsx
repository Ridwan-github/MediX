"use client";

import React, { useState } from "react";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mockPatients = [
  {
    id: 1,
    name: "John Doe",
    contact: "1234567890",
    doctor: "Dr. Smith",
    appointmentDate: "2025-06-03",
  },
  {
    id: 2,
    name: "Jane Smith",
    contact: "9876543210",
    doctor: "Dr. Adams",
    appointmentDate: "2025-06-04",
  },
  {
    id: 3,
    name: "Alice Johnson",
    contact: "1122334455",
    doctor: "Dr. Brown",
    appointmentDate: "2025-06-05",
  },
];

export default function VitalsPage() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [vitals, setVitals] = useState({
    age: "",
    height: "",
    weight: "",
    pressure: "",
    temperature: "",
    allergies: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVitals((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Vitals submitted for:", selectedPatient.name, vitals);
    // TODO: Send to backend here
    alert(`Vitals saved for ${selectedPatient.name}`);
    clearForm();
    setSelectedPatient(null);
  };

  const clearForm = () => {
    setVitals({
      age: "",
      height: "",
      weight: "",
      pressure: "",
      temperature: "",
      allergies: "",
    });
  };

  const [search, setSearch] = useState("");

  const filteredAppointments = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.contact.includes(search) ||
      patient.doctor.toLowerCase().includes(search.toLowerCase()) ||
      patient.appointmentDate.includes(search)
  );

  const lowerNavBgColor = "#1F4604";
  const lowerNavTextColor = "#ffffff";

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div
        style={{ backgroundColor: lowerNavBgColor, color: lowerNavTextColor }}
        className="p-4 justify-center text-center flex items-center text-2xl"
      >
        <Link
          href="/receptionist/appointment"
          className={
            usePathname() === "/receptionist/appointment"
              ? "text-white w-0 flex-1"
              : "text-black w-0 flex-1"
          }
        >
          Add Appointment
        </Link>
        <span> | </span>
        <Link
          href="/receptionist/appointment/doctor"
          className={
            usePathname() === "/receptionist/appointment/doctor"
              ? "text-white w-0 flex-1"
              : "text-black w-0 flex-1"
          }
        >
          Doctor
        </Link>
        <span> | </span>
        <Link
          href="/receptionist/appointment/vitals"
          className={
            usePathname() === "/receptionist/appointment/vitals"
              ? "text-white w-0 flex-1"
              : "text-black w-0 flex-1"
          }
        >
          Vitals Entry
        </Link>
        <span> | </span>
        <Link
          href="/receptionist/appointment/list"
          className={
            usePathname() === "/receptionist/appointment/list"
              ? "text-white w-0 flex-1"
              : "text-black w-0 flex-1"
          }
        >
          Appointment List
        </Link>
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
          <button className="bg-green-700 text-white px-4 py-2 mt-6 rounded hover:bg-green-900">
            SEARCH
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">
          Select a Patient to Enter Vitals
        </h1>

        <table className="w-full  border border-gray-300 rounded-lg shadow-md text-center justify-center">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Doctor</th>
              <th className="p-2 border">Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((patient) => (
              <tr
                key={patient.id}
                className="hover:bg-gray-900 cursor-pointer"
                onClick={() => setSelectedPatient(patient)}
              >
                <td className="p-2 border">{patient.name}</td>
                <td className="p-2 border">{patient.contact}</td>
                <td className="p-2 border">{patient.doctor}</td>
                <td className="p-2 border">{patient.appointmentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPatient && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className=" p-6 rounded-lg w-full max-w-md shadow-lg bg-gray-900 text-white">
            <h2 className="text-xl font-bold mb-4 text-center">
              Enter Vitals for {selectedPatient.name}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {[
                "age",
                "height",
                "weight",
                "pressure",
                "temperature",
                "allergies",
              ].map((field) => (
                <input
                  key={field}
                  type={
                    ["age", "height", "weight"].includes(field)
                      ? "number"
                      : "text"
                  }
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={(vitals as any)[field]}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded"
                />
              ))}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearForm();
                    setSelectedPatient(null);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
