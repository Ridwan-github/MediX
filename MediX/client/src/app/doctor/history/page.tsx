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
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-4xl font-extrabold text-center text-white mb-8">
            Prescription History for {selectedPrescription.patientName}
          </h1>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-6 shadow-inner">
            <p className="text-lg text-gray-300">
              Date: {selectedPrescription.date}
            </p>
            <p className="text-lg text-gray-300">
              Patient ID: {selectedPrescription.patientId}
            </p>
            <p className="text-lg text-gray-300">
              Phone: {selectedPrescription.patientPhone}
            </p>
            {/* Future implementation of prescription details goes here */}
            <button
              onClick={handleCloseHistory}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg"
            >
              Close History
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Default view when no prescription is selected

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <SubHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          Patient History
        </h1>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Recent Prescriptions
          </h2>
          <table className="min-w-full bg-gray-900 text-gray-300 rounded-lg shadow-lg text-center">
            <thead>
              <tr className="bg-gray-800 text-gray-300 font-bold text-xl">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Patient ID</th>
                <th className="px-4 py-2">Patient Name</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription) => (
                <tr
                  key={prescription.id}
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="px-4 py-2">{prescription.date}</td>
                  <td className="px-4 py-2">{prescription.patientId}</td>
                  <td className="px-4 py-2">{prescription.patientName}</td>
                  <td className="px-4 py-2">{prescription.patientPhone}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handlePrescriptionClick(prescription)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg"
                    >
                      View History
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
