"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type OrderItem = {
  productId: number;
  productName: string;
  priceAtPurchase: number;
  quantity: number;
};

type Order = {
  id: number;
  status: string;
  totalPrice: number;
  items: OrderItem[];
  createdAt: string;
};

const formatDate = (iso?: string) => {
  if (!iso) return "Date not available";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
  } catch {
    return "Date not available";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-50 text-yellow-800 border-yellow-100";
    case "PAID":
      return "bg-green-50 text-green-800 border-green-100";
    case "SHIPPED":
      return "bg-blue-50 text-blue-800 border-blue-100";
    case "DELIVERED":
      return "bg-purple-50 text-purple-800 border-purple-100";
    case "CANCELLED":
      return "bg-red-50 text-red-800 border-red-100";
    default:
      return "bg-gray-50 text-gray-800 border-gray-100";
  }
};

export default function LatestOrders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://localhost:8081/api/orders/latest", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch latest orders");
        const data = await res.json();
        setOrders(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Latest Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left ">
          <thead className="">
            <tr>
              <th className="p-2 border-b">Order ID</th>
              <th className="p-2 border-b">Date</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="shadow-sm h-13">
                  <td className="p-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="p-2 text-right">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                </tr>
              ))
            ) : orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="shadow-sm h-13 hover:bg-gray-50">
                  <td className="p-2 ">#{order.id}</td>
                  <td className="p-2">{formatDate(order.createdAt)}</td>
                  <td className="p-2">
                    <span className={`inline-block px-2 py-1 text-xs font-medium border rounded ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2 text-right font-semibold">{order.totalPrice.toFixed(2)} ETB</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-2 text-center">No recent orders</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}