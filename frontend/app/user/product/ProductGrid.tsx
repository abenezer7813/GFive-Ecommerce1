"use client";
import { useCart } from "@/Context/page";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../types/types";
import { useState } from "react";
import Cookies from "js-cookie";

type Props = {
  products: Product[];
};

export default function ProductsGrid({ products }: Props) {
  const { addToCart, syncCart } = useCart();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const token = Cookies.get("token");

  const handleBuyNow = async (product: Product) => {
    if (!token) return alert("Please login to buy now");

    setLoadingId(product.id);
    try {
      // 1️⃣ Add product to backend cart
      await fetch(`https://localhost:8081/api/cart/add?productId=${product.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      // 2️⃣ Sync cart
      await syncCart();

      // 3️⃣ Get cart items from backend
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

      // 4️⃣ Call checkout API
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

      // 5️⃣ Clear cart
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

  return (
    <div className="w-full md:w-4/5 p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="bg-gradient-to-b from-white to-gray-50 shadow-md rounded-2xl flex flex-col overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 min-h-[400px] animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Link href={`/user/productsDetail/${product.id}`}>
              <div className="p-2 md:p-3 relative flex justify-center bg-gray-100 rounded-t-2xl">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={190}
                  height={10}
                  className="object-contain rounded-md w-full h-38 md:h-40"
                />
              </div>

              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg md:text-xl font-bold line-clamp-2 text-gray-900 leading-tight">
                    {product.name}
                  </h3>
                  <span className="font-bold text-lg text-black drop-shadow-sm">
                    {product.price} ETB
                  </span>
                </div>
                <p className="text-gray-600 text-sm md:text-base line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </Link>

            <div className="p-4 mt-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 border rounded-xl border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => handleBuyNow(product)}
                  disabled={loadingId === product.id}
                  className="flex-1 border order-black  rounded-xl py-3 font-semibold text-white bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-black flex items-center justify-center"
                >
                  {loadingId === product.id ? (
                    <>
                      <div className="animate-spin border rounded-xl h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    "Buy Now"
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}