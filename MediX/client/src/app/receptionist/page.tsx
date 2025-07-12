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
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-grow p-6 sm:p-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-center text-green-700 drop-shadow-sm">
            My Dashboard
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            {[
              {
                title: "Patients Added Today",
                value: numberOfPatients,
                color: "text-blue-600",
              },
              {
                title: "Patients Payment Due",
                value: paymentDue,
                color: "text-red-600",
              },
              {
                title: "Total Visiting Fee Today",
                value: totalVisitingFeeToday,
                color: "text-green-600",
              },
              {
                title: "Total Visiting Fee This Month",
                value: totalVisitingFeeThisMonth,
                color: "text-green-700",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 text-center shadow-[inset_2px_2px_5px_#d0d4da,inset_-2px_-2px_5px_#ffffff] hover:shadow-[inset_4px_4px_6px_#cfd4db,inset_-4px_-4px_6px_#ffffff] transition-shadow duration-100 ease-in-out"
              >
                <h2 className="text-xl font-semibold text-green-700 mb-3">
                  {card.title}
                </h2>
                <p className={`text-4xl font-bold ${card.color}`}>
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
