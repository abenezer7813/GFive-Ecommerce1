"use client";
import { IoArrowBack } from "react-icons/io5";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/Context/page";
import { FaTrashAlt } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, loading, syncCart } = useCart();
  const [shipping, setShipping] = useState<number>(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) syncCart();
  }, [token]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!token) return alert("Please login to checkout");

    setCheckoutLoading(true);
    try {
      const res = await fetch("https://localhost:8081/api/orders/checkout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cart, shippingCost: shipping, totalAmount: total }),
      });

      if (!res.ok) throw new Error(await res.text());
      const orderData = await res.json();
      alert(`Order #${orderData.orderId} placed successfully!`);

      await syncCart();
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleUpdateQty = (id: number, qty: number) => updateQty(id, qty);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Add some products to get started!
          </p>
          <Link href="/user/product">
            <button className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:px-10 pt-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 md:p-10 overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 md:w-[46rem] h-64 md:h-[36rem] bg-gradient-to-br from-blue-100/20 to-transparent rounded-bl-full animate-pulse"></div>

          {/* Header */}
        <div className="relative flex flex-col md:flex-row mb-10 justify-between items-start md:items-center gap-4">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg ml-4 md:ml-10 animate-slide-in-left">My Cart</h1>
          <Link
            href="/user/product"
            className="flex items-center gap-2 py-3 px-6 bg-gray-50 border rounded-xl border-gray-300 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <IoArrowBack size={24} />
            Continue shopping
          </Link>
        </div>

        {/* Cart Table */}
        <div className="overflow-x-auto mb-40 animate-fade-in-up">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-500 uppercase text-sm border-b border-gray-200">
                <th className="p-3 font-semibold">Product</th>
                <th className="p-3 font-semibold hidden md:table-cell">Price</th>
                <th className="p-3 font-semibold">Qty</th>
                <th className="p-3 font-semibold hidden md:table-cell">Total</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5}>
                  <hr className="border-gray-300 py-3" />
                </td>
              </tr>
              {cart.map((item, index) => (
                <tr
                  key={item.id}
                  className="shadow-sm hover:bg-gray-50 transition-all duration-300 animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <td className="flex items-center gap-4 p-3">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="bg-gray-50 p-3 rounded-lg object-cover shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-gray-900">{item.title}</span>
                      <span className="text-gray-500 text-sm">Category</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-700 hidden md:table-cell">
                    {item.price.toFixed(2)} ETB
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        aria-label="Decrease quantity"
                      >
                        <CiSquareMinus size={24} />
                      </button>
                      <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        aria-label="Increase quantity"
                      >
                        <CiSquarePlus size={24} />
                      </button>
                    </div>
                  </td>
                  <td className="p-3 text-gray-700 hidden md:table-cell font-semibold">
                    {(item.price * item.quantity).toFixed(2)} ETB
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label="Remove item"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Summary */}
        <div className="fixed bottom-0 left-4 right-4 md:left-20 md:right-20 z-50 w-auto mx-auto bg-white py-6 px-6 md:px-8 rounded-t-3xl md:rounded-3xl shadow-2xl border-t md:border-0 animate-slide-in-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Shipping Options */}
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-gray-900">Choose shipping mode:</h2>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition-all duration-200">
                  <input
                    type="radio"
                    name="shipping"
                    value={0}
                    checked={shipping === 0}
                    onChange={() => setShipping(0)}
                    className="w-4 h-4 text-black focus:ring-black"
                  />
                  <span className="text-gray-700 font-medium">Store pickup (Free)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition-all duration-200">
                  <input
                    type="radio"
                    name="shipping"
                    value={100}
                    checked={shipping === 100}
                    onChange={() => setShipping(100)}
                    className="w-4 h-4 text-black focus:ring-black"
                  />
                  <span className="text-gray-700 font-medium">Home delivery (100 ETB)</span>
                </label>
              </div>
            </div>

            {/* Totals and Checkout */}
            <div className="flex flex-col min-w-0 md:min-w-[300px]">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">SUBTOTAL</span>
                  <span className="font-semibold text-gray-900">{subtotal.toFixed(2)} ETB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">SHIPPING</span>
                  <span className="font-semibold text-gray-900">{shipping.toFixed(2)} ETB</span>
                </div>
                <hr className="border-gray-400" />
                <div className="flex justify-between items-center font-bold text-lg text-gray-900">
                  <span>TOTAL</span>
                  <span>{total.toFixed(2)} ETB</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="mt-4 flex justify-center items-center bg-red-500 px-6 py-4 rounded-xl text-white font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {checkoutLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  "Checkout"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}