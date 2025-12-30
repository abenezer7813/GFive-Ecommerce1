"use client";

import { logout } from "@/lib/logout";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", href: "/admin" },
  { name: "Customers", href: "/admin/users" },
  { name: "Products", href: "/admin/products" },
  { name: "Orders", href: "/admin/orders" },
];

export default function Sidesbar() {
  const pathname = usePathname();

  return (
    <aside className=" fixed left-0 top-0  w-64 min-h-screen bg-white text-black flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 text-2xl font-bold ">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 ">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block rounded-lg px-4 py-2 transition
              ${
                pathname === item.href
                  ? "bg-black text-white"
                  : "text-blck hover:bg-gray-800 hover:text-white"
              }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          className="w-full rounded-lg bg-red-600 py-2 text-sm text-white font-semibold hover:bg-red-700 transition"
          onClick={() => {
            // TODO: call logout API
            logout();
            console.log("logout");
          }}
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
