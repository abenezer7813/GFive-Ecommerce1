"use client";
import { useState } from "react";
import { Category } from "../../../types/types";

type Props = {
  categories: Category[];
  selectedCategoryId: number | null;
  onSelect: (id: number | null) => void;
};

export default function Categories({
  categories,
  selectedCategoryId,
  onSelect,
}: Props) {
  const [search, setSearch] = useState("");

  // Filter categories based on search input
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sticky top-20 h-screen w-1/5 px-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Categories</h1>

      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
      />

      <div className="bg-gray-50 shadow-inner rounded-2xl p-6">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => onSelect(null)} // null means no filter
              className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${selectedCategoryId === null
                  ? "bg-black hover:bg-gray-800 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                }`}
            >
              All
            </button>
          </li>
          {filteredCategories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onSelect(category.id)}
                className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategoryId === category.id
                    ? "bg-black hover:bg-gray-800 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
          {filteredCategories.length === 0 && (
            <li className="text-gray-500 text-sm">No categories found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
