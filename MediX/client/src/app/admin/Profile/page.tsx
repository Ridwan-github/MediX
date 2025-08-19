"use client";
import Header from "@/components/admin/header";
import Footer from "@/components/footer";

import { useState } from "react";

export default function AdminProfilePage() {
  // Simulated admin data (could be fetched from API in real app)
  const [adminName, setAdminName] = useState("ADMIN");
  const [adminEmail, setAdminEmail] = useState("admin@admin.com");
  const [adminRole] = useState("System Administrator");
  const [adminPhone, setAdminPhone] = useState("+880 1234-567890");
  const [adminJoinDate] = useState("January 15, 2020");
  const [adminAddress, setAdminAddress] = useState("Building 5, Road 10, Mirpur 12, Dhaka");
  const [editMode, setEditMode] = useState(false);

  // For demonstration, allow editing name, email, phone, address
  const handleSave = () => {
    setEditMode(false);
    // In real app, send updated data to backend here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 text-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow p-4 sm:p-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-green-900">
            Admin Profile
          </h1>

          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-green-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-green-800 mb-1">{adminName}</h2>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium mb-2">
                  {adminRole}
                </span>
                <p className="text-sm text-gray-500">Joined: {adminJoinDate}</p>
              </div>
              <button
                className="px-5 py-2 rounded-xl bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition"
                onClick={() => setEditMode((e) => !e)}
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <form
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              onSubmit={e => { e.preventDefault(); handleSave(); }}
            >
              <div>
                <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                {editMode ? (
                  <input
                    className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={adminName}
                    onChange={e => setAdminName(e.target.value)}
                  />
                ) : (
                  <div className="text-lg font-semibold text-gray-900">{adminName}</div>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                {editMode ? (
                  <input
                    type="email"
                    className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={adminEmail}
                    onChange={e => setAdminEmail(e.target.value)}
                  />
                ) : (
                  <div className="text-lg font-semibold text-gray-900">{adminEmail}</div>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Phone</label>
                {editMode ? (
                  <input
                    className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={adminPhone}
                    onChange={e => setAdminPhone(e.target.value)}
                  />
                ) : (
                  <div className="text-lg font-semibold text-gray-900">{adminPhone}</div>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Address</label>
                {editMode ? (
                  <input
                    className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={adminAddress}
                    onChange={e => setAdminAddress(e.target.value)}
                  />
                ) : (
                  <div className="text-lg font-semibold text-gray-900">{adminAddress}</div>
                )}
              </div>
              <div className="sm:col-span-2 flex justify-end mt-2">
                {editMode && (
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </form>

            <div className="mt-10 border-t pt-6">
              <h3 className="text-lg font-semibold text-green-700 mb-2">Contact Support</h3>
              <p className="text-sm text-gray-600 mb-1">For any issues, contact the IT department:</p>
              <p className="text-sm text-green-700 font-medium">it-support@hikmahospital.com</p>
              <p className="text-sm text-green-700 font-medium">+880 9876-543210</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
