"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const formatDate = (iso?: string) => {
  if (!iso) return "Date not available";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
  } catch {
    return "Date not available";
  }
};

type OrderSummary = {
  id: number;
  status: string;
  totalPrice: number;
  createdAt?: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true); // initial data load
  const [pageLoading, setPageLoading] = useState(false); // per-page loading
  const [error, setError] = useState("");

  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://localhost:8081/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data: OrderSummary[] = await res.json();

        // Sort newest first
        const sortedOrders = [...data].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });

        setOrders(sortedOrders);
        setTotalPages(Math.ceil(sortedOrders.length / pageSize));
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // Slice orders for current page
  const paginatedOrders = orders.slice(page * pageSize, (page + 1) * pageSize);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center mt-8">{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-12">
        <h3>No orders found</h3>
        <Link href="/" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md">Start Shopping</Link>
      </div>
    );
  }

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

  // Handles page change with 3-second delay
  const changePage = (newPage: number) => {
    setPageLoading(true);
    setTimeout(() => {
      setPage(newPage);
      setPageLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Orders</h1>

        {pageLoading && (
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-gray-500">Loading page...</p>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="hidden md:block bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</div>
              <div className="col-span-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</div>
              <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</div>
              <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Total</div>
              <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {paginatedOrders.map((order) => (
              <div key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-3">
                    <p className="text-sm font-medium text-gray-900">#{order.id}</p>
                    <p className="md:hidden text-xs text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="col-span-3 hidden md:block">
                    <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-semibold text-gray-900 text-right md:text-left">{order.totalPrice.toFixed(2)} ETB</p>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <Link
                      href={`/user/orders/${order.id}`}
                      className="inline-flex items-center px-3 py-1.5  font-medium rounded-md text-white bg-black/90 hover:bg-black/60"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center space-x-2">
          <button
            disabled={page === 0 || pageLoading}
            onClick={() => changePage(page - 1)}
            className={`px-3 py-1 rounded-md border ${page === 0 ? "text-gray-400 border-gray-300" : "text-blue-600 border-blue-200 hover:bg-blue-50"}`}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              disabled={pageLoading}
              onClick={() => changePage(idx)}
              className={`px-3 py-1 rounded-md border ${idx === page ? "bg-blue-600 text-white" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages - 1 || pageLoading}
            onClick={() => changePage(page + 1)}
            className={`px-3 py-1 rounded-md border ${page === totalPages - 1 ? "text-gray-400 border-gray-300" : "text-blue-600 border-blue-200 hover:bg-blue-50"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
