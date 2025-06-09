"use client";
import Header from "@/components/doctor/header";
import SubHeader from "@/components/doctor/subHeader";
import Footer from "@/components/footer";
import Prescription from "@/components/doctor/prescription";
import { useState } from "react";

export default function Prescribe() {
  const [showHistory, setShowHistory] = useState(false);

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

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          Prescription Preview
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-start gap-6">
          {/* Clipboard – keep original size and styling */}
          <div className="relative w-full max-w-4xl mx-auto md:mx-0">
            <div className="bg-gradient-to-br from-[#3b2f26] to-[#2a1e14] border-4 border-[#5a4333] rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
              <div className="bg-white text-black rounded-lg p-4 sm:p-6">
                <Prescription />
              </div>
            </div>
          </div>

          {/* History section */}
          <div className="w-full md:w-[300px] flex flex-col justify-center items-center text-center">
            <button
              onClick={() => setShowHistory((prev) => !prev)}
              className="bg-gradient-to-br from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold px-6 py-4 rounded-2xl text-lg shadow-lg transition-all duration-300"
            >
              {showHistory ? "Hide History" : "Show History"}
            </button>

            {showHistory && (
              <div className="mt-6 w-full bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-4 shadow-inner">
                <h2 className="text-xl font-semibold border-b border-gray-600 pb-2">
                  Prescription History
                </h2>
                {mockHistory.map((entry) => (
                  <div
                    key={entry.id}
                    className="border-l-4 border-blue-500 pl-4"
                  >
                    <p className="text-sm text-gray-400">{entry.date}</p>
                    <p className="text-white">{entry.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200">
            Finalize and Lock
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200">
            Save and Continue
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
