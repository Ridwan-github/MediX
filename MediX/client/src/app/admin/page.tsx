"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/admin/header";
import Footer from "@/components/footer";
import SubHeader from "@/components/admin/subheader";

export default function AdminDashboardPage() {
  const router = useRouter();

  
  const [Totalemployees, setTotalemployees] = useState(100);
  const [Doctors, setDoctors] = useState(30);
  const [Receptionists, setReceptionists] = useState(30);
  const [Pharmacists, setPharmacists] = useState(30);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <SubHeader />
      <main className="flex-grow p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-green-50 rounded-3xl shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-sm font-semibold text-green-700">Total Employees</h2>
              <p className="text-4xl font-bold text-green-500 mt-4">{Totalemployees}</p>
            </div>

          
            <div className="bg-green-50 rounded-3xl shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-sm font-semibold text-green-700">Doctors</h2>
              <p className="text-4xl font-bold text-green-500 mt-4">{Doctors}</p>
            </div>

            
            <div className="bg-green-50 rounded-3xl shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-sm font-semibold text-green-700">Pharmacists</h2>
              <p className="text-3xl font-bold text-red-600 mt-4">{Pharmacists}</p>
            </div>

            
            <div className="bg-green-50 rounded-3xl shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-sm font-semibold text-green-700">Receptionists</h2>
              <p className="text-4xl font-bold text-blue-600 mt-4">{Receptionists}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
