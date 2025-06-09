import React from "react";
import { usePathname } from "next/navigation";

export default function SubHeader() {
  const lowerNavBgColor = "#1F4604";
  const lowerNavTextColor = "#ffffff";

  return (
    <div className="bg-gradient-to-br from-green-900 via-green-850 to-green-800">
      <div
        style={{ backgroundColor: lowerNavBgColor, color: lowerNavTextColor }}
        className=" p-4 justify-center text-center flex items-center text-2xl pt-8 pb-6 px-6 sm:px-10 lg:px-16 rounded-t-2xl md:rounded-t-3xl mt-auto"
      >
        {usePathname() === "/doctor/prescribe" ? (
          <span className="text-white text-3xl font-bold">Quick Prescribe</span>
        ) : usePathname() === "/doctor/history" ? (
          <span className="text-white text-3xl font-bold">History</span>
        ) : (
          <span className="text-white text-3xl font-bold">Home</span>
        )}
      </div>
    </div>
  );
}
