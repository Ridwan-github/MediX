"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <header className="backdrop-blur-md bg-green-600/15 border-b border-green-100 shadow-md p-4 rounded-b-2xl mx-4 mt-4">
      <div className="flex flex-row items-center justify-between text-lg md:text-2xl font-medium text-gray-800">
        {/* Left: Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            href="/receptionist"
            className={`transition-colors duration-200 ${
              pathname === "/receptionist"
                ? "text-green-700 font-semibold"
                : "text-gray-600 hover:text-green-700"
            }`}
          >
            <span role="img" aria-label="Home" className="mr-1">
              🏠
            </span>
            Home
          </Link>

          <Link
            href="/receptionist/appointment"
            className={`transition-colors duration-200 ${
              pathname.startsWith("/receptionist/appointment")
                ? "text-green-700 font-semibold"
                : "text-gray-600 hover:text-green-700"
            }`}
          >
            <span role="img" aria-label="Appointments" className="mr-1">
              📅
            </span>
            Appointments
          </Link>
        </div>

        {/* Right: Profile Icon and Logout */}
        <div className="flex items-center gap-4">
          <Link href="/receptionist/profile" className="relative">
            {pathname === "/receptionist/profile" ? (
              <div className="w-10 h-10 bg-green-100 rounded-full p-2 flex items-center justify-center shadow-md">
                <span className="text-xl text-green-700">👤</span>
              </div>
            ) : (
              <span className="text-2xl text-gray-600 hover:text-green-700 transition">
                👤
              </span>
            )}
          </Link>

          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-1 rounded-lg bg-green-600/10 text-green-800 hover:bg-red-600 hover:text-white transition-colors duration-200 text-sm font-semibold shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
