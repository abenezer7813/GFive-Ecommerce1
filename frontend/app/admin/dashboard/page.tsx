"use client";

import { useEffect, useState } from "react";
import { FaBoxOpen, FaDollarSign, FaUsers, FaShoppingCart } from "react-icons/fa";
import { getProductAnalytics } from "@/lib/dashboard";
import { getTotalStock, getTotalUsers, getTotalOrders } from "@/app/user/product/data";
import User from "./User";

type Analytics = {
  totalUsers: number;
  totalProducts: number;
  totalStock: number;
  totalOrders: number;
};

const Page = () => {
  const [stats, setStats] = useState<Analytics | null>(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const analyticsData = await getProductAnalytics();
        const stock = await getTotalStock();
        const users = await getTotalUsers();
        const orders = await getTotalOrders();

        setStats({
          totalUsers: users,
          totalProducts: analyticsData.totalProducts,
          totalStock: stock,
          totalOrders: orders,
        });
      } catch (err) {
        console.error("Failed to load analytics:", err);
      }
    }

    loadAnalytics();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 mt-15">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white rounded-xl p-6 shadow flex gap-4">
          <FaUsers className="text-red-500 text-3xl" />
          <div>
            <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
            <p className="text-gray-500">Total Users</p>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white rounded-xl p-6 shadow flex gap-4">
          <FaBoxOpen className="text-blue-500 text-3xl" />
          <div>
            <h2 className="text-2xl font-bold">{stats.totalProducts}</h2>
            <p className="text-gray-500">Total Products</p>
          </div>
        </div>

        {/* Total Stock */}
        <div className="bg-white rounded-xl p-6 shadow flex gap-4">
          <FaBoxOpen className="text-green-500 text-3xl" />
          <div>
            <h2 className="text-2xl font-bold">{stats.totalStock}</h2>
            <p className="text-gray-500">Total Stock</p>
          </div>
        </div>

       
        {/* Total Orders */}
        <div className="bg-white rounded-xl p-6 shadow flex gap-4">
          <FaShoppingCart className="text-yellow-500 text-3xl" />
          <div>
            <h2 className="text-2xl font-bold">{stats.totalOrders}</h2>
            <p className="text-gray-500">Total Orders</p>
          </div>
        </div>
        <User/>

      </div>
    </div>
  );
};

export default Page;
