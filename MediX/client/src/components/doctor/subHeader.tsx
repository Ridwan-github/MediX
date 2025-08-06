import React from "react";
import { usePathname } from "next/navigation";

export default function SubHeader() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/doctor/prescribe") return "Quick Prescribe";
    if (pathname === "/doctor/history") return "Prescription History";
    if (pathname === "/doctor/list") return "List of Appointments";
    return "Doctor Dashboard";
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4">
        <div className="bg-green-100/60 backdrop-blur-sm rounded-2xl shadow-sm py-5 px-6 text-center border border-green-300">
          <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-teal-500 to-green-700">
            {getTitle()}
          </h1>
        </div>
      </div>
    </div>
  );
}
