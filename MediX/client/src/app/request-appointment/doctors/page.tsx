"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";

interface Doctor {
  doctorId: number;
  user: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    address: string;
  };
  yearsOfExperience: number;
  availableDays: string;
  availableTimes: string;
  licenseNumber: string;
  qualifications: Array<{
    id: {
      doctorId: number;
      qualificationId: number;
    };
    qualification: {
      id: number;
      name: string;
    };
  }>;
  specializations: Array<{
    id: {
      doctorId: number;
      specializationId: number;
    };
    specialization: {
      id: number;
      name: string;
    };
  }>;
}

export default function DoctorListPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/api/doctors")
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data: Doctor[]) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const nameMatch = doctor.user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const specializationMatch = doctor.specializations.some((spec) =>
      spec.specialization.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const qualificationMatch = doctor.qualifications.some((qual) =>
      qual.qualification.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return nameMatch || specializationMatch || qualificationMatch;
  });

  const handleDoctorSelect = (doctor: Doctor) => {
    // Navigate to booking page with selected doctor
    router.push(
      `/request-appointment/book?doctorId=${
        doctor.doctorId
      }&doctorName=${encodeURIComponent(doctor.user.name)}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f2ec] via-[#f0f6f2] to-[#e6f2ec] flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-200 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-6">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-800 via-green-700 to-gray-800 bg-clip-text text-transparent">
            Choose Your <span className="text-green-700">Doctor</span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full mb-6 animate-pulse"></div>
          <p className="text-gray-600 text-xl font-medium max-w-2xl mx-auto px-4">
            Browse our experienced doctors and select the one that best fits
            your needs
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative z-10 px-4 mb-8">
        <div className="max-w-lg mx-auto">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-14 rounded-2xl border-none bg-[#e6f2ec] text-gray-800 shadow-[inset_6px_6px_12px_#c2d0c8,inset_-6px_-6px_12px_#ffffff] placeholder-gray-500 "
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-green-600/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow relative z-10 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 text-lg">Loading doctors...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-red-600 text-lg font-medium">
                Error loading doctors: {error}
              </p>
            </div>
          )}

          {!loading && !error && (
            <>
              {filteredDoctors.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.901-6.061 2.379"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">
                    No doctors found matching your search
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <div
                      key={doctor.doctorId}
                      onClick={() => handleDoctorSelect(doctor)}
                      className="group bg-[#e6f2ec] rounded-3xl p-6 shadow-[12px_12px_24px_#c2d0c8,-12px_-12px_24px_#ffffff] hover:shadow-[20px_20px_40px_#a8b8af,-20px_-20px_40px_#ffffff] transition-all duration-500 cursor-pointer transform hover:scale-[1.02] border border-white/20 backdrop-blur-sm"
                    >
                      {/* Doctor Avatar */}
                      <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-[8px_8px_16px_#c2d0c8,-8px_-8px_16px_#ffffff] group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-2xl">
                            {doctor.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                      </div>

                      {/* Doctor Info */}
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors duration-300">
                          {doctor.user.name}
                        </h3>

                        {/* Specializations */}
                        {doctor.specializations &&
                          doctor.specializations.length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-1 justify-center">
                              {doctor.specializations.map((spec) => (
                                <span
                                  key={spec.id.specializationId}
                                  className="text-green-600 font-semibold text-xs px-2 py-1 bg-green-100 rounded-full"
                                >
                                  {spec.specialization.name}
                                </span>
                              ))}
                            </div>
                          )}

                        {/* Qualifications */}
                        {doctor.qualifications &&
                          doctor.qualifications.length > 0 && (
                            <div className="mb-3">
                              <p className="text-gray-600 text-sm font-medium">
                                {doctor.qualifications
                                  .map((qual) => qual.qualification.name)
                                  .join(", ")}
                              </p>
                            </div>
                          )}

                        {/* Experience */}
                        <div className="mb-3">
                          <p className="text-gray-600 text-sm font-medium">
                            {doctor.yearsOfExperience} years of experience
                          </p>
                        </div>

                        <div className="space-y-2 mb-4">
                          {doctor.user.email && (
                            <p className="text-gray-600 text-sm flex items-center justify-center">
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              {doctor.user.email}
                            </p>
                          )}

                          {doctor.user.phoneNumber && (
                            <p className="text-gray-600 text-sm flex items-center justify-center">
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              {doctor.user.phoneNumber}
                            </p>
                          )}
                        </div>

                        {/* Available Days */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Available Days:
                          </h4>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {doctor.availableDays ? (
                              doctor.availableDays
                                .split(",")
                                .map((day, index) => (
                                  <span
                                    key={index}
                                    className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium"
                                  >
                                    {day.trim()}
                                  </span>
                                ))
                            ) : (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                                Not specified
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Availability Status */}
                        <div className="mb-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              doctor.availableDays
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {doctor.availableDays
                              ? "Available"
                              : "Not Available"}
                          </span>
                        </div>

                        {/* Book Appointment Button */}
                        <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-[4px_4px_8px_#c2d0c8,-4px_-4px_8px_#ffffff] hover:from-green-700 hover:to-green-800 hover:shadow-[6px_6px_12px_#a8b8af,-6px_-6px_12px_#ffffff] transition-all duration-300 transform group-hover:scale-105">
                          Book Appointment
                          <svg
                            className="w-4 h-4 ml-2 inline"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Back to Home */}
      <div className="relative z-10 text-center pb-8">
        <button
          onClick={() => router.push("/")}
          className="group inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium text-lg transition-all duration-300 hover:scale-105"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </button>
      </div>

      <Footer />
    </div>
  );
}
