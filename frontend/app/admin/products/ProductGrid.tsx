"use client";
import { useCart } from "@/Context/page";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../types/types";

type Props = {
  products: Product[];
};

export default function ProductsGrid({ products }: Props) {

  return (
    <div className="w-4/4 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-xl flex flex-col overflow-hidden hover:shadow-xl transition-shadow min-h-[300px]"
          >
            {/* LINK ONLY ON IMAGE + TEXT */}
            <Link href={`/user/productsDetail/${product.id}`}>
              <div className="p-5  bg-gray-100 rounded-t-2xl flex justify-center items-center">
                <Image
                  src={product.imageUrl || "heroimage.jpg"}
                  alt={product.name}
                  width={150}
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
  );
}
