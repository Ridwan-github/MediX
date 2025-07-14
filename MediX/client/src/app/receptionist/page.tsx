"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";

export default function ReceptionistPage() {
  const [numberOfPatients, setNumberOfPatients] = useState(0);
  const [vitalsToEntry, setVitalsToEntry] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:8080/api/appointments/with-details");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const today = new Date().toISOString().slice(0, 10);
        let patientsToday = 0;
        let vitalsCount = 0;
        for (const appt of data) {
          if (appt.appointmentDate === today) patientsToday++;
          if (appt.status === "NOT_READY") vitalsCount++;
        }
        setNumberOfPatients(patientsToday);
        setVitalsToEntry(vitalsCount);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-grow p-6 sm:p-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-center text-green-700 drop-shadow-sm">
            My Dashboard
          </h1>

          {error && (
            <div className="text-center text-red-600 mb-4">{error}</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            <div
              className="bg-white rounded-3xl p-8 text-center shadow-[inset_2px_2px_4px_#c2d0c8,inset_-2px_-2px_4px_#ffffff] hover:shadow-[inset_4px_4px_6px_#cfd4db,inset_-4px_-4px_6px_#ffffff] transition-shadow duration-100 ease-in-out"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                Patients Added Today
              </h2>
              <p className="text-4xl font-bold text-blue-600">
                {loading ? "..." : numberOfPatients}
              </p>
            </div>
            <div
              className="bg-white rounded-3xl p-8 text-center shadow-[inset_2px_2px_4px_#c2d0c8,inset_-2px_-2px_4px_#ffffff] hover:shadow-[inset_4px_4px_6px_#cfd4db,inset_-4px_-4px_6px_#ffffff] transition-shadow duration-100 ease-in-out"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                Vitals to entry
              </h2>
              <p className="text-4xl font-bold text-red-600">
                {loading ? "..." : vitalsToEntry}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
