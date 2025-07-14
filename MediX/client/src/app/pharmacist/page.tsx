"use client";
import Header from "@/components/pharmacist/header";
import SubHeader from "@/components/pharmacist/subHeader";
import Footer from "@/components/footer";
import { useState } from "react";

export default function PrescriptionPage() {
  const [medicinesSoldToday, setMedicinesSoldToday] = useState("Paracetamol - 10");
  const [medicinesLowStock, setMedicinesLowStock] = useState("Ibuprofen - 5");
  const [medicinesOverStock, setMedicinesOverStock] = useState("Amoxicillin - 50");
  const [todaysSoldAmount, setTodaysSoldAmount] = useState("5000");
  const [monthlySoldAmount, setMonthlySoldAmount] = useState("150000");

  return (
    <div className="min-h-screen bg-white text-white flex flex-col">
      <Header />
      <SubHeader />
      <main className="flex-grow p-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center !text-black">
            My Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Medicines Sold Today */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Medicines Sold Today
              </h2>
              <p className="text-4xl font-bold mt-4 text-blue-400">
                {medicinesSoldToday}
              </p>
            </div>

            {/* Card 3: Medicine Low Stock */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Patients Remaining Today
              </h2>
              <p className="text-4xl font-bold mt-4 text-green-400">
                {medicinesLowStock}
              </p>
            </div>

            {/* Card 2: Todays sold Amount */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Today's Sold Amount
              </h2>
              <p className="text-4xl font-bold mt-4 text-red-400">
                {todaysSoldAmount} 
              </p>
            </div>

            {/* Card 5: Medicine Over Stock */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Medicine Over Stock
              </h2>
              <p className="text-4xl font-bold mt-4 text-purple-400">
                {medicinesOverStock}
              </p>
            </div>

            {/* Card 4: Monthly Sold Amount */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Monthly Sold Amount
              </h2>
              <p className="text-4xl font-bold mt-4 text-green-500">
                {monthlySoldAmount}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
