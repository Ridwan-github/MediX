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
  const [clickedView, setClickedView] = useState<number | null>(null);

  const handlePrescriptionClick = (prescription: Prescriptions) => {
    // Trigger button press animation
    setClickedView(prescription.id);
    setTimeout(() => setClickedView(null), 150); // Reset animation

    setSelectedPrescription(prescription);
    setShowHistory(true);
  };

  const handleCloseHistory = () => {
    setShowHistory(false);
    setSelectedPrescription(null);
  };

  if (showHistory && selectedPrescription) {
    return (
      <div className="min-h-screen bg-transparent text-white flex flex-col">
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
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />
      <SubHeader />
      <main className="flex-grow container mx-auto px-4 py-10">
        {showHistory && selectedPrescription ? (
          <>
            <h1 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-teal-500 to-green-700">
              Prescription History
            </h1>
            <div className="bg-green-100/60 border border-green-300 rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
              <p className="text-xl text-green-700 mb-2">
                <strong>Patient:</strong> {selectedPrescription.patientName}
              </p>
              <p className="text-lg text-green-800">
                <strong>Date:</strong> {selectedPrescription.date}
              </p>
              <p className="text-lg text-green-800">
                <strong>Patient ID:</strong> {selectedPrescription.patientId}
              </p>
              <p className="text-lg text-green-800 mb-6">
                <strong>Phone:</strong> {selectedPrescription.patientPhone}
              </p>
              <p className="text-sm text-green-600 italic mb-6">
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
          </>
        ) : (
          <div className="overflow-x-auto bg-green-50/70 border border-green-200 rounded-2xl shadow-lg">
            <table className="min-w-full text-left text-gray-800 text-sm">
              <thead className="bg-green-200 text-green-900 text-base uppercase tracking-wide">
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
                    className={`border-t border-green-300 hover:bg-green-200 transition duration-150 ${
                      i % 2 === 1 ? "bg-green-100/50" : ""
                    }`}
                  >
                    <td className="px-6 py-4">{prescription.date}</td>
                    <td className="px-6 py-4">{prescription.patientId}</td>
                    <td className="px-6 py-4">{prescription.patientName}</td>
                    <td className="px-6 py-4">{prescription.patientPhone}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handlePrescriptionClick(prescription)}
                        aria-pressed={clickedView === prescription.id}
                        className={`bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow transform ${
                          clickedView === prescription.id
                            ? "scale-95"
                            : "scale-100"
                        }`}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
