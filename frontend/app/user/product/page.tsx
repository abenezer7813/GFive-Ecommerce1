"use client";

import { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import Categories from "./Categories";
import ProductsGrid from "./ProductGrid";
import { getProducts, getCategories } from "./data";
import { Product, Category } from "../../../types/types";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
const [selectedCategory, setSelectedCategory] = useState<number | null>(null);


  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


   useEffect(() => {
    async function loadData() {
      const productsPage = await getProducts(page, 3);
      const categoriesPage = await getCategories(0, 50);

      // 👇 THIS IS THE MOST IMPORTANT PART
      setProducts(productsPage.content);
      setCategories(categoriesPage.content);

      setTotalPages(productsPage.totalPages);
    }

    loadData();
  }, [page]);

  const filteredProducts =
  selectedCategory === null
    ? products
    : products.filter(
        (p) => p.categoryId === selectedCategory
      );


  return (
    <div className="min-h-screen bg-gray-0">
      <NavBar />
      {/* Hero Section */}
      <div
        className="relative h-96 flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: "url(/heroimage.jpg)", // Replace with your actual image path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay for Brand Consistency and Text Readability */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-md">
            Explore our latest collection of high-quality items at unbeatable
            prices.
          </p>
        
        </div>
        {/* Decorative Elements (Optional) */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white opacity-10 transform rotate-1"></div>
        <div className="absolute bottom-0 left-110 w-full h-16 bg-white opacity-10 transform rotate-70"></div>
      </div>
      {/* Products Section */}
      <div className="pt-8 pb-16">
        <div className="min-h-screen bg-white flex">
          <Categories
            categories={categories}
            selectedCategoryId={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <ProductsGrid products={filteredProducts} />
        </div>
         {/* Pagination */}
      <div className="flex justify-center gap-4 my-6">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          Page {page + 1} / {totalPages}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>{" "}
      </div>
    </div>
  );
};

export default Products;
