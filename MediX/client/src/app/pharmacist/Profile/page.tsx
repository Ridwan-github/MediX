import Header from "@/components/pharmacist/header";
import Footer from "@/components/footer";
import React from "react";

type PharmacistProfile = {
  name: string;
  gender: string;
  age: number;
  id: string;
  role: string;
  degree: string;
};

const pharmacistProfile: PharmacistProfile = {
  name: "Trevor Philips",
  gender: "Male",
  age: 30,
  id: "PHA123",
  role: "Pharmacist",
  degree: "PharmD",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="flex-grow p-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-green-800 mb-2">
              Pharmacist Profile
            </h1>
            <p className="text-gray-600">Manage your profile information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-white text-center">
              <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-6xl text-green-600">👤</span>
              </div>
              <h2 className="text-3xl font-bold">{pharmacistProfile.name}</h2>
              <p className="text-green-100 text-lg">{pharmacistProfile.role}</p>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                    <h3 className="text-xl font-medium text-green-600 uppercase tracking-wide mb-2 text-center font-bold">
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Name:</span>
                        <span className="text-gray-900 font-semibold">
                          {pharmacistProfile.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                          Gender:
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {pharmacistProfile.gender}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Age:</span>
                        <span className="text-gray-900 font-semibold">
                          {pharmacistProfile.age} years
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <h3 className="text-xl font-medium text-blue-600 uppercase tracking-wide mb-2 text-center">
                      Work Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                          Employee ID:
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {pharmacistProfile.id}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Role:</span>
                        <span className="text-gray-900 font-semibold">
                          {pharmacistProfile.role}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                          Degree:
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {pharmacistProfile.degree}
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
