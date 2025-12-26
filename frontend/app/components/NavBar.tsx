'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { BsCartCheck } from "react-icons/bs";
import Search from './Search';
import { getProducts, Product, categories } from "@/app/product/data";
import { useCart } from "@/Context/page";





const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { cart } = useCart();
const cartCount = cart.reduce(
  (total, item) => total + item.quantity,
  0
);


  const [query, setQuery] = useState("");

const filteredProducts = products.filter(product =>
  product.title.toLowerCase().includes(query.toLowerCase())
);

  useEffect(() => {
  async function loadProducts() {
    const data = await getProducts(); 
    setProducts(data);                
  }

  loadProducts();
}, []);


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

            {/* Search */}
            <div className="relative">
              <Search value={query} onChange={setQuery} />

              {/* Search Results */}
              {query && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl z-50 max-h-80 ">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.slice(0, 5).map(product => (
                      <Link
                        key={product.id}
                        href={`/productsDetail/${product.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-100"
                        onClick={() => setQuery("")}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold line-clamp-1">
                            {product.title}
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
           {/* Cart */}
<Link href="/cart" className="relative">
  <BsCartCheck size={23} />
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1.5 text-xs">
      {cartCount}
    </span>
  )}
</Link>


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
