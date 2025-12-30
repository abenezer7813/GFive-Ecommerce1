"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: { id: number; name: string; price: number; imageUrl: string }) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  loading: boolean;
  syncCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");
  const API_URL = "https://localhost:8081/api/cart";

  // Fetch cart from API
  const fetchCartFromAPI = async () => {
    if (!token) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();

      // Map backend response to frontend CartItem
      const apiCart: CartItem[] = (data.items || []).map((item: any) => ({
        id: item.productId,
        title: item.productName,
        price: item.price,
        quantity: item.quantity,
        thumbnail: item.imageUrl,
      }));

      setCart(apiCart);
    } catch (err) {
      console.error(err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  // Sync cart manually
  const syncCart = () => fetchCartFromAPI();

  useEffect(() => {
    if (token) fetchCartFromAPI();
  }, [token]);

  // Add product to cart
  const addToCart = async (product: { id: number; name: string; price: number; imageUrl: string }) => {
    if (!token) return;

    try {
      await fetch(`${API_URL}/add?productId=${product.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCartFromAPI(); // refresh cart
    } catch (err) {
      console.error(err);
    }
  };

  // Remove product from cart
  const removeFromCart = async (id: number) => {
    if (!token) return;

    try {
      await fetch(`${API_URL}/remove?productId=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCartFromAPI(); // refresh cart
    } catch (err) {
      console.error(err);
    }
  };

  // Update quantity
  const updateQty = async (id: number, qty: number) => {
    if (!token) return;

    try {
      if (qty <= 0) {
        await removeFromCart(id);
        return;
      }

      // Delete existing
      await fetch(`${API_URL}/remove?productId=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      // Add again with new quantity
      for (let i = 0; i < qty; i++) {
        await fetch(`${API_URL}/add?productId=${id}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      await fetchCartFromAPI(); // refresh cart
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, loading, syncCart }}>
      {children}
    </CartContext.Provider>
  );
};
