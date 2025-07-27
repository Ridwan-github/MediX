"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";

type ReceptionistProfile = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  id: string;
  role: string;
};

export default function ProfilePage() {
  const [receptionistProfile, setReceptionistProfile] =
    useState<ReceptionistProfile | null>(null);
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const receptionistId = localStorage.getItem("receptionistId");
    if (!receptionistId || receptionistId.trim() === "") {
      router.push("/");
      return;
    }
  }, [router]);

  useEffect(() => {
    // Get receptionist data from localStorage
    const storedData = localStorage.getItem("receptionistData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setReceptionistProfile({
        name: data.name || "N/A",
        email: data.email || "N/A",
        phoneNumber: data.phoneNumber || "N/A",
        address: data.address || "N/A",
        id: data.id?.toString() || "N/A",
        role: "Receptionist",
      });
    } else {
      // Fallback: try to get individual items from localStorage
      const name = localStorage.getItem("receptionistName");
      const email = localStorage.getItem("receptionistEmail");
      const phoneNumber = localStorage.getItem("receptionistPhoneNumber");
      const address = localStorage.getItem("receptionistAddress");
      const id = localStorage.getItem("receptionistId");

      if (name || email || phoneNumber || address || id) {
        setReceptionistProfile({
          name: name || "N/A",
          email: email || "N/A",
          phoneNumber: phoneNumber || "N/A",
          address: address || "N/A",
          id: id || "N/A",
          role: "Receptionist",
        });
      }
    }
  }, []);

  if (!receptionistProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />

      <main className="flex-grow px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-green-800">
              Receptionist Profile
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your profile information
            </p>
          </div>

          {/* Profile Card */}
          <div className="rounded-3xl shadow-[6px_6px_16px_#d0d4da,-6px_-6px_16px_#ffffff] overflow-hidden border border-gray-200 bg-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-700 p-8 text-white text-center relative">
              <div className="w-28 h-28 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-5xl text-green-600">👤</span>
              </div>
              <h2 className="text-3xl font-semibold">
                {receptionistProfile.name}
              </h2>
              <p className="text-green-100 mt-1">{receptionistProfile.role}</p>
            </div>

            {/* Info Grid */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl p-6 shadow-[inset_4px_4px_10px_#cfe9c7,inset_-4px_-4px_10px_#ffffff]">
                <h3 className="text-sm font-semibold text-green-600 uppercase mb-4 tracking-wider">
                  Personal Information
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-medium">
                      {receptionistProfile.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-medium">
                      {receptionistProfile.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="font-medium">
                      {receptionistProfile.phoneNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Work Info */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6 shadow-[inset_4px_4px_10px_#cfdffa,inset_-4px_-4px_10px_#ffffff]">
                <h3 className="text-sm font-semibold text-blue-600 uppercase mb-4 tracking-wider">
                  Work Information
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Employee ID:</span>
                    <span className="font-medium">
                      {receptionistProfile.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Working Hours:</span>
                    <span className="font-medium">9 AM - 5 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Address:</span>
                    <span className="font-medium">
                      {receptionistProfile.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 p-8 border-t border-gray-100 bg-gray-50">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-[4px_4px_10px_#bfd8be,-4px_-4px_10px_#ffffff] transition duration-200">
                Edit Profile
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl shadow-[4px_4px_10px_#c8ccd1,-4px_-4px_10px_#ffffff] transition duration-200">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
