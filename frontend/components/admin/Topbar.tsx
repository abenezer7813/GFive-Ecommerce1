"use client";

import { FaUserCircle, FaBars } from "react-icons/fa";
import { getDecodedToken } from "@/lib/auth";

export default function Topbar() {
  const user = getDecodedToken();

  return (
<header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-40">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <button className="text-black hover:text-gray-600 md:hidden">
          <FaBars size={18} />
        </button>

        <span className="text-sm text-gray-700">
          Admin,{" "}
          <span className="font-semibold text-black">
            Nathnael
          </span>
        </span>

        {user?.role === "ROLE_ADMIN" && (
          <span className="ml-2 rounded bg-black px-2 py-0.5 text-xs text-white">
            Admin
          </span>
        )}
      </div>

      {/* Center - Search */}
      <div className="hidden md:block w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="text-black hover:text-gray-600">
          <FaUserCircle size={22} />
        </button>
      </div>
    </header>
  );
}
