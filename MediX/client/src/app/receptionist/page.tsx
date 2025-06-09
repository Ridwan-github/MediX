"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import { useState } from "react";

export default function ReceptionistPage() {
  const [numberOfPatients, setNumberOfPatients] = useState("12");
  const [paymentDue, setPaymentDue] = useState("5");
  const [totalVisitingFeeToday, setTotalVisitingFeeToday] = useState("৳ 3,200");
  const [totalVisitingFeeThisMonth, setTotalVisitingFeeThisMonth] =
    useState("৳ 42,500");

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-grow p-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-200">
            My Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Patients Added Today */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Patients Added Today
              </h2>
              <p className="text-4xl font-bold mt-4 text-blue-400">
                {numberOfPatients}
              </p>
            </div>

            {/* Card 2: Patients Payment Due */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Patients Payment Due
              </h2>
              <p className="text-4xl font-bold mt-4 text-red-400">
                {paymentDue}
              </p>
            </div>

            {/* Card 3: Total Visiting Fee Today */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Total Visiting Fee Today
              </h2>
              <p className="text-4xl font-bold mt-4 text-green-400">
                {totalVisitingFeeToday}
              </p>
            </div>

            {/* Card 4: Total Visiting Fee This Month */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Total Visiting Fee This Month
              </h2>
              <p className="text-4xl font-bold mt-4 text-green-500">
                {totalVisitingFeeThisMonth}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
