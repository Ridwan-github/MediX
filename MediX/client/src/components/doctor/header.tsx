"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [clickedHome, setClickedHome] = useState(false);
  const [clickedPrescribe, setClickedPrescribe] = useState(false);
  const [clickedList, setClickedList] = useState(false);
  const [clickedHistory, setClickedHistory] = useState(false);

  const handleLogout = () => {
    // Trigger button press animation
    setClicked(true);
    setTimeout(() => setClicked(false), 190); // Reset animation

    router.push("/");
  };

  const handleNavClick = (navType: string) => {
    // Trigger button press animation based on nav type
    switch (navType) {
      case 'home':
        setClickedHome(true);
        setTimeout(() => setClickedHome(false), 150);
        break;
      case 'prescribe':
        setClickedPrescribe(true);
        setTimeout(() => setClickedPrescribe(false), 150);
        break;
      case 'list':
        setClickedList(true);
        setTimeout(() => setClickedList(false), 150);
        break;
      case 'history':
        setClickedHistory(true);
        setTimeout(() => setClickedHistory(false), 150);
        break;
    }
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
          <Link 
            href="/doctor" 
            className={`${navLinkClasses(isActive("/doctor"))} transform ${
              clickedHome ? "scale-95" : "scale-100"
            }`}
            onClick={() => handleNavClick('home')}
          >
            🏠 Home
          </Link>
          <Link
            href="/doctor/prescribe"
            className={`${navLinkClasses(isActive("/doctor/prescribe"))} transform ${
              clickedPrescribe ? "scale-95" : "scale-100"
            }`}
            onClick={() => handleNavClick('prescribe')}
          >
            💊 Quick Prescribe
          </Link>
          <Link
            href="/doctor/list"
            className={`${navLinkClasses(isActive("/doctor/list"))} transform ${
              clickedList ? "scale-95" : "scale-100"
            }`}
            onClick={() => handleNavClick('list')}
          >
            📋 List
          </Link>
          <Link
            href="/doctor/history"
            className={`${navLinkClasses(isActive("/doctor/history"))} transform ${
              clickedHistory ? "scale-95" : "scale-100"
            }`}
            onClick={() => handleNavClick('history')}
          >
            📜 History
          </Link>
        </div>

        {/* Profile & Logout */}
        <div className="flex items-center gap-4">
          <Link href="/doctor/profile">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 transition ${
                pathname === "/doctor/profile"
                  ? "bg-white border-green-800"
                  : "bg-green-100 border-green-300 hover:border-green-500"
              }`}
            >
              <span
                className={`text-2xl ${
                  pathname === "/doctor/profile"
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
