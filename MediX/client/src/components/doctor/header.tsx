"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
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
            className="px-4 py-2 text-sm sm:text-base rounded-xl bg-green-800 hover:bg-red-600 text-white font-medium shadow transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
