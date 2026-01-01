"use client"; // ⚠️ Add this at the top

import Sidebar from "@/components/admin/Sidesbar";
import Topbar from "@/components/admin/Topbar";
import type { ReactNode } from "react";
import { useState } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // state to control sidebar open on small screens
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className=" bg-gray-100 h-screen overflow-y-auto ">
          {children}
        </main>
      </div>
    </div>
  );
}
