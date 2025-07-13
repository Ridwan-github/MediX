'use client';
import Header from "@/components/pharmacist/header";
import SubHeader from "@/components/pharmacist/subHeader";
import PharmacistNav from "@/components/pharmacist/pharmacistNav";
import Footer from "@/components/footer";
import React, { useState } from 'react';

export default function MedicineForm() {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [genericName, setGenericName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ company, name, genericName });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Full-width header and subheader */}
      <Header />
      <SubHeader />
      <PharmacistNav />

      {/* Centered form section */}
      <main className="flex flex-col items-center justify-start flex-grow mt-10 px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b-4 border-green-700 pb-2">
          Medicine Info
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full max-w-xl bg-white shadow-lg p-8 rounded-xl"
        >
          <div className="flex flex-col">
            <label htmlFor="company" className="text-gray-700 font-semibold mb-1">Company</label>
            <input
              id="company"
              type="text"
              placeholder="e.g. Square Pharmaceuticals"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border-2 border-purple-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-semibold mb-1">Medicine Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Napa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-purple-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="generic" className="text-gray-700 font-semibold mb-1">Generic Name</label>
            <input
              id="generic"
              type="text"
              placeholder="e.g. Paracetamol"
              value={genericName}
              onChange={(e) => setGenericName(e.target.value)}
              className="border-2 border-purple-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div className="flex gap-6 justify-center mt-4">
            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-800 active:scale-95 transition transform"
            >
              ➕ Add Product
            </button>

            <button
              type="button"
              className="bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 active:scale-95 transition transform"
              onClick={() => console.log('Show Texts clicked')}
            >
              📋 Show Texts
            </button>
          </div>
        </form>
      </main>

      {/* Full-width footer */}
      <Footer />
    </div>
  );
}
