"use client";

import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type Props = {
  products: Product[];
};

export default function ProductsGrid({ products }: Props) {
  
  return (
    <div className="w-4/5 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-2xl flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[400px]" // Added min-height for consistent card heights
          >
            <Link href={`/productsDetail/${product.id}`} className="flex flex-col flex-grow">
              <div className=" p-5 relative bg-gray-100 rounded-t-2xl overflow-hidden">
                <Image
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.title}
                  width={400}
                  height={256}
                  className=" h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.discountPercentage > 0 && ( // Changed to show discount badge if applicable
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    -{Math.round(product.discountPercentage)}%
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight line-clamp-2"> {/* Added line-clamp-2 to limit title to 2 lines */}
                    {product.title}
                  </h3>
                  <div className="text-right">
                    <span className="font-bold text-xl text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-600 ml-1">ETB</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 flex-grow">
                  {product.description}
                </p>
              </div>
            </Link>

            <div className="p-4 mt-auto"> {/* Added mt-auto to push buttons to bottom */}
              <div className="flex gap-2">
                <button className="flex-1 border border-gray-400 rounded-full py-2 font-semibold hover:bg-gray-100 transition-colors duration-200">
                  Add to Cart
                </button>
                <button className="flex-1 bg-black text-white rounded-full py-2 font-semibold hover:bg-gray-800 transition-colors duration-200">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}