"use client";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

type Props = {
  field: string;
  order: "asc" | "desc";
  onFieldChange: (field: string) => void;
  onOrderChange: (order: "asc" | "desc") => void;
};

export default function SortUsers({
  field,
  order,
  onFieldChange,
  onOrderChange,
}: Props) {
  return (
    <div className="flex gap-3 items-center mb-4">
      <select
        value={field}
        onChange={(e) => onFieldChange(e.target.value)}
        className="border rounded-lg px-4 py-2"
      >
        <option value="firstName">Name</option>
        <option value="age">Age</option>
        <option value="email">Email</option>
        <option value="gender">Gender</option>
        <option value="id">Date</option>
      </select>

      <button
        onClick={() => onOrderChange(order === "asc" ? "desc" : "asc")}
        className="border rounded-lg p-2"
      >
        {order === "asc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
      </button>
    </div>
  );
}
