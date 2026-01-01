// pages/index.tsx (or app/page.tsx if using app router)
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 🧭 HEADER NAVIGATION */}
      <header className="bg-black text-white py-4 px-6">
        <div className="max-w-6xl  flex justify-between items-center">
          <Link href="/auth/login">
            <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
              Sign In
            </button>
          </Link>
        </div>
      </header>

      {/* 🏠 HERO SECTION */}
      <section className="relative bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Shop the latest trends with fast shipping, secure payments, and unbeatable prices.
          </p>
          <Link href="/auth/login">
            <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
              Shop Now
            </button>
          </Link>
        </div>
        {/* Optional: Add a hero image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/heroimage.jpg" // Replace with your hero image
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
          />
        </div>
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
                <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer border border-gray-200">
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
            <div className="text-center">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2 text-black">Free Shipping</h3>
              <p className="text-gray-600">On orders over 500 ETB. Delivered to your door.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2 text-black">Secure Payments</h3>
              <p className="text-gray-600">100% secure checkout with multiple payment options.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2 text-black">Quality Guaranteed</h3>
              <p className="text-gray-600">Top-rated products with easy returns.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}