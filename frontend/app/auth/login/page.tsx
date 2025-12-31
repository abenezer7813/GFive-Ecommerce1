'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from 'react';
import { PiShoppingCartLight } from "react-icons/pi";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';

interface User {
  password: string;
  email: string;
}

export default function Login() {
  const router = useRouter();

  const inputClass = "shadow-sm p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200";
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newUser: User = {
      email,
      password
    };
    setEmail("");
    setPass("");

    try {
      const res = await fetch("https://localhost:8081/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Login failed");
      }

      const data = await res.json();

      // ✅ Save token
      Cookies.set("token", data.token, {
        expires: 1, // 1 minute
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      const decoded: any = jwtDecode(data.token);

      console.log(decoded.role);
      if (decoded?.role === "ROLE_ADMIN") {
        router.push("/admin/dashboard");
      } else if (decoded?.role === "ROLE_USER") {
        router.push("/user/product");
      } else {
        alert("Unknown role");
      }
    } catch (err: any) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
    console.log(newUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-5">
      <div className=" flex flex-col md:flex-row justify-center gap-8 w-full max-w-[90%] md:max-w-[80%] lg:max-w-[65%] bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Left side: Enhanced Gradient card */}
        <div className="rounded-b-3xl shadow-2xl hidden md:flex relative flex-col bg-gradient-to-br from-black via-gray-800 to-gray-900 w-full md:w-1/2 p-8 md:p-10 overflow-hidden">
          {/* Subtle animated background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse opacity-50"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-gray-600/20 rounded-full blur-lg animate-pulse"></div>

          {/* Main content */}
          <div className="relative z-10">
            <h1 className="font-bold text-white lg:max-w-[90%] mt-10 md:mt-0 text-[clamp(1.5rem,4vw,2.5rem)] leading-tight drop-shadow-lg animate-fade-in">
              Discover the best deals at Kanzy's
            </h1>
            <p className="text-gray-300 mt-4 text-lg animate-fade-in delay-200">
              Shop smarter, live better.
            </p>
          </div>

          {/* Enhanced shopping cart icon */}
          <PiShoppingCartLight className="absolute left-4 bottom-4 md:max-w-[100px] opacity-80 animate-slide-up" size={180} color="white" />

          {/* Enhanced image with better positioning and effects */}
          <Image
            alt="Ecommerce illustration"
            src="/one.png"
            width={400}
            height={300}
            className="absolute md:left-20 md:bottom-[-60px] lg:left-24 lg:bottom-[-60px] lg:w-[320px] md:w-[280px] h-auto object-contain opacity-90 drop-shadow-2xl animate-fade-in delay-500"
          />

          {/* Floating accent lines */}
          <div className="absolute top-1/2 right-0 w-1 h-32 bg-gradient-to-b from-white/20 to-transparent animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-24 h-1 bg-white/10 rounded-full animate-bounce"></div>
        </div>

        {/* Right side: Login form */}
        <div className="w-full md:w-1/2 px-6 py-12 md:px-8 md:py-16 flex flex-col items-center text-center">
          {/* Logo */}
          <div className="flex justify-center gap-4 mb-6 items-center">
            <Image src="/1.png" alt="Kanzy's Logo" width={60} height={60} className="rounded-full shadow-md" />
            <h1 className="font-bold text-2xl md:text-3xl text-black">Kanzy's</h1>
          </div>

          {/* Welcome text */}
          <div className="pb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-black">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1">Please login to your account</p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={submitHandle}>
            <input
              className={inputClass}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                className={`${inputClass} w-full pr-12`}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={passwordVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors duration-200"
                aria-label="Toggle password visibility"
              >
                {!showPassword && <AiOutlineEye size={20} />}
                {showPassword && <FaRegEyeSlash size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="text-white bg-black h-12 rounded-xl w-full flex items-center justify-center mt-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Forgot Password */}
          <Link className="text-end text-gray-600 text-sm mt-3 hover:text-black transition-colors duration-200" href="/">
            Forgot Password?
          </Link>

          {/* Social Login */}
          <div className="w-full max-w-sm mt-6">
            <div className="flex items-center my-6">
              <div className="grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-600 text-sm">Sign in with</span>
              <div className="grow border-t border-gray-300"></div>
            </div>
            <div className="flex justify-center gap-8">
              <div className="flex gap-2 items-center text-gray-700 hover:text-black transition-colors duration-200 cursor-pointer">
                <FcGoogle size={20} />
                <p className="text-sm font-medium">Google</p>
              </div>
              <div className="flex gap-2 items-center text-gray-700 hover:text-black transition-colors duration-200 cursor-pointer">
                <FaFacebook size={20} />
                <p className="text-sm font-medium">Facebook</p>
              </div>
            </div>
          </div>

          {/* Sign-up prompt */}
          <Link href="/auth/registration" className="mt-6 flex justify-center text-gray-600 text-sm hover:text-black transition-colors duration-200">
            Don't have an account? <span className="text-black font-semibold ml-1">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}