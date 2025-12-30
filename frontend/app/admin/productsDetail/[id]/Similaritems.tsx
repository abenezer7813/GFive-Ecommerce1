'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import arrow icons

import { getProducts } from "@/app/user/product/data";
import { Product } from "../../../../types/types";

type Props = {
  products: Product[];
};

const ITEMS_PER_PAGE = 4;

export default function Similaritems({ products }: Props) {
  const [page, setPage] = useState(0);

  const start = page * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const currentItems = products.slice(start, end);

  const hasNext = end < products.length;
  const hasPrev = page > 0;

  if (!products.length) return null;

  return (
    <div className="">
      {/* Navigation and Cards Container */}
      <div className="flex items-center justify-center gap-6">
        <button
          disabled={!hasPrev}
          onClick={() => setPage((p) => p - 1)}
          className={`
            p-3 rounded-full font-semibold transition-colors duration-200 flex-shrink-0
            ${hasPrev
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
          `}
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 ">
          {currentItems.map((item) => (
            <Link key={item.id} href={`/user/productsDetail/${item.id}`}>

              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4">
                <Image
  src={item.imageUrl}
  alt={item.name}
  width={200}
  height={200}
/>


                <h3 className="mt-2 font-semibold line-clamp-1">
                  {item.name}
                </h3>

                <p className="font-bold mt-1">
                  ETB {item.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <button
          disabled={!hasNext}
          onClick={() => setPage((p) => p + 1)}
          className={`
            p-3 rounded-full font-semibold transition-colors duration-200 flex-shrink-0
            ${hasNext
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
          `}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}