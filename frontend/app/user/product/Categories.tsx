"use client";
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
  return (
    <div className="sticky top-20 h-screen w-1/5 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Categories</h1>

      <div className="bg-gray-50 shadow-inner rounded-2xl p-6">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => onSelect(null)} // null means no filter
              className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${selectedCategoryId === null
                  ? " bg-black hover:bg-gray-800 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                }`}
            >
              All
            </button>
          </li>
          {categories.map((category) => (
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
        </ul>
      </div>
    </div>
  );
}
