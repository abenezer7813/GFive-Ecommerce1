import Cookies from "js-cookie";

export type ProductAnalytics = {
  totalProducts: number;
  totalStock: number;
  totalInventoryValue: number;
};

export async function getProductAnalytics(): Promise<ProductAnalytics> {
  const token = Cookies.get("token");

  // page=0, size=1 → we only want metadata
  const res = await fetch(
    "https://localhost:8081/api/products?page=0&size=1",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products analytics");
  }

  const data = await res.json();

  return {
    totalProducts: data.totalElements, // ✅ THIS IS YOUR ANSWER (16)
    totalStock: data.content.reduce(
      (sum: number, p: any) => sum + p.stockQuantity,
      0
    ),
    totalInventoryValue: data.content.reduce(
      (sum: number, p: any) => sum + p.price * p.stockQuantity,
      0
    ),
  };
}
