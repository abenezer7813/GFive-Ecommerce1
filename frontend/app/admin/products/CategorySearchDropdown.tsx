"use client";

import { useState } from "react";
import { Category } from "../../../types/types";
import { FaFilter } from "react-icons/fa";

type Props = {
  categories: Category[];
  selectedCategoryId: number | null;
  onSelect: (id: number | null) => void;
};

export default function CategorySearchDropdown({
  categories,
  selectedCategoryId,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        <FaFilter />
        <span className="font-medium">
          {selectedCategoryId
            ? categories.find((c) => c.id === selectedCategoryId)?.name
            : "All Categories"}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full mt-2 w-72 bg-white rounded-xl shadow-2xl z-50 p-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          {/* List */}
          <ul className="max-h-60 overflow-y-auto space-y-1">
            <li>
              <button
                onClick={() => {
                  onSelect(null);
                  setOpen(false);
                  setQuery("");
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition ${
                  selectedCategoryId === null
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                All
              </button>
            </li>

            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => {
                      onSelect(category.id);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedCategoryId === category.id
                        ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 px-3 py-2">
                No categories found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
