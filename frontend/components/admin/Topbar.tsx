"use client";

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import Search from "../Search"; // import your search component
import Cookies from "js-cookie"; // or any auth method to get admin info
import Link from "next/link";
import { Product } from "@/types/types";
import { getProducts } from "@/app/user/product/data";

interface TopbarProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Topbar({ setSidebarOpen }: TopbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

    useEffect(() => {
    async function loadProducts() {
      try {
        // fetch many items for search dropdown
        const productsPage = await getProducts(0, 100);
        setProducts(productsPage.content); // ✅ IMPORTANT
      } catch (error) {
        console.error("Failed to load products", error);
      }
    }

    loadProducts();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    // Example: get admin name from cookie or API
    const name = Cookies.get("adminName"); // you can replace with API call
    if (name) setAdminName(name);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: implement search API call or filter products
    console.log("Searching products for:", query);
  };

  return (
    <div className="bg-white shadow p-4 flex items-center justify-between md:justify-between flex-wrap gap-4">
      {/* Hamburger for small screens */}
      <button
        className="md:hidden text-black text-2xl"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <FaBars />
      </button>

      {/* Search */}
     <div className="">
                <Search value={query} onChange={setQuery} />
                {query && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.slice(0, 3).map((product) => (
                        <Link
                          key={product.id}
                          href={`/productsDetail/${product.id}`}
                          className="flex items-center gap-3 p-3 hover:bg-gray-100"
                          onClick={() => { setQuery(""); setIsMenuOpen(false); }}
                        >
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-8 h-8 rounded-md object-cover"
                          />
                          <div>
                            <p className="text-xs font-semibold line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {product.price} ETB
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="p-3 text-xs text-gray-500">
                        No products found
                      </p>
                    )}
                  </div>
                )}
              </div>

      {/* Greeting */}
      <div className="ml-auto text-black font-semibold">
        Hello, {adminName} 👋
      </div>
      
    </div>
  );
}
