"use client";
import { logout } from "@/lib/logout";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaUser, FaBars, FaTimes, FaUserCircle, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import Search from "./Search";
import { getProducts, getCategories } from "@/app/user/product/data";
import { Product, Category } from "../types/types";

import { useCart } from "@/Context/page";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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

  return (
    <nav className="fixed top-0 left-3 right-3 z-50 bg-white shadow-xl border-b rounded-b-2xl border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logoone.png"
                alt="logo"
                width={52}
                height={40}
                className="h-10 w-auto hover:opacity-80 transition-opacity duration-300"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="#"
              className="text-black hover:text-gray-600 transition-colors duration-300 font-semibold relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#"
              className="text-black hover:text-gray-600 transition-colors duration-300 font-semibold relative group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#"
              className="text-black hover:text-gray-600 transition-colors duration-300 font-semibold relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#"
              className="text-black hover:text-gray-600 transition-colors duration-300 font-semibold relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Search, Cart, and Profile */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              <Search value={query} onChange={setQuery} />

              {/* Search Results Dropdown */}
              {query && (
                <div className="absolute top-full mt-2 w-80 bg-white rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto animate-fade-in">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.slice(0, 5).map((product) => (
                      <Link
                        key={product.id}
                        href={`/user/productsDetail/${product.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setQuery("")}
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold line-clamp-1 text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.price} ETB
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="p-4 text-sm text-gray-500">
                      No products found
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative group">
              <BsCartCheck size={24} className="text-black hover:text-gray-600 transition-colors duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-bold min-w-[20px] text-center shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="text-black hover:text-gray-600 transition-colors duration-300 focus:outline-none"
              >
                <FaUser size={20} />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl z-50 py-2 animate-fade-in">
                  <Link
                    href="/user/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <FaUserCircle size={18} className="text-gray-600" />
                    <span className="text-gray-700 font-medium">Profile</span>
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <FaShoppingBag size={18} className="text-gray-600" />
                    <span className="text-gray-700 font-medium">My Orders</span>
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <button
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 transition-colors duration-200 text-left"
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                  >
                    <FaSignOutAlt size={18} className="text-gray-600" />
                    <span className="text-gray-700 font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black hover:text-gray-600 focus:outline-none transition-colors duration-300"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-50 pb-6 rounded-b-2xl shadow-inner animate-slide-down">
            <div className="flex flex-col space-y-3 px-4 pt-4">
              <Link
                href="#"
                className="text-black hover:text-gray-600 py-3 px-4 font-semibold transition-colors duration-300 rounded-lg hover:bg-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-black hover:text-gray-600 py-3 px-4 font-semibold transition-colors duration-300 rounded-lg hover:bg-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-black hover:text-gray-600 py-3 px-4 font-semibold transition-colors duration-300 rounded-lg hover:bg-white"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#"
                className="text-black hover:text-gray-600 py-3 px-4 font-semibold transition-colors duration-300 rounded-lg hover:bg-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="relative mt-4">
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
              <div className="flex justify-around mt-4">
                <Link href="/cart" className="relative" onClick={() => setIsMenuOpen(false)}>
                  <BsCartCheck size={24} className="text-black" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1.5 text-xs">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <FaUser size={20} className="text-black cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;