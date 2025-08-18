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
  const router = useRouter();

  const handleFinalize = () => {
    // Add logic to store the invoice to context, database, or localStorage if needed
    router.push('/pharmacist/Sell/Finalize');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <SubHeader />

      <main className="flex flex-col items-center justify-start flex-grow mt-10 px-4">
        <div className="w-full max-w-5xl">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Patient Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <label className="font-medium">Prescription ID:</label>
                <input
                  type="text"
                  value={prescriptionId}
                  onChange={(e) => setPrescriptionId(e.target.value)}
                  className="border-b border-black w-2/3 px-2 focus:outline-none bg-transparent text-black"
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="font-medium">Patient ID:</label>
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="border-b border-black w-2/3 px-2 focus:outline-none bg-transparent text-black"
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="font-medium">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-b border-black w-2/3 px-2 focus:outline-none bg-transparent text-black"
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="font-medium">Contact Number:</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="border-b border-black w-2/3 px-2 focus:outline-none bg-transparent text-black"
                />
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Receipt Preview</h2>
            <Invoice />
          </section>

          <div className="flex justify-center">
            <button
              onClick={handleFinalize}
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Finalize and Lock
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
