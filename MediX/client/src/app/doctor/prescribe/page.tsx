"use client";
import Header from "@/components/doctor/header";
import SubHeader from "@/components/doctor/subHeader";
import Footer from "@/components/footer";
import Prescription1 from "@/components/doctor/prescription1";
import Prescription2 from "@/components/doctor/prescription2";
import Prescription3 from "@/components/doctor/prescription3";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export interface DoctorPageProps {
  searchParams: { email?: string };
}

export default function Prescribe() {
  const [showHistory, setShowHistory] = useState(false);
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    // If we have email in URL, store it
    const urlEmail = searchParams?.get("email");

    if (urlEmail) {
      localStorage.setItem("email", urlEmail);
      setEmail(urlEmail);
    } else {
      // Otherwise, fallback to whatever's in localStorage
      const stored = localStorage.getItem("email") || "";
      setEmail(stored);
    }
  }, [searchParams]);

  const mockHistory = [
    {
      id: 1,
      date: "2024-12-01",
      notes: "Prescribed Amoxicillin 500mg for 7 days. Advised rest.",
    },
    {
      id: 2,
      date: "2024-11-15",
      notes: "Follow-up visit. Condition improving. Reduced dosage.",
    },
    {
      id: 3,
      date: "2024-11-01",
      notes: "Initial consultation. Diagnosed with throat infection.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <SubHeader />

      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* Clipboard Section */}
          <div className="relative w-full max-w-4xl mx-auto md:mx-0">
            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1e1e1e] border border-gray-700 rounded-3xl shadow-2xl p-6 sm:p-8">
              <div className="bg-white text-black rounded-2xl p-6 sm:p-8 shadow-inner">
                {email === "akhtaruzzaman@gmail.com" ? (
                  <Prescription1 />
                ) : email === "khosruzzaman@gmail.com" ? (
                  <Prescription2 />
                ) : (
                  <Prescription3 />
                )}
              </div>
            </div>
          </div>

          {/* History Toggle Section */}
          <div className="w-full md:w-[300px] flex flex-col justify-start items-center text-center">
            <button
              onClick={() => setShowHistory((prev) => !prev)}
              className="bg-gradient-to-br from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-bold px-6 py-4 rounded-2xl text-lg shadow-md transition-all duration-300"
            >
              {showHistory ? "Hide History" : "Show History"}
            </button>

            {showHistory && (
              <div className="mt-6 w-full bg-gray-900 border border-gray-700 rounded-2xl p-4 space-y-4 shadow-lg">
                <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 text-blue-400">
                  Prescription History
                </h2>
                {mockHistory.map((entry) => (
                  <div
                    key={entry.id}
                    className="border-l-4 border-blue-500 pl-4 text-left"
                  >
                    <p className="text-sm text-gray-400">{entry.date}</p>
                    <p className="text-gray-200">{entry.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition duration-200">
            Finalize and Lock
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition duration-200">
            Save and Continue
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
