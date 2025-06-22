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
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-grow p-10">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-400">
              Doctor Profile
            </h1>
            <p className="text-gray-400">Manage your professional details</p>
          </div>

          {/* Profile Card */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-xl border border-gray-700 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-indigo-950 via-blue-900 to-teal-800 p-8 text-center">
              <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-4 border-teal-600">
                <span className="text-6xl text-teal-700">👤</span>
              </div>
              <h2 className="text-3xl font-bold text-white">
                {doctor?.user?.name}
              </h2>
              <p className="text-teal-300 text-lg mt-1">
                Assistant Professor (Surgery)
              </p>
            </div>

            {/* Profile Body */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-teal-400 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Name:</span>
                      <span className="text-white">{doctor.user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Email:</span>
                      <span className="text-white">{doctor.user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Phone:</span>
                      <span className="text-white">
                        {doctor.user.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Work Info */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-indigo-400 mb-4">
                    Work Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">
                        Employee ID:
                      </span>
                      <span className="text-white">{doctor.doctorId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Role:</span>
                      <span className="text-white">
                        Assistant Professor (Surgery)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">
                        Specialist:
                      </span>
                      <span className="text-white">General Surgery</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Degree:</span>
                      <span className="text-white">
                        MBBS, BCS(Health), FCPS (Surgery)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10 pt-6 border-t border-gray-700">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-200">
                  Edit Profile
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-200">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
