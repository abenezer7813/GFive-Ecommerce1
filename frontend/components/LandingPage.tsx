// pages/index.tsx (or app/page.tsx if using app router)
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 🧭 HEADER NAVIGATION */}
      <header className="bg-black text-white py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Kanzy's</div> {/* Added logo/brand name */}
          <Link href="/auth/login">
            <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-300">
              Sign In
            </button>
          </Link>
        </div>
      </header>

      {/* 🏠 HERO SECTION */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Shop the latest trends with fast shipping, secure payments, and unbeatable prices.
          </p>
          <Link href="/auth/login">
            <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300 shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>
        {/* Enhanced hero background */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/heroimage.jpg" // Replace with your hero image
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Added floating elements for visual appeal */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse"></div>
      </section>

      {/* 🛍️ FEATURED CATEGORIES */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Example Categories - Replace with dynamic data if needed */}
            {[
              { name: "Electronics", image: "/electronicss.jpg", link: "/auth/login" },
              { name: "Clothing", image: "/clothing.jpg", link: "/auth/login" },
              { name: "Home & Garden", image: "/homes.jpg", link: "/auth/login" },
              { name: "Sports", image: "/sports.jpg", link: "/auth/login" },
            ].map((category, index) => (
              <Link key={index} href={category.link}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer border border-gray-200">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={200}
                    className="object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-black">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ✨ BENEFITS SECTION */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2 text-black">Free Shipping</h3>
              <p className="text-gray-600">On orders over 500 ETB. Delivered to your door.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2 text-black">Secure Payments</h3>
              <p className="text-gray-600">100% secure checkout with multiple payment options.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2 text-black">Quality Guaranteed</h3>
              <p className="text-gray-600">Top-rated products with easy returns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🆕 FEATURED PRODUCTS SECTION */}
      <section className="py-16 px-6 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Products - Replace with dynamic data */}
            {[
              { name: "Wireless Headphones", price: "2500 ETB", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", link: "/auth/login" },
              { name: "Smart Watch", price: "3500 ETB", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", link: "/auth/login" },
              { name: "Gaming Laptop", price: "45000 ETB", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", link: "/auth/login" },
            ].map((product, index) => (
              <Link key={index} href={product.link}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">
                  {/* Fixed-height container for consistent image sizing */}
                  <div className="relative w-full h-48 bg-gray-200"> {/* 48 = 192px height for 3:2 aspect ratio */}
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-black">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

     
   
    </div>
  );
}