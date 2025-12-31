"use client";

import { useState, useEffect } from "react";
import { getProducts, getCategories } from "../../user/product/data";
import { Product, Category } from "../../../types/types";
import Categories from "./Categories";
import SortBy from "./SortBy";
import Link from "next/link";
import Image from "next/image";


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
const [sortField, setSortField] = useState<
  "name" | "price" | "createdAt"
>("createdAt");
const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function loadData() {
      const productsPage = await getProducts(page, 10);
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
      : products.filter((p) => p.categoryId === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortField === "createdAt") {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  }

  if (sortField === "name") {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  }

  // price
  return sortOrder === "asc"
    ? a.price - b.price
    : b.price - a.price;
});

  return (
  <div className="">
  {/* Sticky SortBy */}
 
        <div className="sticky top-0 z-50 bg-white">
          <SortBy
            field={sortField}
            order={sortOrder}
            onFieldChange={setSortField}
            onOrderChange={setSortOrder}
          />
        </div>

  {/* Main content */}
  <div className="pt-0 bg-white pb-17 flex">
    {/* Sidebar */}
    <Categories
      categories={categories}
      selectedCategoryId={selectedCategory}
      onSelect={setSelectedCategory}
    />

    {/* Products grid */}
    <div className="flex-1 ml-60 h-screen">
<div className="w-4/4 p-6">
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-xl flex flex-col overflow-hidden hover:shadow-xl transition-shadow min-h-[300px]"
          >
            {/* LINK ONLY ON IMAGE + TEXT */}
            <Link href={`/admin/productsDetail/${product.id}`}>
              <div className=" bg-gray-100 rounded-t-2xl flex justify-center items-center">
                <Image
                  src={product.imageUrl  || "/heroimage.jpg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-cover rounded-md"
                />
              </div>

              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {product.name}
                  </h3>
                  <span className="font-bold">{product.price} ETB</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>
            </Link>

           
          </div>
        ))}
      </div>
      
    </div>
    {/* Pagination */}
  <div className="flex justify-center gap-4 my-6">
    <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
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
  </div>
        </div>
        
  </div>

  
</div>
  );
}
