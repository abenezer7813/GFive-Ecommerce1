export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

// Async function to fetch products
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://dummyjson.com/products", {
      cache: "no-store", // always fresh
    });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data.products; // dummyjson returns { products: [...] }
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Optional: categories array extracted from products
export const categories: string[] = [
  "All",
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
];
