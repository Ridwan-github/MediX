"use client";

import Header from "@/components/doctor/header";
import SubHeader from "@/components/doctor/subHeader";
import Footer from "@/components/footer";
import { useState } from "react";
import React from "react";

type Prescriptions = {
  id: number;
  date: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
};

export default function History() {
  const [prescriptions, setPrescriptions] = useState<Prescriptions[]>([
    {
      id: 1,
      date: "2024-12-01",
      patientId: "P12345",
      patientName: "John Doe",
      patientPhone: "+8801234567890",
    },
    {
      id: 2,
      date: "2024-11-15",
      patientId: "P67890",
      patientName: "Jane Smith",
      patientPhone: "+8800987654321",
    },
    {
      id: 3,
      date: "2024-10-20",
      patientId: "P54321",
      patientName: "Alice Johnson",
      patientPhone: "+8801122334455",
    },
    {
      id: 4,
      date: "2024-09-05",
      patientId: "P98765",
      patientName: "Bob Brown",
      patientPhone: "+8805566778899",
    },
  ]);

  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescriptions | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const handlePrescriptionClick = (prescription: Prescriptions) => {
    setSelectedPrescription(prescription);
    setShowHistory(true);
  };

  const handleCloseHistory = () => {
    setShowHistory(false);
    setSelectedPrescription(null);
  };

  if (showHistory && selectedPrescription) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <SubHeader />
        <main className="flex-grow container mx-auto px-4 py-10">
          <h1 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-400">
            Prescription History
          </h1>
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl max-w-3xl mx-auto">
            <p className="text-xl text-teal-300 mb-2">
              <strong>Patient:</strong> {selectedPrescription.patientName}
            </p>
            <p className="text-lg text-gray-300">
              <strong>Date:</strong> {selectedPrescription.date}
            </p>
            <p className="text-lg text-gray-300">
              <strong>Patient ID:</strong> {selectedPrescription.patientId}
            </p>
            <p className="text-lg text-gray-300 mb-6">
              <strong>Phone:</strong> {selectedPrescription.patientPhone}
            </p>
            {/* Prescription content placeholder */}
            <p className="text-sm text-gray-400 italic mb-6">
              (Prescription details will appear here in future implementation)
            </p>

            <div className="text-center">
              <button
                onClick={handleCloseHistory}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-md transition duration-200"
              >
                Close History
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <SubHeader />
      <main className="flex-grow container mx-auto px-4 py-10">
        {/* <h1 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-400">
          Patient History
        </h1> */}

        <div className="overflow-x-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-700">
          <table className="min-w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-800 text-gray-300 text-base uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Patient ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription, i) => (
                <tr
                  key={prescription.id}
                  className={`border-t border-gray-700 hover:bg-blue-900 transition duration-150 ${
                    i % 2 === 1 ? "bg-gray-800" : ""
                  }`}
                >
                  <td className="px-6 py-4">{prescription.date}</td>
                  <td className="px-6 py-4">{prescription.patientId}</td>
                  <td className="px-6 py-4">{prescription.patientName}</td>
                  <td className="px-6 py-4">{prescription.patientPhone}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handlePrescriptionClick(prescription)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow"
                    >
                      View
                    </button>
                  </td>
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
