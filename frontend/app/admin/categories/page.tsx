"use client";

import { useState, useEffect } from "react";
import { Category } from "../../../types/types";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/app/user/product/data";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

type Props = {
  selectedCategoryId?: number | null;
  onSelect: (id: number | null) => void;
};

export default function Categories({ selectedCategoryId, onSelect }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Load categories
  const loadCategories = async () => {
    try {
      const categoriesPage = await getCategories(0, 50);
      setCategories(categoriesPage.content || []);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      setIsAdding(true);
      await createCategory({
        name: newCategoryName,
        description: newCategoryDescription,
      });
      setNewCategoryName("");
      setNewCategoryDescription("");
      await loadCategories();
    } catch (err) {
      console.error("Failed to create category:", err);
    } finally {
      setIsAdding(false);
    }
  };

  // Update category
  const handleUpdateCategory = async (category: Category) => {
    if (!category.name.trim()) return;
    try {
      setLoading(true);
      await updateCategory(category.id, {
        name: category.name,
        description: category.description,
        id: 0,
      });
      setEditingCategory(null);
      await loadCategories();
    } catch (err) {
      console.error("Failed to update category:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
  if (!confirm("Are you sure you want to delete this category?")) return;

  try {
    setLoading(true);
    await deleteCategory(id);
    await loadCategories();
  } catch (err: any) {
    // Check if the error has a response with JSON
    if (err instanceof Error) {
      alert(err.message); // fallback
    } else if (err?.status === 409 && err?.message) {
      alert(err.message); // show backend message
    } else {
      console.error("Failed to delete category:", err);
      alert("Failed to delete category");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">Categories Management</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Category List */}
          <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
            <ul className="space-y-3 max-h-96 overflow-y-auto">
             

              {categories.map((category) => (
                <li key={category.id} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {editingCategory?.id === category.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingCategory.name}
                            onChange={(e) =>
                              setEditingCategory({ ...editingCategory, name: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Category Name"
                          />
                          <textarea
                            value={editingCategory.description}
                            onChange={(e) =>
                              setEditingCategory({ ...editingCategory, description: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Category Description"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateCategory(editingCategory)}
                              disabled={loading}
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                            >
                              {loading ? "Saving..." : "Save"}
                            </button>
                            <button
                              onClick={() => setEditingCategory(null)}
                              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => onSelect(category.id)}
                          className={`w-full text-left py-2 px-3 rounded-lg font-medium transition-all duration-200 ${
                            selectedCategoryId === category.id
                              ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-md"
                              : "text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <div className="font-semibold">{category.name}</div>
                          {category.description && (
                            <div className="text-sm text-gray-500 mt-1">{category.description}</div>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Edit / Delete buttons */}
                    {editingCategory?.id !== category.id && (
                      <div className="flex flex-col gap-2 ml-4">
                        <button
                          onClick={() => setEditingCategory(category)}
                          className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Add Category Form */}
          <div className="sticky flex-1 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaPlus /> Add New Category
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category name..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              <textarea
                placeholder="Category description..."
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none transition"
                rows={4}
              />
              <button
                onClick={handleAddCategory}
                disabled={isAdding}
                className={`w-full px-4 py-3 rounded-lg transition flex items-center justify-center gap-2 text-black ${
                  newCategoryName.trim()
                    ? " "
                    : "bg-gray-300 text-gray-500 "
                }`}
              >
                {isAdding ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 bg-amber-300 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <FaPlus /> Add Category
                  </>
                )}
              </button>
              {!newCategoryName.trim() && (
                <p className="text-sm text-gray-500">Please enter a category name to enable the add button.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}