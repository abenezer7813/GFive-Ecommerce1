"use client";
import { useEffect, useState } from "react";
import { User } from "@/types/types";
import { getUsers } from "../../user/product/data";
import UserToolbar from "./UserToolbar";
import UserTable from "./UserTable";

type SortField = "firstName" | "email" | "age" | "gender" | "createdAt";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortField, setSortField] = useState<SortField>("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function loadUsers() {
      setLoading(true); // Set loading to true before fetching
      try {
        const data = await getUsers(0, 10, sortField, sortOrder);
        setUsers(data.content);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }
    loadUsers();
  }, [sortField, sortOrder]);

  return (
    <div className=" ">
      <UserToolbar
        field={sortField}
        order={sortOrder}
        onFieldChange={setSortField}
        onOrderChange={setSortOrder}
      />

      <UserTable users={users} loading={loading} /> {/* Pass loading prop */}
    </div>
  );
}