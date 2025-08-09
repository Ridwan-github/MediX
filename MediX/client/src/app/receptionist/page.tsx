"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReceptionistPage() {
  const [pendingRequests, setPendingRequests] = useState(0);
  const [vitalsToEntry, setVitalsToEntry] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const receptionistId = localStorage.getItem("receptionistId");
    if (!receptionistId || receptionistId.trim() === "") {
      router.push("/");
      return;
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "http://localhost:8080/api/appointments/with-details"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const today = new Date().toISOString().slice(0, 10);
        let requestsCount = 0;
        let vitalsCount = 0;
        for (const appt of data) {
          if (appt.status === "REQUESTED") requestsCount++;
          if (appt.status === "NOT_READY" && appt.appointmentDate >= today)
            vitalsCount++;
        }
        setPendingRequests(requestsCount);
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
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 mt-0">
          <div className="bg-green-100/60 backdrop-blur-sm rounded-2xl shadow-sm py-5 px-6 text-center border border-green-300 mb-10">
            <h1 className="text-green-900 text-3xl sm:text-4xl font-semibold tracking-wide">
              My Dashboard
            </h1>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="text-center text-red-600 mb-4">{error}</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            <div className="bg-white rounded-3xl p-8 text-center shadow-[inset_2px_2px_4px_#c2d0c8,inset_-2px_-2px_4px_#ffffff] hover:shadow-[inset_4px_4px_6px_#cfd4db,inset_-4px_-4px_6px_#ffffff] transition-shadow duration-100 ease-in-out">
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                Pending Appointment Requests
              </h2>
              <div
                className={`text-4xl font-bold ${
                  pendingRequests === 0 ? "text-blue-600" : "text-red-600"
                }`}
              >
                {loading ? (
                  <div className="inline-flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  </div>
                ) : (
                  pendingRequests
                )}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-[inset_2px_2px_4px_#c2d0c8,inset_-2px_-2px_4px_#ffffff] hover:shadow-[inset_4px_4px_6px_#cfd4db,inset_-4px_-4px_6px_#ffffff] transition-shadow duration-100 ease-in-out">
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                Vitals to entry
              </h2>
              <div
                className={`text-4xl font-bold ${
                  vitalsToEntry === 0 ? "text-blue-600" : "text-red-600"
                }`}
              >
                {loading ? (
                  <div className="inline-flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  </div>
                ) : (
                  vitalsToEntry
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
