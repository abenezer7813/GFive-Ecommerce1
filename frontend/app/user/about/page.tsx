// pages/about.tsx (or app/about/page.tsx if using app router)
import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar/>
      {/* 🏠 INTRO SECTION */}
      <section className="py-16 px-6 my-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">About Us</h1>
          <p className="text-lg md:text-xl text-gray-600">
            We're passionate about bringing you the best products with quality, trust, and innovation.
          </p>
        </div>
      </section>

      {/* 📖 OUR STORY */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-black">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2023, our e-commerce platform started with a simple mission: to make shopping easy, affordable, and enjoyable. 
              We source products from trusted suppliers worldwide, ensuring every item meets our high standards for quality and sustainability.
            </p>
            <p className="text-gray-600">
              From electronics to fashion, home goods to sports gear, we're here to help you find what you love. Join thousands of satisfied customers 
              who trust us for fast shipping, secure payments, and exceptional service.
            </p>
          </div>
          
        </div>
      </section>

      {/* 🌟 OUR VALUES */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2 text-black">Sustainability</h3>
              <p className="text-gray-600">We prioritize eco-friendly practices and ethical sourcing.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2 text-black">Customer First</h3>
              <p className="text-gray-600">Your satisfaction is our top priority, with 24/7 support.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2 text-black">Innovation</h3>
              <p className="text-gray-600">We constantly evolve to bring you the latest trends and tech.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 👥 OUR TEAM */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Abenezer Tariku", role: "CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" },
              { name: "Yonas Aklilu", role: "CTO", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" },
              { name: "Zekarias Wereket", role: "Head of Sales", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" },
            ].map((member, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden text-center">
              
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   
    </div>
  );
}