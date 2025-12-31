"use client";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

type Props = {
  field: "firstName" | "email" | "age" | "gender" | "createdAt";
  order: "asc" | "desc";
  onFieldChange: (f: "firstName" | "email" | "age" | "gender" | "createdAt") => void;
  onOrderChange: (o: "asc" | "desc") => void;
};

export default function UserToolbar({
  field,
  order,
  onFieldChange,
  onOrderChange,
}: Props) {
  return (
    <div className="sticky top-0  z-50 bg-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-black">Users</h1>

      <div className="flex items-center gap-3">
        <select
          value={field}
          onChange={(e) =>
            onFieldChange(e.target.value as "firstName" | "email" | "age" | "gender" | "createdAt")
          }
          className="border rounded-lg px-4 py-2"
        >
          <option value="firstName">Name</option>
          <option value="email">Email</option>
          <option value="age">Age</option>
          <option value="gender">Gender</option>
          <option value="createdAt">Date Created</option>
        </select>

        <button
          onClick={() => onOrderChange(order === "asc" ? "desc" : "asc")}
          className="border rounded-lg p-2"
        >
          {order === "asc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
        </button>
      </div>
    </div>
  );
}
