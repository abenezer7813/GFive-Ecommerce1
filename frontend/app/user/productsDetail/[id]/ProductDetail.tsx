'use client';

import { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { FaShoppingCart, FaPaperPlane, FaTrash, FaEdit } from "react-icons/fa";
import Similaritems from "./Similaritems";
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

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Omit<Productfor, "id"> | null>(null);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("No token found");

        // Fetch product
        const res = await fetch(`https://localhost:8081/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Product not found");
        const data: Productfor = await res.json();
        setProduct(data);
        setEditForm({
          name: data.name,
          description: data.description,
          price: data.price,
          stockQuantity: data.stockQuantity,
          categoryId: data.categoryId,
          imageUrl: data.imageUrl,
        });

        // Fetch similar products
        const simRes = await fetch(
          `https://localhost:8081/api/products?categoryId=${data.categoryId}&page=0&size=10`,
          {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          }
        );
        if (!simRes.ok) throw new Error("Failed to fetch similar products");
        const simDataJson = await simRes.json();
        const simArray: Productfor[] = Array.isArray(simDataJson) ? simDataJson : simDataJson.content || [];
        setSimilar(simArray.filter(p => p.id !== data.id));

      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(productId)) fetchProduct();
    else { setError("Invalid product ID"); setLoading(false); }
  }, [productId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black mx-auto mb-4"></div>
      <p className="text-gray-700 font-medium">Loading product details...</p>
    </div>
  </div>;

  if (error || !product) return <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
      <p className="text-gray-600">{error || "Sorry, we couldn't find the product."}</p>
    </div>
  </div>;



  return (
    <div className="pmt-16  bg-gray-50 min-h-screen">
      {/* Action Message */}
      {actionMessage && <div className="text-center bg-green-200 text-green-900 py-2">{actionMessage}</div>}

      {/* Product Hero Section */}
      <div className="relative flex items-center overflow-hidden py-16 px-40 mt-30 ml-30 ">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-30 w-full">
          {/* Product Image */}
          <div className="-ml-20 mt-5 relative transform -rotate-6 hover:rotate-0 transition-transform duration-500 ease-in-out">
            {product.imageUrl ? (
              <Image src={product.imageUrl} alt={product.name} width={400} height={500} className="rounded-3xl object-cover shadow-2xl border-4 border-white" />
            ) : (
              <div className="w-[400px] h-[500px] bg-gray-200 rounded-3xl flex items-center justify-center">No Image</div>
            )}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/10 to-transparent" />
          </div>

          {/* Product Info */}
          <div className="lg:w-1/3 text-black ">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">{product.name}</h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-md">{product.description}</p>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Total Price</h2>
              <div className="flex items-baseline">
                <span className="text-2xl font-medium text-gray-600 mr-2">ETB</span>
                <span className="text-7xl font-bold text-gray-900">{product.price}</span>
              </div>
            </div>

            
          </div>

          
        </div>
      </div>

    
      
    </div>
  );
}
