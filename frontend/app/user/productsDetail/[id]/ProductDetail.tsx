'use client';

import { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { Productfor } from "../../../../types/types";
import { useCart } from "@/Context/page";
import { useRouter } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default function ProductDetail({ params }: Props) {
  const { addToCart } = useCart();
  const resolvedParams = use(params);
  const productId = Number(resolvedParams.id);
  const router = useRouter();

  const [product, setProduct] = useState<Productfor | null>(null);
  const [similar, setSimilar] = useState<Productfor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("No token found");

        const res = await fetch(
          `https://localhost:8081/api/products/${productId}`,
          { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
        );

        if (!res.ok) throw new Error("Product not found");

        const data: Productfor = await res.json();
        setProduct(data);

        const simRes = await fetch(
          `https://localhost:8081/api/products?page=0&size=100`,
          { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
        );

        const simDataJson = await simRes.json();
        const simArray: Productfor[] = Array.isArray(simDataJson)
          ? simDataJson
          : simDataJson.content || [];

        const filtered = simArray
          .filter(p => p.id !== data.id && p.categoryId === data.categoryId)
          .slice(0, 4);

        setSimilar(filtered);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(productId)) fetchProduct();
    else { setError("Invalid product ID"); setLoading(false); }
  }, [productId]);

  if (loading)
    return <div className="min-h-screen  flex items-center justify-center">Loading...</div>;

  if (error || !product)
    return <div className="min-h-screen flex items-center justify-center">{error || "Product not found"}</div>;

  return (
    <div className="bg-gray-50 pt-30 min-h-screen px-6 py-16">
      {/* PRODUCT HERO */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* IMAGE */}
        <div className="relative transform -rotate-3 hover:rotate-0 transition-transform duration-500">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={450}
              height={500}
              className="rounded-3xl shadow-2xl object-cover border-4 border-white"
            />
          ) : (
            <div className="w-[450px] h-[500px] bg-gray-200 flex items-center justify-center rounded-3xl">
              No Image
            </div>
          )}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* PRODUCT INFO */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>

          <div className="flex items-baseline mb-8">
            <span className="text-2xl font-medium text-gray-600 mr-2">ETB</span>
            <span className="text-5xl font-bold text-gray-900">{product.price}</span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            <FaShoppingCart className="inline mr-2" /> Add to Cart
          </button>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      {similar.length > 0 && (
        <section className="max-w-7xl mx-auto mt-20">
          <h2 className="text-3xl font-bold mb-8">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similar.map(item => (
              <div
                key={item.id}
                className=" w-70 rounded-2xl shadow hover:shadow-xl cursor-pointer transition overflow-hidden"
                onClick={() => router.push(`/user/productsDetail/${item.id}`)}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="h-56 w-full object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="h-56 bg-gray-200" />
                )}

                <div className="p-4">
                  <h3 className="font-semibold truncate">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">ETB {item.price}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                    className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    <FaShoppingCart className="inline mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
