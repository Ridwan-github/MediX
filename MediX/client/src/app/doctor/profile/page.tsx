"use client";

import Header from "@/components/doctor/header";
import Footer from "@/components/footer";
import React, { useEffect, useState } from "react";

// Doctor Type
type Doctor = {
  doctorId: number;
  user: {
    name: string;
    phoneNumber: string;
    email: string;
  };
  available: boolean;
};

export default function ProfilePage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      setError("Doctor email not found in localStorage.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/api/doctors")
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data: Doctor[]) => {
        const match = data.find((d) => d?.user?.email === email);
        if (match) setDoctor(match);
        else setError("Doctor not found.");
      })
      .catch((err) => setError(err?.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-white p-10 text-center">Loading...</div>;
  if (error)
    return <div className="text-red-400 p-10 text-center">{error}</div>;
  if (!doctor)
    return (
      <div className="text-yellow-400 p-10 text-center">Doctor not found.</div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />
      <main className="flex-grow p-10 max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-2 text-green-800">
            Doctor Profile
          </h1>
          <p className="text-green-700">Manage your professional details</p>
        </div>

        {/* Profile Card */}
        <div className="bg-green-50/50 backdrop-blur-md rounded-3xl shadow-lg border border-green-200 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-700 p-8 text-center rounded-t-3xl">
            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-4 border-green-600">
              <span className="text-6xl text-green-700">👤</span>
            </div>
            <h2 className="text-3xl font-bold text-green-900">
              {doctor?.user?.name}
            </h2>
            <p className="text-green-800 text-lg mt-1">
              Assistant Professor (Surgery)
            </p>
          </div>

          {/* Profile Body */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Info */}
            <div className="bg-white/70 rounded-xl p-6 border-l-4 border-green-500 shadow-sm">
              <h3 className="text-xl font-semibold text-green-700 mb-4">
                Personal Information
              </h3>
              <div className="space-y-3 text-gray-800 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{doctor.user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{doctor.user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{doctor.user.phoneNumber}</span>
                </div>
              </div>
            </div>

            {/* Work Info */}
            <div className="bg-white/70 rounded-xl p-6 border-l-4 border-green-700 shadow-sm">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Work Information
              </h3>
              <div className="space-y-3 text-gray-800 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Employee ID:</span>
                  <span>{doctor.doctorId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Role:</span>
                  <span>Assistant Professor (Surgery)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Specialist:</span>
                  <span>General Surgery</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Degree:</span>
                  <span>MBBS, BCS(Health), FCPS (Surgery)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10 pt-6 border-t border-green-200">
            <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-200">
              Edit Profile
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-200">
              Change Password
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
