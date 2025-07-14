"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/pharmacist", label: "Home", icon: "🏠" },
    { href: "/pharmacist/Medicines", label: "Medicines", icon: "💊" },
    { href: "/pharmacist/Sell", label: "Sell", icon: "🛒" },
    { href: "/pharmacist/History", label: "History", icon: "📜" },
  ];

  const handleLogout = () => {
    // Add logout logic if needed
    router.push("/");
  };

  const isActive = (route: string) => pathname === route;

  const navLinkClasses = (active: boolean) =>
    `px-4 py-2 rounded-xl transition-all duration-200 text-sm sm:text-base font-medium ${
      active
        ? "bg-green-800 text-white"
        : "text-green-900 hover:bg-green-200 hover:text-green-900"
    }`;

  return (
    <header className="bg-gradient-to-r from-green-100/80 via-green-200/50 to-green-100/80 backdrop-blur-sm text-green-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-6">
          {navItems.map((item) => {
            const isExactMatch = pathname === item.href;
            const isActiveLink = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${navLinkClasses(isActiveLink)} transform ${
                  isExactMatch ? "scale-95" : "scale-100"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Profile & Logout */}
        <div className="flex items-center gap-4">
          <Link href="/pharmacist/Profile">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 transition ${
                pathname === "/pharmacist/Profile"
                  ? "bg-white border-green-800"
                  : "bg-green-100 border-green-300 hover:border-green-500"
              }`}
            >
              <span
                className={`text-2xl ${
                  pathname === "/pharmacist/Profile"
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
            className={`px-4 py-2 text-sm sm:text-base rounded-xl bg-green-800 hover:bg-red-600 text-white font-medium shadow transition duration-200 transform ${
              isActive("/pharmacist") ? "scale-95" : "scale-100"
            }`}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
