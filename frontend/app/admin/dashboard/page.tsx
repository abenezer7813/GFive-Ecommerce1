"use client";

import { useEffect, useState } from "react";
import { FaBoxOpen, FaDollarSign } from "react-icons/fa";
import { getProductAnalytics } from "@/lib/dashboard";

type Analytics = {
  totalProducts: number;
  totalStock: number;
  totalInventoryValue: number;
};

const Page = () => {
  const [stats, setStats] = useState<Analytics | null>(null);

  useEffect(() => {
    async function loadAnalytics() {
      const data = await getProductAnalytics();
      setStats(data);
    }

    loadAnalytics();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 mt-15">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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

        {/* Inventory Value */}
        <div className="bg-white rounded-xl p-6 shadow flex gap-4">
          <FaDollarSign className="text-purple-500 text-3xl" />
          <div>
            <h2 className="text-2xl font-bold">
              {stats.totalInventoryValue.toLocaleString()} ETB
            </h2>
            <p className="text-gray-500">Inventory Value</p>
          </div>
        </div>
        <div>
          
        </div>

      </div>
    </div>
  );
};

export default Page;
