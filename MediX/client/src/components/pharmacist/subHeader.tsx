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
        {usePathname() === "/pharmacist/Medicines" ? (
          <span className="text-white text-3xl font-bold">Medicines</span>
        ) : usePathname() === "/pharmacist/Sell" ? (
          <span className="text-white text-3xl font-bold">Sell</span>
        ) : usePathname() === "/pharmacist/History" ? (
          <span className="text-white text-3xl font-bold">History</span>
        ) : usePathname() === "/pharmacist/Sell/Finalize" ? (
          <span className="text-white text-3xl font-bold">Review and Print</span>
        ) : (
          <span className="text-white text-3xl font-bold">Home</span>
        )}
      </div>
    </div>
  );
}
