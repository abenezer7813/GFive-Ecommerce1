"use client";

import { IoArrowBack } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useCart } from "@/Context/page";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, loading, syncCart } = useCart();

  const [shipping, setShipping] = useState(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const token = Cookies.get("token");

  useEffect(() => {
    if (token) syncCart();
  }, [token]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal + shipping;

  /* ============================
      FIXED QUANTITY HANDLER
  ============================ */
  const handleUpdateQty = async (id: number, qty: number) => {
    if (qty < 1 || updatingId === id) return;

    setUpdatingId(id);
    try {
      await updateQty(id, qty);
    } catch (err) {
      console.error(err);
      await syncCart();
    } finally {
      setUpdatingId(null);
    }
  };

  /* ============================
      FIXED DELETE HANDLER
  ============================ */
  const handleRemove = async (id: number) => {
    if (updatingId === id) return;

    setUpdatingId(id);
    try {
      await removeFromCart(id);
    } catch (err) {
      console.error(err);
      await syncCart();
    } finally {
      setUpdatingId(null);
    }
  };

  /* ============================
      CHECKOUT
  ============================ */
  const handleCheckout = async () => {
    if (!token) return alert("Please login to checkout");

    setCheckoutLoading(true);
    try {
      const res = await fetch("https://localhost:8081/api/orders/checkout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cart,
          shippingCost: shipping,
          totalAmount: total,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      alert("Order placed successfully!");
      await syncCart();
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setCheckoutLoading(false);
    }
  };

  /* ============================
      LOADING
  ============================ */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-black rounded-full" />
      </div>
    );
  }

  /* ============================
      EMPTY CART
  ============================ */
  if (!cart.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-xl text-center">
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <Link href="/user/product">
            <button className="bg-black text-white px-6 py-3 rounded-lg">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  /* ============================
      UI
  ============================ */
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">My Cart</h1>
          <Link
            href="/user/product"
            className="flex items-center gap-2 px-4 py-2 border rounded-lg"
          >
            <IoArrowBack /> Continue Shopping
          </Link>
        </div>

        {/* CART ITEMS */}
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Product</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Total</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="flex items-center gap-4 p-3">
                  <Image
                    src={item.thumbnail}
                    width={70}
                    height={70}
                    alt={item.title}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-gray-500">
                      {item.price.toFixed(2)} ETB
                    </p>
                  </div>
                </td>

                {/* QTY */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={item.quantity <= 1 || updatingId === item.id}
                      onClick={() =>
                        handleUpdateQty(item.id, item.quantity - 1)
                      }
                      className="p-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                      <CiSquareMinus size={22} />
                    </button>

                    <span className="font-bold min-w-[32px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      disabled={updatingId === item.id}
                      onClick={() =>
                        handleUpdateQty(item.id, item.quantity + 1)
                      }
                      className="p-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                      <CiSquarePlus size={22} />
                    </button>
                  </div>
                </td>

                {/* TOTAL */}
                <td className="p-3 font-semibold">
                  {(item.price * item.quantity).toFixed(2)} ETB
                </td>

                {/* DELETE */}
                <td className="p-3">
                  <button
                    disabled={updatingId === item.id}
                    onClick={() => handleRemove(item.id)}
                    className="p-2 bg-red-100 text-red-600 rounded disabled:opacity-50"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* SUMMARY */}
        <div className="mt-8 flex justify-end">
          <div className="w-full md:w-1/3 space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} ETB</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping.toFixed(2)} ETB</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{total.toFixed(2)} ETB</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full bg-red-500 text-white py-3 rounded-lg mt-4 disabled:opacity-50"
            >
              {checkoutLoading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
