"use client";
import Header from "@/components/admin/header";
import Footer from "@/components/footer";
import { useState } from "react";

export default function AdminProfilePage() {
  const [adminName, setAdminName] = useState("ADMIN");
  const [adminEmail, setAdminEmail] = useState("admin@admin.com");
  const [adminRole, setAdminRole] = useState("Admin");
  const [adminJoinDate, setAdminJoinDate] = useState("January 15, 2020");

  return (
    <div className="min-h-screen bg-white text-white flex flex-col">
      <Header />
      <main className="flex-grow p-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center !text-black">
            Admin Profile
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Profile Picture */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-600 mb-4">
                {/* Replace with dynamic image source */}
                <img
                  src="/path/to/profile-pic.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-300">Profile Picture</h2>
            </div>

            {/* Card 2: Admin Information */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-300 mb-4">Admin Information</h2>
              <div className="mb-4">
                <h3 className="text-lg text-gray-200">Name:</h3>
                <p className="text-xl font-semibold text-blue-400">{adminName}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg text-gray-200">Email:</h3>
                <p className="text-xl font-semibold text-green-400">{adminEmail}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg text-gray-200">Role:</h3>
                <p className="text-xl font-semibold text-red-400">{adminRole}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg text-gray-200">Join Date:</h3>
                <p className="text-xl font-semibold text-purple-400">{adminJoinDate}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
