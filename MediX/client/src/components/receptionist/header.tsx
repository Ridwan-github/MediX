"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineEventNote } from "react-icons/md";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const handleLogout = () => {
    // Trigger button press animation
    setClicked(true);
    setTimeout(() => setClicked(false), 150); // Reset animation

    // Clear all localStorage data
    localStorage.clear();

    router.push("/");
  };

  return (
    <header className="bg-gradient-to-r from-green-100/80 via-green-200/50 to-green-100/80 backdrop-blur-sm text-green-900 shadow-md sticky top-0 z-50 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/receptionist"
            className={`px-4 py-2 rounded-xl transition-all duration-200 text-sm sm:text-base font-medium ${
              pathname === "/receptionist"
                ? "bg-green-800 text-white"
                : "text-green-900 hover:bg-green-200 hover:text-green-900"
            } transform flex items-center gap-1`}
          >
            <AiOutlineHome className="text-base sm:text-lg font-bold" />
            Home
          </Link>
          <Link
            href="/receptionist/appointment"
            className={`px-4 py-2 rounded-xl transition-all duration-200 text-sm sm:text-base font-medium ${
              pathname.startsWith("/receptionist/appointment")
                ? "bg-green-800 text-white"
                : "text-green-900 hover:bg-green-200 hover:text-green-900"
            } transform flex items-center gap-1`}
          >
            <MdOutlineEventNote className="text-base sm:text-lg font-bold" />
            Appointments
          </Link>
        </div>

        {/* Profile & Logout */}
        <div className="flex items-center gap-4">
          <Link href="/receptionist/profile">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 transition ${
                pathname === "/receptionist/profile"
                  ? "bg-white border-green-800"
                  : "bg-green-100 border-green-300 hover:border-green-500"
              }`}
            >
              <span
                className={`text-2xl ${
                  pathname === "/receptionist/profile"
                    ? "text-green-800"
                    : "text-green-700"
                }`}
              >
                👤
              </span>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            aria-pressed={clicked}
            className={`px-4 py-2 text-sm sm:text-base rounded-xl bg-green-800 hover:bg-red-600 text-white font-medium shadow transition duration-200 transform ${
              clicked ? "scale-95" : "scale-100"
            }`}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
