import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-950 via-blue-900 to-teal-800 text-white pt-10 pb-8 px-6 sm:px-10 lg:px-16 mt-auto shadow-inner rounded-t-2xl md:rounded-t-3xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 items-center max-w-7xl mx-auto">
        {/* Left: Logo */}
        <div className="flex justify-center md:justify-start items-center">
          <div className="bg-white w-24 h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center p-1 shadow-lg border-4 border-teal-600">
            <span className="text-teal-700 text-3xl md:text-4xl font-extrabold">
              HH
            </span>
            <span className="text-teal-700 text-[10px] md:text-xs uppercase tracking-wide font-semibold">
              Hospital
            </span>
          </div>
        </div>

        {/* Center: Address & Name */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-teal-400 mb-2 tracking-wide">
            Hikmah Hospital
          </h2>
          <p className="text-sm md:text-base text-gray-200">
            Building - 5, Road - 10
          </p>
          <p className="text-sm md:text-base text-gray-200 mb-2">
            Mirpur 12, Dhaka
          </p>
          <p className="text-xs md:text-sm text-gray-400">© SPL Team 5</p>
        </div>

        {/* Right: Contact Info */}
        <div className="text-center md:text-right text-sm md:text-base text-gray-200">
          <p className="mb-1">
            Help Line:{" "}
            <span className="text-white font-medium">093-3123-456</span>
          </p>
          <p className="mb-1">
            Email:{" "}
            <span className="text-white font-medium">
              hikmahospital@gmail.com
            </span>
          </p>
          <p>
            Fax: <span className="text-white font-medium">333-444-555-666</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
