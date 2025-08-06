"use client";
import Header from "@/components/pharmacist/header";
import SubHeader from "@/components/pharmacist/subHeader";
import Footer from "@/components/footer";
import { useState } from "react";

export default function PrescriptionPage() {
  const [medicinesSoldToday, setMedicinesSoldToday] =
    useState("Paracetamol - 10");
  const [medicinesLowStock, setMedicinesLowStock] = useState("Ibuprofen - 5");
  const [medicinesOverStock, setMedicinesOverStock] =
    useState("Amoxicillin - 50");
  const [todaysSoldAmount, setTodaysSoldAmount] = useState("5000");
  const [monthlySoldAmount, setMonthlySoldAmount] = useState("150000");

  return (
    <div className="min-h-screen bg-white text-white flex flex-col">
      <Header />
      <SubHeader />
      <main className="flex-grow p-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Medicines Sold Today */}
            <div className="bg-white rounded-3xl p-8 text-center shadow-[inset_2px_2px_4px_#c2d0c8,inset_-2px_-2px_4px_#ffffff] hover:shadow-[inset_4px_4px_6px_#cfd4db,inset_-4px_-4px_6px_#ffffff] transition-shadow duration-100 ease-in-out">
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                Medicines Sold Today
              </h2>
              <p className="text-4xl font-bold text-blue-600">
                {medicinesSoldToday}
              </p>
            </div>

            {/* Card 3: Medicine Low Stock */}
            <div className="bg-white rounded-3xl p-8 text-center shadow-[inset_2px_2px_4px_#c2d0c8,inset_-2px_-2px_4px_#ffffff] hover:shadow-[inset_4px_4px_6px_#cfd4db,inset_-4px_-4px_6px_#ffffff] transition-shadow duration-100 ease-in-out">
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                Patients Remaining Today
              </h2>
              <p className="text-4xl font-bold text-green-600">
                {medicinesLowStock}
              </p>
            </div>

            {/* Card 2: Todays sold Amount */}
            <div className="bg-white rounded-3xl p-8 text-center shadow-[inset_2px_2px_4px_#c2d0c8,inset_-2px_-2px_4px_#ffffff] hover:shadow-[inset_4px_4px_6px_#cfd4db,inset_-4px_-4px_6px_#ffffff] transition-shadow duration-100 ease-in-out">
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                Today's Sold Amount
              </h2>
              <p className="text-4xl font-bold text-red-600">
                {todaysSoldAmount}
              </p>
            </div>

            {/* Card 5: Medicine Over Stock */}
            <div className="bg-white rounded-3xl p-8 text-center shadow-[inset_2px_2px_4px_#c2d0c8,inset_-2px_-2px_4px_#ffffff] hover:shadow-[inset_4px_4px_6px_#cfd4db,inset_-4px_-4px_6px_#ffffff] transition-shadow duration-100 ease-in-out">
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                Medicine Over Stock
              </h2>
              <p className="text-4xl font-bold text-purple-600">
                {medicinesOverStock}
              </p>
            </div>

            {/* Card 4: Monthly Sold Amount */}
            <div className="bg-white rounded-3xl p-8 text-center shadow-[inset_2px_2px_4px_#c2d0c8,inset_-2px_-2px_4px_#ffffff] hover:shadow-[inset_4px_4px_6px_#cfd4db,inset_-4px_-4px_6px_#ffffff] transition-shadow duration-100 ease-in-out">
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                Monthly Sold Amount
              </h2>
              <p className="text-4xl font-bold text-green-700">
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
