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


const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadData() {
    setLoading(true); // start loading
    const productsPage = await getProducts(page, 3);
    const categoriesPage = await getCategories(0, 50);

    setProducts(productsPage.content);
    setCategories(categoriesPage.content);
    setTotalPages(productsPage.totalPages);
    setLoading(false); // done loading
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
      
      {/* Products Section */}
      <div className="mt-20  p-5">
        <div className="min-h-screen bg-white flex">
          <Categories
            categories={categories}
            selectedCategoryId={selectedCategory}
            onSelect={setSelectedCategory}
          />
<ProductsGrid products={filteredProducts} loading={loading} />
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