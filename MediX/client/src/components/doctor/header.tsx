"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing tokens) if needed
    router.push("/");
  };

  return (
    <header className="bg-gradient-to-br from-green-900 via-green-850 to-green-800 text-white p-4">
      <div className="flex flex-row items-center justify-between text-3xl">
        <div>
          <Link
            href="/doctor"
            className={pathname === "/doctor" ? "text-white" : "text-black"}
          >
            <span className="icon" role="img" aria-label="Home">
              🏠
            </span>{" "}
            Home
          </Link>
          <span> | </span>
          <Link
            href="/doctor/prescribe"
            className={
              pathname.startsWith("/doctor/prescribe")
                ? "text-white"
                : "text-black"
            }
          >
            <span className="icon" role="img" aria-label="Appointments">
              📅
            </span>{" "}
            Quick Prescribe
          </Link>
          <span> | </span>
          <Link
            href="/doctor/history"
            className={
              pathname.startsWith("/doctor/history")
                ? "text-white"
                : "text-black"
            }
          >
            <span className="icon" role="img" aria-label="Appointments">
              📅
            </span>{" "}
            History
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="user-profile-icon-container">
            <Link href="/doctor/profile" className="flex items-center">
              <span className="icon" role="img" aria-label="User Profile">
                {usePathname() === "/doctor/profile" ? (
                  <div className="w-10 h-10 bg-white rounded-full p-2 flex items-center justify-center shadow-lg">
                    <span className="text-2xl text-green-600">👤</span>
                  </div>
                ) : (
                  "👤"
                )}
              </span>
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-1 rounded bg-white text-green-700 hover:bg-red-600 hover:text-white transition-colors duration-200 text-base font-semibold shadow"
            style={{ fontSize: "1rem" }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
