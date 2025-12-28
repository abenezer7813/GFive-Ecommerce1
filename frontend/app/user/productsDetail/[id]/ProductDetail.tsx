'use client';

import { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { FaStar, FaShoppingCart, FaPaperPlane } from "react-icons/fa";
import Similaritems from "./Similaritems";
import { Product } from "../../../../types/types";
import { useCart } from "@/Context/page";


type Props = { params: Promise<{ id: string }> }; 
export default function ProductDetail({ params }: Props) { 
    const { addToCart } = useCart();

  const resolvedParams = use(params); 
  const productId = Number(resolvedParams.id);
  const [product, setProduct] = useState<Product | null>(null);
  const [similar, setSimilar] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("No token found");
        // Fetch product details
        const res = await fetch(`https://localhost:8081/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Product not found");

        const data: Product = await res.json();
        setProduct(data);

        // Fetch similar products by category
        const simRes = await fetch(`https://localhost:8081/api/products?categoryId=${data.categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (!simRes.ok) throw new Error("Failed to fetch similar products");
        const simData: Product[] = await simRes.json();
        setSimilar(simData.filter(p => p.id !== data.id));
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600">{error || "Sorry, we couldn't find the product you're looking for."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 bg-gray-50 min-h-screen">
      {/* Product Hero Section */}
      <div className="relative flex items-center overflow-hidden py-16">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 w-full">
          {/* Product Image */}
          <div className="-ml-20 mt-5 relative transform -rotate-6 hover:rotate-0 transition-transform duration-500 ease-in-out">
            {product.imageUrl && product.imageUrl.length > 0 ? (
              <Image
                src={product.imageUrl} // take first image
                alt={product.name}
                width={400}
                height={500}
                className="rounded-3xl object-cover shadow-2xl border-4 border-white"
              />
            ) : (
              <div className="w-[400px] h-[500px] bg-gray-200 rounded-3xl flex items-center justify-center">
                No Image
              </div>
            )}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/10 to-transparent" />
          </div>

          {/* Product Info */}
          <div className="lg:w-1/3 text-black">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg text-gray-900">
              {product.name}
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-md">{product.description}</p>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Total Price</h2>
              <div className="flex items-baseline">
                <span className="text-2xl font-medium text-gray-600 mr-2">ETB</span>
                <span className="text-7xl font-bold text-gray-900">{product.price}</span>
              </div>
            </div>

            <button  onClick={() => addToCart(product)}   className="bg-white text-amber-500 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 flex items-center">
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </div>

          {/* Detail Info Panel */}
          <div className="lg:w-1/3 bg-white -mr-40 shadow-2xl rounded-3xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Product Details</h2>
            {/* Comment Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave a Comment</h3>
              <div className="flex gap-3">
                <input
                  placeholder="Write your comment..."
                  className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                />
                <button className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors duration-300">
                  <FaPaperPlane size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Items Section */}
      <div className="flex">
        <div className="max-w-7xl mx-10">
          <Similaritems products={similar} />
        </div>
      </div>
    </div>
  );
}
