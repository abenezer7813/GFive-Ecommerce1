"use client";

import { useEffect, useState } from "react";
import { FaBoxOpen, FaUsers, FaShoppingCart } from "react-icons/fa";
import { getProductAnalytics } from "@/lib/dashboard";
import { getTotalStock, getTotalUsers, getTotalOrders } from "@/app/user/product/data";
import LatestUsers from "./User";
import LatestOrders from "./LatestOrders";
import Toolbar from "./Toolbar";

type Analytics = {
  totalUsers: number;
  totalProducts: number;
  totalStock: number;
  totalOrders: number;
};

const Page = () => {
  const [stats, setStats] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen ">
      <Toolbar/>
     
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
              <div>
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="bg-white rounded-xl p-6 shadow flex items-center gap-4">
              <FaUsers className="text-red-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-bold">{stats?.totalUsers}</h2>
                <p className="text-gray-500">Total Users</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow flex items-center gap-4">
              <FaBoxOpen className="text-blue-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-bold">{stats?.totalProducts}</h2>
                <p className="text-gray-500">Total Products</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow flex items-center gap-4">
              <FaBoxOpen className="text-green-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-bold">{stats?.totalStock}</h2>
                <p className="text-gray-500">Total Stock</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow flex items-center gap-4">
              <FaShoppingCart className="text-yellow-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-bold">{stats?.totalOrders}</h2>
                <p className="text-gray-500">Total Orders</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Latest Users and Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            {/* Skeleton for LatestUsers */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-black">
                    <tr>
                      <th className="p-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </th>
                      <th className="p-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </th>
                      <th className="p-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </th>
                      <th className="p-2 text-right">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4}>
                        <hr className="border-gray-400 " />
                      </td>
                    </tr>
                    {Array.from({ length: 10 }).map((_, i) => (
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
                        <td className="p-2">
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Skeleton for LatestOrders */}
            <div className="bg-white shadow rounded-lg p-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="overflow-x-auto">
                <table className="w-full text-left ">
                  <thead className="">
                    <tr>
                      <th className="p-2 border-b">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </th>
                      <th className="p-2 border-b">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </th>
                      <th className="p-2 border-b">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </th>
                      <th className="p-2 border-b text-right">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <LatestUsers />
            <LatestOrders />
          </>
        )}
      </div>

    </div>
  );
};

export default Page;