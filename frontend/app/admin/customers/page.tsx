"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/User";
import { getUsers, toggleUserStatus } from "../../user/product/data";
import UserToolbar from "./UserToolbar";

type SortField = "firstName" | "email" | "age" | "gender" | "createdAt";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortField, setSortField] = useState<SortField>("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [togglingUserId, setTogglingUserId] = useState<number | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers(page, 10, sortField, sortOrder);
        setUsers(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [sortField, sortOrder, page]);

  const handleToggleUser = async (user: User) => {
    try {
      setTogglingUserId(user.id);
      await toggleUserStatus(user.id, !user.enabled);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, enabled: !u.enabled } : u))
      );
    } catch (err) {
      console.error("Failed to toggle user status:", err);
      alert("Failed to toggle user status");
    } finally {
      setTogglingUserId(null);
    }
  };

  return (
    <div className="p-6">
      <UserToolbar
        field={sortField}
        order={sortOrder}
        onFieldChange={setSortField}
        onOrderChange={setSortOrder}
      />

      <div className="overflow-x-auto bg-white shadow-sm mt-4 rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Age</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date Created</th>
            </tr>
          </thead>
         <tbody>
  {loading
    ? Array.from({ length: 5 }).map((_, idx) => (
        <tr key={idx} className="h-16">
          {Array.from({ length: 7 }).map((_, i) => (
            <td key={i} className="p-4">
              <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))
    : users
        .filter((u) => !u.roles?.includes("ROLE_ADMIN")) // <-- filter out admin
        .map((u) => (
          <tr key={u.id} className="h-16 hover:bg-gray-50">
            <td className="p-4 font-medium">
              {u.firstName} {u.lastName}
            </td>
            <td className="p-4">{u.email}</td>
            <td className="p-4 capitalize">{u.gender ?? "—"}</td>
            <td className="p-4">{u.age ?? "—"}</td>
            <td className="p-4">
              <span className="px-3 py-1 text-xs font-semibold bg-black text-white rounded-full">
                {u.roles && u.roles.length > 0 ? u.roles[0] : "—"}
              </span>
            </td>
            <td className="p-4">
              <button
                disabled={togglingUserId === u.id}
                onClick={() => handleToggleUser(u)}
                className={`px-3 py-1 rounded-full text-white ${
                  u.enabled ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {togglingUserId === u.id
                  ? "Updating..."
                  : u.enabled
                  ? "Enabled"
                  : "Disabled"}
              </button>
            </td>
            <td className="p-4">
              {u.createdAt ? new Date(u.createdAt).toLocaleString() : "—"}
            </td>
          </tr>
        ))}
</tbody>

        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-4 my-4">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1">
            Page {page + 1} / {totalPages}
          </span>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
