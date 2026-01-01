"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import type { AddProduct, Category } from "../../../types/types";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { getCategories } from "../../user/product/data";

type Props = {
  field: "name" | "price" | "createdAt";
  order: "asc" | "desc";

  selectedCategoryId: number | null;
  onCategoryChange: (id: number | null) => void;

  onFieldChange: (f: "name" | "price" | "createdAt") => void;
  onOrderChange: (o: "asc" | "desc") => void;
};

export default function SortBy({
  field,
  order,
  selectedCategoryId,
  onCategoryChange,
  onFieldChange,
  onOrderChange,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState<Omit<AddProduct, "id">>({
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    categoryId: 0,
    imageUrl: "",
  });

  // 🔹 LOAD CATEGORIES
  useEffect(() => {
    (async () => {
      const res = await getCategories(0, 50);
      setCategories(res.content);
    })();
  }, []);

  // 🔹 FORM HANDLERS
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = Cookies.get("token");

      const res = await fetch("https://localhost:8081/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stockQuantity: Number(form.stockQuantity),
          categoryId: Number(form.categoryId),
        }),
      });

      if (!res.ok) throw new Error();

      setMessage("✅ Product added successfully");
      setForm({
        name: "",
        description: "",
        price: 0,
        stockQuantity: 0,
        categoryId: 0,
        imageUrl: "",
      });
      setIsSidebarOpen(false);
    } catch {
      setMessage("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔝 TOP BAR */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="flex gap-3 items-center">
          {/* 📂 CATEGORY */}
          <select
            value={selectedCategoryId ?? ""}
            onChange={(e) =>
              onCategoryChange(
                e.target.value ? Number(e.target.value) : null
              )
            }
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* 🔃 SORT FIELD */}
          <select
            value={field}
            onChange={(e) =>
              onFieldChange(e.target.value as "name" | "price" | "createdAt")
            }
            className="border rounded-lg px-4 py-2"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="createdAt">Date</option>
          </select>

          {/* 🔼🔽 SORT ORDER */}
          <button
            onClick={() =>
              onOrderChange(order === "asc" ? "desc" : "asc")
            }
            className="border rounded-lg p-2"
          >
            {order === "asc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
          </button>

          {/* ➕ ADD PRODUCT */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="px-4 py-2 bg-black text-white rounded-xl"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* 🧾 ADD PRODUCT SIDEBAR */}
      {isSidebarOpen && (
        <aside className="fixed top-0 right-0 z-50 w-[480px] h-screen bg-white shadow-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Product</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-2xl font-bold text-red-500"
            >
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 flex-1 overflow-y-auto"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product name"
              className="border rounded-lg px-4 py-2"
              required
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows={4}
              className="border rounded-lg px-4 py-2"
              required
            />

            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="border rounded-lg px-4 py-2"
              required
            />

            <input
              name="stockQuantity"
              type="number"
              value={form.stockQuantity}
              onChange={handleChange}
              placeholder="Stock quantity"
              className="border rounded-lg px-4 py-2"
              required
            />

            <select
              value={form.categoryId}
              onChange={(e) =>
                setForm({ ...form, categoryId: Number(e.target.value) })
              }
              className="border rounded-lg px-4 py-2"
              required
            >
              <option value={0} disabled>
                Select category
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              className="border rounded-lg px-4 py-2"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-auto bg-black text-white py-2 rounded-lg"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>

            {message && (
              <p className="text-sm text-center text-gray-600">
                {message}
              </p>
            )}
          </form>
        </aside>
      )}
    </>
  );
}
