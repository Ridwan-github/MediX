import React from "react";

export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-green-600/15 border-t border-green-100 text-gray-700 pt-10 pb-8 px-6 sm:px-10 lg:px-16 mt-auto shadow-inner rounded-t-2xl md:rounded-t-3xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 items-center max-w-7xl mx-auto">
        {/* Left: Logo */}
        <div className="flex justify-center md:justify-start items-center">
          <div
            className="
              bg-white 
              w-24 h-24 md:w-28 md:h-28 
              rounded-full 
              p-1 
              shadow-lg 
              border-4 border-green-300 
              overflow-hidden    /* clip children */
              flex items-center justify-center
            "
          >
            <img
              src="/logo.jpg"
              alt="Hospital Logo"
              className="w-full h-full object-contain" /* scale inside */
            />
          </div>
        </div>

        {/* Center: Address & Name */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-2 tracking-wide">
            Hikmah Hospital
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Building - 5, Road - 10
          </p>
          <p className="text-sm md:text-base text-gray-600 mb-2">
            Mirpur 12, Dhaka
          </p>
          <p className="text-xs md:text-sm text-gray-400">© SPL Team 5</p>
        </div>

        {/* Right: Contact Info */}
        <div className="text-center md:text-right text-sm md:text-base text-gray-600">
          <p className="mb-1">
            Help Line:{" "}
            <span className="text-green-700 font-medium">093-3123-456</span>
          </p>
          <p className="mb-1">
            Email:{" "}
            <span className="text-green-700 font-medium">
              hikmahospital@gmail.com
            </span>
          </p>
          <p>
            Fax:{" "}
            <span className="text-green-700 font-medium">333-444-555-666</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
