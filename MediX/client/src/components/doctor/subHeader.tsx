import React from "react";
import { usePathname } from "next/navigation";

export default function SubHeader() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/doctor/prescribe") return "Quick Prescribe";
    if (pathname === "/doctor/history") return "Patient History";
    return "Doctor Dashboard";
  };

  return (
    <div className="bg-gradient-to-r from-indigo-950 via-blue-900 to-teal-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6">
        <div className="bg-[#102A43] rounded-xl shadow-lg py-5 px-6 text-center border border-teal-700">
          <h1 className="text-white text-3xl sm:text-4xl font-semibold tracking-wide">
            {getTitle()}
          </h1>
        </div>
      </div>
    </div>
  );
}
