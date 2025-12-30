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
// SINGLE PRODUCT
export async function getProductById(id: number): Promise<Product> {
  const token = Cookies.get("token");

  const res = await fetch(`${API}/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

// SIMILAR PRODUCTS (by category) - Also add logging
export async function getProductsByCategory(
  categoryId: number,
  page = 0,
  size = 4
): Promise<PageResponse<Product>> {
  try {
    const token = Cookies.get("token");
    console.log("Fetching products for category:", categoryId);
    
    const url = `${API}/api/products?categoryId=${categoryId}&page=${page}&size=${size}`;
    console.log("API URL:", url);

    const res = await fetch(url, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      },
      cache: "no-store",
      credentials: 'include'
    });

    console.log("Category response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch similar products: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    console.log("Similar products data:", data);
    return data;
  } catch (error) {
    console.error("getProductsByCategory error:", error);
    throw error;
  }
}

// Other functions remain the same...