
import Link from "next/link";
import Image from "next/image";

const categories = [
  "Electronics",
  "Fashion",
  "Shoes",
  "Accessories",
];

const products = [
  {
    id: 1,
    name: "Smartphone",
    price: "$499",
    image: "/products/phone.jpg",
  },
  {
    id: 2,
    name: "Sneakers",
    price: "$89",
    image: "/products/shoes.jpg",
  },
  {
    id: 3,
    name: "Headphones",
    price: "$129",
    image: "/products/headphones.jpg",
  },
  {
    id: 4,
    name: "Backpack",
    price: "$59",
    image: "/products/bag.jpg",
  },
];

export default function LAndingPAge() {
  return (
    <>
<nav className="flex justify-between items-center px-8 py-4 shadow">
      <h1 className="text-2xl font-bold text-blue-600">
        G5Shop
      </h1>

      <ul className="flex gap-6 font-medium">
        <li className="cursor-pointer hover:text-blue-600">Home</li>
        <li className="cursor-pointer hover:text-blue-600">Shop</li>
        <li className="cursor-pointer hover:text-blue-600">About</li>
        <li className="cursor-pointer hover:text-blue-600">Contact</li>
        <li className="cursor-pointer hover:text-blue-600">
  <a href="/cart">Cart</a>
</li>

      </ul>
    </nav>
 <section className="bg-gray-100 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
       በምርጥ ምርጥ እቃዎች የታጀበ ሱቅ ባይገዙም እያዩ ዘና ይበሉ!G5 SHOP .
      </h1>

      <p className="text-gray-600 mb-6 max-w-xl mx-auto">
     G5 shop ኑ ወደ እኛ በተመጣጣኝ ዋጋ የፈለጉትን ነገር በሚመች ዋጋ ያገኙታል እርስዎ ብቻ G5 shop ይምጡ ይደሰታሉ!!G5 SHOP
      </p>

      <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
        Shop Now
      </button>
    </section>      \
      <section className="py-16 px-8">
      <h2 className="text-2xl font-bold text-center mb-10">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat}
            className="border rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition"
          >
            <p className="font-semibold">{cat}</p>
          </div>
        ))}
      </div>
    </section>
       <section className="bg-gray-50 py-16 px-8">
      <h2 className="text-2xl font-bold text-center mb-10">
        Featured Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="border rounded-lg p-4 hover:shadow-lg transition"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="rounded mb-4"
            />

            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-blue-600">{product.price}</p>
          </Link>
        ))}
      </div>
    </section>
    </>
  );
}
