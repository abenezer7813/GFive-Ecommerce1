import Cookies from "js-cookie";
import { Product, Category } from "../../../types/types";
import { PageResponse } from "../../../types/page";

const API = "https://localhost:8081";

// PRODUCTS
export async function getProducts(
  page = 0,
  size = 10
): Promise<PageResponse<Product>> {
  const token = Cookies.get("token");

  const res = await fetch(`${API}/api/products?page=${page}&size=${size}&`,
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json(); // must be Product[]
}

export async function getCategories(page = 0, size = 10): Promise<PageResponse<Category>> {
  const token = Cookies.get("token");

  const res = await fetch(`${API}/categories?page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json(); // must be Category[]
}
