"use client";
import Cookies from "js-cookie";

import { useState } from "react";
import type { AddProduct } from "../../../types/types";

export default function ProductsPage() {
  const [form, setForm] = useState<Omit<AddProduct, "id">>({
    name: "",
    description: "",
    price: 0,
    stockQuantity:0,
    categoryId: 0,
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      setMessage("✅ Product added successfully");
      setForm({
        name: "",
        description: "",
        price: 0,
        stockQuantity: 0,
        categoryId: 0,
        imageUrl: "",
      });
    } catch (err) {
      setMessage("❌ Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold text-black mb-6">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Stock quantity"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <input
          name="categoryId"
          type="number"
          value={form.categoryId}
          onChange={handleChange}
          placeholder="Category ID"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
