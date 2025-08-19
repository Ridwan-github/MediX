'use client';

import Header from '@/components/pharmacist/header';
import SubHeader from '@/components/pharmacist/subHeader';
import Footer from '@/components/footer';
import Invoice from '@/components/pharmacist/invoice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SellPage() {
  const [prescriptionId, setPrescriptionId] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const router = useRouter();

  const handleFetchPatientData = async () => {
    if (!prescriptionId) {
      alert("Please enter Prescription ID first.");
      return;
    }
    setLoading(true);

    try {
      // Trigger API to fetch patient details
      const response = await fetch(`/api/fetchPatientDetails?prescriptionId=${prescriptionId}`);
      const data = await response.json();

      // Update the form with fetched data
      if (!data.success) {
        alert("Patient data not found.");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("Error fetching patient data.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalize = () => {
    // Add logic to store the invoice to context, database, or localStorage if needed
    router.push('/pharmacist/Sell/Finalize');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100 text-black">
      <Header />
      <SubHeader />

      <main className="flex flex-col items-center justify-start flex-grow mt-8 px-2 sm:px-4">
        <div className="w-full max-w-4xl sm:max-w-5xl shadow-2xl p-6 sm:p-8 rounded-2xl bg-white/90 border border-green-100 relative">

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-green-800 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-green-600 rounded-full mr-2"></span>
              Prescription Info
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Prescription ID</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={prescriptionId}
                    onChange={(e) => setPrescriptionId(e.target.value)}
                    className="border border-green-400 w-80 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-black shadow-sm transition"
                    placeholder="Enter Prescription ID"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="my-8 border-t border-green-200"></div>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-green-800 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-green-600 rounded-full mr-2"></span>
              Receipt Preview
            </h2>
            <div className="bg-white rounded-xl shadow p-4 sm:p-8 border border-green-100">
              <Invoice />
            </div>
          </section>

          <div className="flex justify-center mb-8">
            <button
              onClick={handleFinalize}
              className="bg-gradient-to-r from-green-700 to-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:from-green-800 hover:to-green-700 focus:ring-4 focus:ring-green-300 transition text-lg tracking-wide"
            >
              <span className="inline-block align-middle mr-2">🔒</span> Finalize and Lock
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
