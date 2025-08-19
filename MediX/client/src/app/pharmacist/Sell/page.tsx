'use client';

import Header from '@/components/pharmacist/header';
import SubHeader from '@/components/pharmacist/subHeader';
import Footer from '@/components/footer';
import Invoice from '@/components/pharmacist/invoice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SellPage() {
  const [prescriptionId, setPrescriptionId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [showQuickSell, setShowQuickSell] = useState(false);
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
      if (data.success) {
        setPatientId(data.patientId);
        setName(data.name);
        setContact(data.contact);
      } else {
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

      <main className="flex flex-col items-center justify-start flex-grow mt-10 px-2 sm:px-4">
        <div className="w-full max-w-4xl sm:max-w-5xl shadow-2xl p-6 sm:p-10 rounded-2xl bg-white/90 border border-green-100 relative">
          <div className="flex justify-end mb-8">
            <button
              className={`px-4 py-2 rounded-lg font-semibold shadow transition bg-gradient-to-r from-green-700 via-green-500 to-green-600 text-white hover:from-green-800 hover:to-green-700 focus:ring-4 focus:ring-green-300 ${showQuickSell ? 'ring-2 ring-green-400' : ''}`}
              onClick={() => setShowQuickSell((v) => !v)}
            >
              {showQuickSell ? 'Back to Normal Sell' : 'Quick Sell'}
            </button>
          </div>

          {!showQuickSell ? (
            <>
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6 text-green-800 flex items-center gap-2">
                  <span className="inline-block w-2 h-6 bg-green-600 rounded-full mr-2"></span>
                  Patient Info
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-gray-700">Prescription ID</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={prescriptionId}
                        onChange={(e) => setPrescriptionId(e.target.value)}
                        className="border border-green-400 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-black shadow-sm transition"
                        placeholder="Enter Prescription ID"
                      />
                      <button
                        onClick={handleFetchPatientData}
                        disabled={loading}
                        className="flex items-center gap-1 px-3 py-1.5 text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded font-semibold shadow focus:ring-2 focus:ring-green-300 transition text-sm min-w-[80px] justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{ minHeight: '32px' }}
                      >
                        {loading ? (
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 mr-1 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                          </svg>
                        )}
                        {loading ? "Loading..." : "Fetch Info"}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-gray-700">Patient ID</label>
                    <input
                      type="text"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      className="border border-green-200 w-full px-3 py-2 rounded-lg bg-gray-100 text-gray-700 shadow-sm"
                      disabled
                      placeholder="Auto-filled"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-green-200 w-full px-3 py-2 rounded-lg bg-gray-100 text-gray-700 shadow-sm"
                      disabled
                      placeholder="Auto-filled"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-gray-700">Contact Number</label>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="border border-green-200 w-full px-3 py-2 rounded-lg bg-gray-100 text-gray-700 shadow-sm"
                      disabled
                      placeholder="Auto-filled"
                    />
                  </div>
                </div>
              </section>

              <div className="my-8 border-t border-green-200"></div>
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6 text-green-800 flex items-center gap-2">
                  <span className="inline-block w-2 h-6 bg-green-600 rounded-full mr-2"></span>
                  Receipt Preview
                </h2>
                <div className="bg-white rounded-xl shadow p-4 sm:p-8 border border-green-100">
                  <Invoice />
                </div>
              </section>

              <div className="flex justify-center mb-10">
                <button
                  onClick={handleFinalize}
                  className="bg-gradient-to-r from-green-700 to-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:from-green-800 hover:to-green-700 focus:ring-4 focus:ring-green-300 transition text-lg tracking-wide"
                >
                  <span className="inline-block align-middle mr-2">🔒</span> Finalize and Lock
                </button>
              </div>
            </>
          ) : (
            <>
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6 text-green-800 flex items-center gap-2">
                  <span className="inline-block w-2 h-6 bg-green-600 rounded-full mr-2"></span>
                  Quick Sell Invoice
                </h2>
                <div className="bg-white rounded-xl shadow p-4 sm:p-8 border border-green-100">
                  <Invoice />
                </div>
              </section>
              <div className="flex justify-center mb-10">
                <button
                  onClick={handleFinalize}
                  className="bg-gradient-to-r from-green-700 to-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:from-green-800 hover:to-green-700 focus:ring-4 focus:ring-green-300 transition text-lg tracking-wide"
                >
                  <span className="inline-block align-middle mr-2">🔒</span> Finalize and Lock
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
