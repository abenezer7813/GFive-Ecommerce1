"use client";
import { useCart } from "@/Context/page";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../types/types";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

type Props = {
  products: Product[];
  loading?: boolean; // new prop to indicate loading state
};

export default function ProductsGrid({ products, loading = false }: Props) {
  const { addToCart, syncCart } = useCart();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const token = Cookies.get("token");

  const handleBuyNow = async (product: Product) => {
    if (!token) return alert("Please login to buy now");

    setLoadingId(product.id);
    try {
      await fetch(`https://localhost:8081/api/cart/add?productId=${product.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      await syncCart();

      const cartRes = await fetch("https://localhost:8081/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cartData = await cartRes.json();

      const cartItems = (cartData.items || []).map((item: any) => ({
        id: item.productId,
        title: item.productName,
        price: item.price,
        quantity: item.quantity,
        thumbnail: item.imageUrl,
      }));

      const totalAmount = cartItems.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);

      const checkoutRes = await fetch("https://localhost:8081/api/orders/checkout", {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cartItems, shippingCost: 0, totalAmount })
      });

      if (!checkoutRes.ok) throw new Error(await checkoutRes.text());

      const orderData = await checkoutRes.json();
      alert(`Order #${orderData.orderId} placed successfully!`);

      await fetch("https://localhost:8081/api/cart/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      await syncCart();
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    } finally {
      setLoadingId(null);
    }
  };

  // Skeleton array
  const skeletons = Array.from({ length: 8 });

  return (
    <div className="w-4/5 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? skeletons.map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 animate-pulse rounded-2xl min-h-[400px] flex flex-col"
              >
                <div className="h-48 bg-gray-300 rounded-t-2xl mb-4"></div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <div className="flex-1 h-10 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 h-10 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))
          : products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-2xl flex flex-col overflow-hidden hover:shadow-xl transition-shadow min-h-[400px]"
              >
                <Link href={`/user/productsDetail/${product.id}`}>
                  <div className="p-5 relative flex justify-center bg-gray-100 rounded-t-2xl">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={170}
                      height={200}
                      className="object-cover rounded-md"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
                      <span className="font-bold">{product.price} ETB</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                  </div>
                </Link>

                <div className="p-4 mt-auto">
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 border border-gray-400 rounded-full py-2 font-semibold hover:bg-gray-100"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => handleBuyNow(product)}
                      disabled={loadingId === product.id}
                      className="flex-1 border border-gray-400 rounded-full py-2 font-semibold text-white bg-black hover:bg-gray-800"
                    >
                      {loadingId === product.id ? "Processing..." : "Buy Now"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
