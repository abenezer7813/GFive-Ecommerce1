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
    <aside className="w-60 fixed top-40 pb-35 h-[calc(100vh-1.5rem)] flex flex-col">
      <div className=" shadow-inner rounded-2xl p-6 flex flex-col flex-1">
        {/* Category List */}
        <ul className="space-y-4 flex-1 overflow-y-auto">
          <li>
            <button
              onClick={() => onSelect(null)}
              className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${selectedCategoryId === null
                  ? "bg-black text-white shadow-lg"
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
                    ? "bg-gradient-to-r from-orange-400 via-amber-400 to-amber-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Add Categories Button at Bottom */}
{categories.length > 0 && (
  <button className="bg-gray-600 text-white w-full p-2 rounded-xl mt-auto">
    Add Categories
  </button>
)}
      </div>
    </aside>
  );
}
