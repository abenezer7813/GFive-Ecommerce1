"use client";

type CategoriesProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

export default function Categories({
  categories,
  selectedCategory,
  onSelect,
}: CategoriesProps) {
  return (
    <div className="sticky top-20 h-screen w-1/5 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Categories</h1>

      <div className="bg-gray-50 shadow-inner rounded-2xl p-6">
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onSelect(category)}
                className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-orange-400 via-amber-400 to-amber-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
