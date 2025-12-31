"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/app/user/product/data";
import { User as UserType } from "@/types/User";

// Helper function to format date nicely
const formatDate = (iso?: string) => {
  if (!iso) return "—";
  try {
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", {
      weekday: "short", // e.g., "Fri"
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
};

const LatestUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers(0, 10, "createdAt", "desc");
        setUsers(data.content);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-bold mb-4">Latest Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-black">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Gender</th>
              <th className="p-2 text-right">Created Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5}>
                <hr className="border-gray-400 " />
              </td>
            </tr>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="shadow-sm h-13">
                  <td className="p-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                </tr>
              ))
            ) : (
              users.map((u: UserType) => (
                <tr key={u.id} className="shadow-sm h-13 hover:bg-gray-50">
                  <td className="p-2 font-medium">{u.firstName} {u.lastName}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2 capitalize">{u.gender ?? "—"}</td>
                  <td className="p-2">{formatDate(u.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestUsers;