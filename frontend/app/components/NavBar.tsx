'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { BsCartCheck } from "react-icons/bs";

// TEMP: replace with real products or props
const products = [
  { id: 1, title: "Samsung Galaxy A31", price: 2000, images: ["/1.jpg"] },
  { id: 2, title: "iPhone 13 Pro", price: 3500, images: ["/2.jpg"] },
  { id: 3, title: "Dell Laptop", price: 4500, images: ["/3.jpg"] },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <nav className="fixed top-0 left-20 right-20 z-50 flex bg-white shadow-lg rounded-b-2xl">
      <div className='max-w-7xl mx-auto px-4 w-full'>
        <div className='flex justify-between items-center h-20'>

          {/* Logo */}
          <Image src="/logoone.png" alt="logo" width={52} height={40} />

          {/* Links */}
          <div className='hidden md:flex space-x-8 text-black'>
            <Link href="#">Home</Link>
            <Link href="#">Products</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
          </div>

          {/* Search + icons */}
          <div className="hidden md:flex items-center gap-4 relative">

           
            {/* Cart */}
            <div className='relative'>
              <BsCartCheck size={23} />
              <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1.5 text-xs'>
                4
              </span>
            </div>

            {/* User */}
            <FaUser size={20} className="cursor-pointer" />
          </div>

          {/* Mobile menu */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
