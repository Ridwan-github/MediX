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

  const isActive = (route: string) => pathname === route;

  const navLinkClasses = (active: boolean) =>
    `px-4 py-2 rounded-md transition-all duration-200 text-sm sm:text-base ${
      active
        ? "bg-violet-700 text-white"
        : "text-gray-300 hover:bg-violet-800 hover:text-white"
    }`;

  return (
    <header className="bg-gradient-to-r from-indigo-950 via-violet-900 to-indigo-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo / Navigation */}
        <div className="flex items-center gap-2 sm:gap-6">
          <Link href="/doctor" className={navLinkClasses(isActive("/doctor"))}>
            🏠 Home
          </Link>
          <Link
            href="/doctor/prescribe"
            className={navLinkClasses(isActive("/doctor/prescribe"))}
          >
            💊 Quick Prescribe
          </Link>
          <Link
            href="/doctor/history"
            className={navLinkClasses(isActive("/doctor/history"))}
          >
            📜 History
          </Link>
        </div>

        {/* Profile & Logout */}
        <div className="flex items-center gap-4">
          <Link href="/doctor/profile">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 ${
                pathname === "/doctor/profile"
                  ? "bg-white border-violet-700"
                  : "bg-gray-800 border-gray-600 hover:border-violet-600"
              }`}
            >
              <span
                className={`text-2xl ${
                  pathname === "/doctor/profile"
                    ? "text-violet-700"
                    : "text-white"
                }`}
              >
                👤
              </span>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm sm:text-base rounded-md bg-violet-700 hover:bg-red-600 text-white font-medium shadow transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
