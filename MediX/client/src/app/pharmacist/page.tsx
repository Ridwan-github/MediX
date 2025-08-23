"use client";
import Header from "@/components/pharmacist/header";
import SubHeader from "@/components/pharmacist/subHeader";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import medicinesData from "@/data/medicines.json";

// Dummy data for demonstration
const dummySales = [
  { name: "Napa", sold: 40 },
  { name: "Seclo", sold: 25 },
  { name: "Ace", sold: 18 },
  { name: "Amoxil", sold: 12 },
  { name: "Ciprocin", sold: 10 },
];
const dummyExpiry = [
  { name: "Seclo", expiry: "2025-09-10", daysLeft: 22 },
  { name: "Ace", expiry: "2025-09-05", daysLeft: 17 },
];
const dummyStock = [
  { name: "Seclo", quantity: 15 },
  { name: "Ace", quantity: 8 },
];
const dummyRevenue = {
  today: 5000,
  week: 32000,
  month: 150000,
};

export default function PharmacistHome() {
  const [topSelling, setTopSelling] = useState(dummySales);
  const [expiryAlert, setExpiryAlert] = useState(dummyExpiry);
  const [stockAlert, setStockAlert] = useState(dummyStock);
  const [revenue, setRevenue] = useState(dummyRevenue);
  const [selectedRevenue, setSelectedRevenue] = useState<'today' | 'week' | 'month'>('today');

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 text-gray-900 flex flex-col">
      <Header />
      <SubHeader />
      <main className="flex-grow p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-10">
            {/* Revenue Card */}
            <div className="bg-gradient-to-br from-green-100 via-green-50 to-green-100 rounded-3xl p-8 shadow-2xl border-t-4 border-green-600 hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col items-center justify-between h-full transform hover:scale-105">
              <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-green-600 rounded-full"></span>
                Revenue Overview
              </h2>
              <div className="flex gap-2 mb-4">
                <button
                  className={`px-4 py-2 rounded-xl font-semibold transition-all border-2 ${selectedRevenue === 'today' ? 'bg-green-700 text-white border-green-700' : 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100'}`}
                  onClick={() => setSelectedRevenue('today')}
                >Today</button>
                <button
                  className={`px-4 py-2 rounded-xl font-semibold transition-all border-2 ${selectedRevenue === 'week' ? 'bg-blue-700 text-white border-blue-700' : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'}`}
                  onClick={() => setSelectedRevenue('week')}
                >This Week</button>
                <button
                  className={`px-4 py-2 rounded-xl font-semibold transition-all border-2 ${selectedRevenue === 'month' ? 'bg-purple-700 text-white border-purple-700' : 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'}`}
                  onClick={() => setSelectedRevenue('month')}
                >This Month</button>
              </div>
              <div className="text-4xl font-extrabold text-green-800 mb-2">
                ৳ {selectedRevenue === 'today' ? revenue.today.toLocaleString() : selectedRevenue === 'week' ? revenue.week.toLocaleString() : revenue.month.toLocaleString()}
              </div>
              <div className="text-gray-500 text-sm">
                {selectedRevenue === 'today' && 'Total revenue generated today'}
                {selectedRevenue === 'week' && 'Total revenue generated this week'}
                {selectedRevenue === 'month' && 'Total revenue generated this month'}
              </div>
            </div>

            {/* Top Selling Medicines */}
            <div className="bg-gradient-to-br from-green-100 via-green-50 to-green-100 rounded-3xl p-8 shadow-2xl border-l-4 border-green-600 hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col justify-between h-full transform hover:scale-105">
              <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-green-600 rounded-full"></span>
                Top Selling Medicines
              </h2>
              <ol className="space-y-3">
                {topSelling.map((med, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-2 shadow-sm hover:bg-green-100 transition-colors duration-200">
                    <span className="font-semibold text-lg text-green-900">{idx + 1}. {med.name}</span>
                    <span className="text-green-700 font-bold">{med.sold} sold</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Stock Alert */}
            <div className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100 rounded-3xl p-8 shadow-2xl border-t-4 border-yellow-500 hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col justify-between h-full transform hover:scale-105">
              <h2 className="text-lg font-semibold text-yellow-700 mb-2">Stock Alert</h2>
              <ul className="text-lg text-red-600 font-semibold space-y-1">
                {stockAlert.length === 0 ? <li>All stocks healthy</li> : stockAlert.map((med, i) => (
                  <li key={i}>{med.name} <span className="text-xs text-gray-500">({med.quantity} left)</span></li>
                ))}
              </ul>
            </div>

            {/* Medicine Expiry Alert */}
            <div className="bg-gradient-to-br from-red-100 via-red-50 to-red-100 rounded-3xl p-8 shadow-2xl border-l-4 border-red-500 hover:shadow-xl transition-all duration-300 ease-in-out h-full transform hover:scale-105">
              <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                Expiry Alert
              </h2>
              <ul className="space-y-3">
                {expiryAlert.length === 0 ? <li className="text-green-700">No expiry soon</li> : expiryAlert.map((med, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-red-50 rounded-xl px-4 py-2 shadow-sm hover:bg-red-100 transition-colors duration-200">
                    <span className="font-semibold text-lg text-red-900">{med.name}</span>
                    <span className="text-red-700 font-bold">{med.daysLeft} days left</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
