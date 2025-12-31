"use client";

import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { logout } from "@/lib/logout";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const menuItems = [
  { name: "Dashboard", href: "/admin" },
  { name: "Customers", href: "/admin/customers" },
  { name: "Products", href: "/admin/products" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Categories", href: "/admin/categories" },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Overlay for small screens */}
      <div
        className={`fixed inset-0  bg-opacity-50 z-30 transition-opacity md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed left-0 top-0 w-64 h-full bg-white text-black flex flex-col z-40 transform transition-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        {/* Logo */}
        <div className="px-6 py-5 text-2xl font-bold">Admin Panel</div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-lg px-4 py-2 hover:bg-gray-800 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            className="w-full rounded-lg bg-red-600 py-2 text-sm text-white font-semibold hover:bg-red-700 transition"
            onClick={() => logout()}
          >
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
