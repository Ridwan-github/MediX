"use client";

import Header from "@/components/doctor/header";
import Footer from "@/components/footer";
import React, { useEffect, useState } from "react";

// Define Type
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
        if (match) {
          setDoctor(match);
        } else {
          setError("Doctor not found.");
        }
      })
      .catch((err) => setError(err?.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!doctor) return <div>Doctor not found</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-green-800 mb-2">
              Doctors Profile
            </h1>
            <p className="text-gray-600">Manage your profile information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-center text-white">
              <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-6xl text-green-600">👤</span>
              </div>
              <h2 className="text-3xl font-bold">{doctor?.user?.name}</h2>
              <p className="text-green-100 text-lg">
                Assistant Professor (Surgery)
              </p>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                    <h3 className="text-xl font-semibold text-green-600 mb-2">
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold">
                          Name:
                        </span>
                        <span className="text-gray-900">
                          {doctor?.user?.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold">
                          Email:
                        </span>
                        <span className="text-gray-900">
                          {doctor?.user?.email}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold">
                          Phone Number:
                        </span>
                        <span className="text-gray-900">
                          {doctor?.user?.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                      Work Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold">
                          Employee ID:
                        </span>
                        <span className="text-gray-900">
                          {doctor?.doctorId}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold">
                          Role:
                        </span>
                        <span className="text-gray-900">
                          Assistant Professor (Surgery)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold">
                          Specialist:
                        </span>
                        <span className="text-gray-900">General Surgery</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold">
                          Degree:
                        </span>
                        <span className="text-gray-900">
                          MBBS, BCS(Health), FCPS (Surgery)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-200 shadow-lg hover:shadow-xl">
                  Edit Profile
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold transition duration-200 shadow-lg hover:shadow-xl">
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
