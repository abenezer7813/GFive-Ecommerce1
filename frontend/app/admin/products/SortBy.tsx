"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import type { AddProduct, Product, Category } from "../../../types/types";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { getProducts, getCategories } from "../../user/product/data";
import Categories from "./Categories";

type Props = {
  field: "name" | "price" | "createdAt";
  order: "asc" | "desc";
  onFieldChange: (f: "name" | "price" | "createdAt") => void;
  onOrderChange: (o: "asc" | "desc") => void;
};

export default function SortBy({
  field,
  order,

  onFieldChange,
  onOrderChange,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [form, setForm] = useState<Omit<AddProduct, "id">>({
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    categoryId: 0,
    imageUrl: "",
  });
  async function loadData() {
    const categoriesPage = await getCategories(0, 50);

    // 👇 THIS IS THE MOST IMPORTANT PART
    setCategories(categoriesPage.content);
  }

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
      if (!res.ok) throw new Error("Failed to add product");
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
    } catch (err) {
      setMessage("❌ Error adding product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
  loadData();
}, []);

  return (
    <div className="sticky top-20 right-0 z-50 bg-white shadow-sm p-4 flex justify-between">
      <h1 className="text-2xl font-bold">Products</h1>

      <div className="flex gap-3">
        <select
          value={field}
          onChange={(e) =>
            onFieldChange(e.target.value as "name" | "price" | "createdAt")
          }
          className="border rounded-lg px-4 py-2"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="date">date</option>
        </select>

        <button
          onClick={() => onOrderChange(order === "asc" ? "desc" : "asc")}
          className="border rounded-lg p-2"
        >
          {order === "asc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
        </button>
        {/* Add Product Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="w-fit py-1 px-4 text-white bg-black rounded-xl"
        >
          Add Product
        </button>
      </div>
      {/* Add Product Sidebar */}
      {isSidebarOpen && (
        <aside className="fixed top-0 right-0 z-50 w-[500px] h-screen bg-white shadow-2xl p-6 flex flex-col animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-black">
              Add New Product
            </h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-2xl font-bold text-red-500"
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1 gap-4 overflow-y-auto"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows={4}
              required
            />
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <input
              name="stockQuantity"
              type="number"
              value={form.stockQuantity}
              onChange={handleChange}
              placeholder="Stock Quantity"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={(e) =>
                setForm({
                  ...form,
                  categoryId: Number(e.target.value),
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value={0} disabled>
                Select Category
              </option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />

            {/* Submit Button at Bottom */}
            <div className="mt-auto">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </form>

          {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
        </aside>
      )}
    </div>
  );
}
