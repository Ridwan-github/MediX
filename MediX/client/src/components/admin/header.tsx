"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineListAlt } from "react-icons/md";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [clickedHome, setClickedHome] = useState(false);
  const [clickedAddUser, setAddUser] = useState(false);
  const [clickedRecord, setRecords] = useState(false);

  const handleLogout = () => {
    // Trigger button press animation
    setClicked(true);
    setTimeout(() => setClicked(false), 190); // Reset animation

    router.push("/");
  };

  const handleNavClick = (navType: string) => {
    // Trigger button press animation based on nav type
    switch (navType) {
      case 'Home':
        setClickedHome(true);
        setTimeout(() => setClickedHome(false), 150);
        break;
      case 'Add User':
        setAddUser(true);
        setTimeout(() => setAddUser(false), 150);
        break;
      case 'Records':
        setRecords(true);
        setTimeout(() => setRecords(false), 150);
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
            href="/admin" 
            className={`${navLinkClasses(isActive("/admin"))} transform ${
              clickedHome ? "scale-95" : "scale-100"
            } flex items-center gap-1`}
            onClick={() => handleNavClick('home')}
          >
            <AiOutlineHome className="text-base sm:text-lg font-bold" />
            Home
          </Link>
          <Link
            href="/admin/Add_User"
            className={`${navLinkClasses(isActive("/admin/Add_User"))} transform ${
              clickedAddUser ? "scale-95" : "scale-100"
            } flex items-center gap-1`}
            onClick={() => handleNavClick('Add User')}
          >
            <AiOutlineUserAdd className="text-base sm:text-lg font-bold" />
            Add User
          </Link>
          <Link
            href="/admin/Records"
            className={`${navLinkClasses(isActive("/doctor/list"))} transform ${
              clickedRecord ? "scale-95" : "scale-100"
            } flex items-center gap-1`}
            onClick={() => handleNavClick('Records')}
          >
            <MdOutlineListAlt className="text-base sm:text-lg font-bold" />
            Records
          </Link>
        </div>

        {/* Profile & Logout */}
        <div className="flex items-center gap-4">
          <Link href="/admin/Profile">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 transition ${
                pathname === "/admin/Profile"
                  ? "bg-white border-green-800"
                  : "bg-green-100 border-green-300 hover:border-green-500"
              }`}
            >
              <span
                className={`text-2xl ${
                  pathname === "/admin/Profile"
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
