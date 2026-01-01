'use client';

import ProductDetail from "./ProductDetail";

type Props = { params: Promise<{ id: string }> };

export default function ProductDetailPage({ params }: Props) {
  return (
    <div className=' min-h-screen bg-gray-50'>
      {/* Pass params to ProductDetail */}
      <ProductDetail params={params} />
    </div>
  );
}
