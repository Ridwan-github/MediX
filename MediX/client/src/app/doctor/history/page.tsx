"use client";

import Header from "@/components/doctor/header";
import SubHeader from "@/components/doctor/subHeader";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";

type Prescriptions = {
  id: number;
  patientId: number;
  doctorId: number;
  prescriptionDate: string;
  chiefComplaint: string;
  onExamination: string;
  investigations: string;
  advice: string;
  medicines: Array<{
    id: number;
    medicineName: string;
    morningDose: number;
    afternoonDose: number;
    eveningDose: number;
    comment: string;
  }>;
  patientName: string;
  patientPhoneNumber: string;
};

export default function History() {
  const [prescriptions, setPrescriptions] = useState<Prescriptions[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // Get doctor ID from localStorage or use default
  const doctorId = 2501001; // You can get this from localStorage or context

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/prescriptions/doctor/${doctorId}/with-patient-details`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch prescriptions");
      }

      const result = await response.json();

      if (result.success) {
        setPrescriptions(result.data);
      } else {
        setError("Failed to load prescriptions");
      }
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load prescriptions"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePrescriptionClick = (prescription: Prescriptions) => {
    // Redirect to preview page with prescriptionId
    router.push(`/doctor/prescribe/preview?prescriptionId=${prescription.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        <Header />
        <SubHeader />
        <main className="flex-grow container mx-auto px-4 py-10">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
            <p className="text-lg text-gray-600">Loading prescriptions...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        <Header />
        <SubHeader />
        <main className="flex-grow container mx-auto px-4 py-10">
          <div className="text-center">
            <p className="text-lg text-red-600 mb-4">Error: {error}</p>
            <button
              onClick={fetchPrescriptions}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              Retry
            </button>
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
        {prescriptions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">No prescriptions found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-green-50/70 border border-green-200 rounded-2xl shadow-lg">
            <table className="min-w-full text-left text-gray-800 text-sm">
              <thead className="bg-green-200 text-green-900 text-base uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Patient ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Medicines</th>
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
                    <td className="px-6 py-4">
                      {prescription.prescriptionDate}
                    </td>
                    <td className="px-6 py-4">{prescription.patientId}</td>
                    <td className="px-6 py-4">{prescription.patientName}</td>
                    <td className="px-6 py-4">
                      {prescription.patientPhoneNumber}
                    </td>
                    <td className="px-6 py-4">
                      {prescription.medicines?.length || 0} medicine(s)
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handlePrescriptionClick(prescription)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow transform hover:scale-105"
                      >
                        View Prescription
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
