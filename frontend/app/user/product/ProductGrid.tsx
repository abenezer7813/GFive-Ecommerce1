"use client";
import { useCart } from "@/Context/page";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../types/types";





type Props = {
  products: Product[];
};

export default function ProductsGrid({ products }: Props) {
  const { addToCart } = useCart();
  

  return (
    <div className="w-4/5 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-2xl flex flex-col overflow-hidden hover:shadow-xl transition-shadow min-h-[400px]"
          >
            {/* LINK ONLY ON IMAGE + TEXT */}
            <Link href={`/user/productsDetail/${product.id}`}>
              <div className="p-5 relative bg-gray-100 rounded-t-2xl">
                 <Image
    src={product.imageUrl}
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
                  <span className="font-bold">
                    {product.price} ETB
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>
            </Link>

            {/* ACTION BUTTONS */}
            <div className="p-4 mt-auto">
              <div className="flex gap-2">
                <button onClick={() => addToCart(product)}                  className="flex-1 border border-gray-400 rounded-full py-2 font-semibold hover:bg-gray-100"
>
  Add to Cart
</button>

                <button className="flex-1 bg-black text-white rounded-full py-2 font-semibold hover:bg-gray-800">
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
