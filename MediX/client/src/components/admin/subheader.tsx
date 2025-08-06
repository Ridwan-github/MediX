import React from "react";
import { usePathname } from "next/navigation";

export default function SubHeader() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/admin/Users") return "Users";
    if (pathname === "/admin/Medicines") return "Medicines";
    if (pathname === "/admin/Orders") return "Orders";
    return "Admin Dashboard";
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4">
        <div className="bg-green-100/60 backdrop-blur-sm rounded-2xl shadow-sm py-5 px-6 text-center border border-green-300">
          <h1 className="text-green-900 text-3xl sm:text-4xl font-semibold tracking-wide">
            {getTitle()}
          </h1>
        </div>
      </div>
    </div>
  );
}