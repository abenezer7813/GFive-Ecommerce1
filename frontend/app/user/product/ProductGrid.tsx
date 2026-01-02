"use client";
import { useCart } from "@/Context/page";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../types/types";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

type Props = {
  products: Product[];
  loading?: boolean; // new prop to indicate loading state
};

export default function ProductsGrid({ products, loading = false }: Props) {
  const { addToCart, syncCart } = useCart();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [modalState, setModalState] = useState<'confirm' | 'processing' | 'success'>('confirm'); // Modal content state
  const token = Cookies.get("token");

  const handleBuyNow = async (product: Product) => {
    if (!token) return alert("Please login to buy now");

    setLoadingId(product.id);
    setModalState('processing'); // Show processing state
    try {
      await fetch(`https://localhost:8081/api/cart/add?productId=${product.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      await syncCart();

      const cartRes = await fetch("https://localhost:8081/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cartData = await cartRes.json();

      const cartItems = (cartData.items || []).map((item: any) => ({
        id: item.productId,
        title: item.productName,
        price: item.price,
        quantity: item.quantity,
        thumbnail: item.imageUrl,
      }));

      const totalAmount = cartItems.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);

      const checkoutRes = await fetch("https://localhost:8081/api/orders/checkout", {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cartItems, shippingCost: 0, totalAmount })
      });

      if (!checkoutRes.ok) throw new Error(await checkoutRes.text());

      const orderData = await checkoutRes.json();

      await fetch("https://localhost:8081/api/cart/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      await syncCart();

      // Success: Show success message in modal
      setModalState('success');
      setTimeout(() => {
        closeModal(); // Close modal after 2 seconds
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to place order."); // Keep alert for errors
      setModalState('confirm'); // Reset to confirm on error
    } finally {
      setLoadingId(null);
    }
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setModalState('confirm');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setModalState('confirm');
  };

  // Skeleton array
  const skeletons = Array.from({ length: 8 });

  return (
    <div className="w-4/5 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? skeletons.map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 animate-pulse rounded-2xl min-h-[400px] flex flex-col"
              >
                <div className="h-48 bg-gray-300 rounded-t-2xl mb-4"></div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <div className="flex-1 h-10 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 h-10 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))
          : products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-2xl flex flex-col overflow-hidden hover:shadow-xl transition-shadow min-h-[400px]"
              >
                <Link href={`/user/productsDetail/${product.id}`}>
                  <div className="p-5 relative flex justify-center bg-gray-100 rounded-t-2xl">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={170}
                      height={200}
                      className="object-cover rounded-md"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
                      <span className="font-bold">{product.price} ETB</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                  </div>
                </Link>

                <div className="p-4 mt-auto">
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 border border-gray-400 rounded-full py-2 font-semibold hover:bg-gray-100"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => openModal(product)} // Open modal instead of direct buy
                      className="flex-1 border border-gray-400 rounded-full py-2 font-semibold text-white bg-black hover:bg-gray-800"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            {modalState === 'confirm' && (
              <>
                <h2 className="text-xl font-bold mb-4 text-center">Confirm Purchase</h2>
                <div className="flex items-center mb-4">
                  <Image
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{selectedProduct.name}</h3>
                    <p className="text-gray-600">{selectedProduct.price} ETB</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to buy this item? It will be added to your cart and checked out immediately.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 border border-gray-400 rounded-lg py-2 font-semibold hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleBuyNow(selectedProduct)}
                    disabled={loadingId === selectedProduct.id}
                    className="flex-1 bg-black text-white rounded-lg py-2 font-semibold hover:bg-gray-800 disabled:opacity-50"
                  >
                    {loadingId === selectedProduct.id ? "Processing..." : "Confirm"}
                  </button>
                </div>
              </>
            )}

            {modalState === 'processing' && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                <p className="text-lg font-semibold">Processing your order...</p>
              </div>
            )}

            {modalState === 'success' && (
              <div className="text-center">
                <div className="text-green-500 text-4xl mb-4">✓</div>
                <h2 className="text-xl font-bold mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600">Your order has been processed. Thank you for shopping with us!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}