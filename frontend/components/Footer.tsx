import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>  {/* 🦶 FOOTER */}
      <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul>
              <li><Link href="/user/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/user/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul>
              <li><Link href="/returns" className="hover:underline">Returns</Link></li>
              <li><Link href="/shipping" className="hover:underline">Shipping Info</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <input
              type="email"
              placeholder="Nathnaelasefa80@gmail.com"
              className="w-full p-2 rounded mb-2 text-black"
            />
            <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          <p>&copy; 2025 kanzy's. All rights reserved.</p>
        </div>
      </footer></div>
  )
}

export default Footer