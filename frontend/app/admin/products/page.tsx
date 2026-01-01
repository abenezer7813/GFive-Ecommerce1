"use client";

import { useState, useEffect } from "react";
import { getProducts, getCategories } from "../../user/product/data";
import { Product, Category } from "../../../types/types";
import SortBy from "./SortBy";
import Link from "next/link";
import Image from "next/image";

// Skeleton component for product cards
const ProductSkeleton = () => (
  <div className="bg-white shadow-lg rounded-xl overflow-hidden animate-pulse">
    <div className="bg-gray-200 h-48 flex justify-center items-center">
      <div className="w-32 h-32 bg-gray-300 rounded"></div>
    </div>
    <div className="p-4">
      <div className="flex justify-between mb-2">
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-5 bg-gray-300 rounded w-1/4"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>
  </div>
);

// Pagination component
const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const maxVisiblePages = 5; // Show up to 5 page numbers
  const startPage = Math.max(0, page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
  const adjustedStart = Math.max(0, endPage - maxVisiblePages + 1);

  const pages = Array.from(
    { length: endPage - adjustedStart + 1 },
    (_, i) => adjustedStart + i
  );

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
        aria-label="Previous page"
      >
        ‹ Prev
      </button>

      {adjustedStart > 0 && (
        <>
          <button
            onClick={() => onPageChange(0)}
            className="px-3 py-2 border rounded hover:bg-gray-100"
          >
            1
          </button>
          {adjustedStart > 1 && <span className="px-2">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-2 border rounded ${
            p === page ? "bg-blue-500 text-white" : "hover:bg-gray-100"
          }`}
          aria-current={p === page ? "page" : undefined}
        >
          {p + 1}
        </button>
      ))}

      {endPage < totalPages - 1 && (
        <>
          {endPage < totalPages - 2 && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages - 1)}
            className="px-3 py-2 border rounded hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
        aria-label="Next page"
      >
        Next ›
      </button>
    </div>
  );
};

export default function ProductsPage() {
  // 🔥 SINGLE SOURCE OF TRUTH
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true); // New: Loading state

  const [sortField, setSortField] = useState<
    "name" | "price" | "createdAt"
  >("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function loadData() {
      setLoading(true); // Start loading
      try {
        const productsPage = await getProducts(page, 10);
        const categoriesPage = await getCategories(0, 50);

        setProducts(productsPage.content);
        setCategories(categoriesPage.content);
        setTotalPages(productsPage.totalPages);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false); // End loading
      }
    }

    loadData();
  }, [page]);

  // Reset page when category changes
  useEffect(() => {
    setPage(0);
  }, [categoryId]);

  // ✅ FILTER BY CATEGORY
  const filteredProducts =
    categoryId === null
      ? products
      : products.filter((p) => p.categoryId === categoryId);

  // ✅ SORT
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
    <div>
      {/* 🔝 SORT BAR */}
      <div className="sticky top-0 z-50 bg-white">
        <SortBy
          field={sortField}
          order={sortOrder}
          selectedCategoryId={categoryId}
          onCategoryChange={setCategoryId}
          onFieldChange={setSortField}
          onOrderChange={setSortOrder}
        />
      </div>

      {/* 🧱 PRODUCTS */}
      <div className="p-6 min-h-screen flex flex-col justify-between">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {loading
            ? // Show skeletons while loading
              Array.from({ length: 10 }, (_, i) => <ProductSkeleton key={i} />)
            : // Show actual products
              sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
                >
                  <Link href={`/admin/productsDetail/${product.id}`}>
                    <div className="bg-gray-100 flex justify-center items-center">
                      <Image
                        src={product.imageUrl || "/heroimage.jpg"}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="text-lg font-semibold line-clamp-2">
                          {product.name}
                        </h3>
                        <span className="font-bold">
                          {product.price} ETB
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
        </div>

        {/* 📄 PAGINATION */}
        {!loading && totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
}