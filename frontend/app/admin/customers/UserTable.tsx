"use client";
import { User } from "@/types/User";

type Props = {
  users: User[];
  loading?: boolean; // Add loading prop
};

export default function UserTable({ users, loading = false }: Props) {
  // Skeleton component for loading state
  const SkeletonRow = () => (
    <tr className="shadow-sm h-18">
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded animate-pulse w-16"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded animate-pulse w-8"></div>
      </td>
      <td className="p-4">
        <div className="h-6 bg-gray-300 rounded-full animate-pulse w-20"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded animate-pulse w-24"></div>
      </td>
    </tr>
  );

  return (
    <div className="overflow-x-auto bg-white shadow-sm">
      <table className="w-full text-left  m-5">
        <thead className="bg-white text-black mt-20">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Gender</th>
            <th className="p-4">Age</th>
            <th className="p-4">Role</th>
            <th className="p-4">Date Created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6}>
              <hr />
            </td>
          </tr>
          {loading ? (
            // Render 5 skeleton rows
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonRow key={index} />
            ))
          ) : (
            users.map((u) => (
              <tr key={u.id} className="shadow-sm h-18 hover:bg-gray-50">
                <td className="p-4 font-medium">{u.firstName} {u.lastName}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 capitalize">{u.gender ?? "—"}</td>
                <td className="p-4">{u.age ?? "—"}</td>
                <td className="p-4">
                  <span className="px-3 py-1 text-xs font-semibold bg-black text-white rounded-full">
                    {u.roles[0]}
                  </span>
                </td>
                <td className="p-4">{u.createdAt ? new Date(u.createdAt).toLocaleString() : "—"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}