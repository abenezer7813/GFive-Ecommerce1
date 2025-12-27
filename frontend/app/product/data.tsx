// app/product/data.ts
import Cookies from "js-cookie";
import { Product, Category } from "../../types/types";

const API = "https://localhost:8081";

export async function getProducts(): Promise<Product[]> {
  const token = Cookies.get("token");

  const res = await fetch(`${API}/api/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json(); // must be Product[]
}

export async function getCategories(): Promise<Category[]> {
  const token = Cookies.get("token");

  const res = await fetch(`${API}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json(); // must be Category[]
}
