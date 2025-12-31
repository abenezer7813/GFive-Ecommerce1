'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from 'react';
import { PiShoppingCartLight } from "react-icons/pi";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface User {
  firstName: string;
  lastName: string;
  gender: string;
  password: string;
  email: string;
  age: number | "";
}

export default function Registration() {
  const router = useRouter();

  const inputClass = "shadow-sm p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200";
  const [users, setUsers] = useState<User[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const passwordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const conPasswordVisibility = () => {
    setShowConPassword(prev => !prev);
  };

  const addUser = async () => {
    try {
      const userToSend = {
        firstName,
        lastName,
        gender,
        password,
        email,
        age,
      };
      const res = await fetch("https://localhost:8081/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToSend),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      const data = await res.text(); // or res.json()

      setFirstName("");
      setLastName("");
      setAge("");
      setGender("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      console.log(data);
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    }
  };

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
    setPasswordError("");
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    const newUser: User = {
      firstName, lastName, gender, age, email, password
    };
    setUsers([newUser]);
    await addUser();
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-5">
      <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-[90%] md:max-w-[80%] lg:max-w-[65%] bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Left side: Enhanced Gradient card (Reduced height) */}
        <div className="rounded-b-3xl shadow-2xl hidden md:flex relative flex-col bg-gradient-to-br from-black via-gray-800 to-gray-900 w-full md:w-1/2 p-6 md:p-8 overflow-hidden">
          {/* Subtle animated background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse opacity-50"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-16 left-8 w-12 h-12 bg-gray-600/20 rounded-full blur-lg animate-pulse"></div>

          {/* Main content */}
          <div className="relative z-10">
            <h1 className="font-bold text-white lg:max-w-[90%] mt-6 md:mt-0 text-[clamp(1.5rem,4vw,2rem)] leading-tight drop-shadow-lg animate-fade-in">
              Join Kanzy's for exclusive deals
            </h1>
            <p className="text-gray-300 mt-3 text-base animate-fade-in delay-200">
              Shop smarter, live better.
            </p>
          </div>

          {/* Enhanced shopping cart icon */}
          <PiShoppingCartLight className="absolute left-4 bottom-4 md:max-w-[120px] opacity-80 animate-slide-up" size={140} color="white" />

          {/* Enhanced image with better positioning and effects */}
          <Image
            alt="Ecommerce illustration"
            src="/one.png"
            width={300}
            height={250}
            className="absolute md:left-16 md:bottom-[-40px] lg:left-20 lg:bottom-[-40px] lg:w-[280px] md:w-[240px] h-auto object-contain opacity-90 drop-shadow-2xl animate-fade-in delay-500"
          />

          {/* Floating accent lines */}
          <div className="absolute top-1/2 right-0 w-1 h-24 bg-gradient-to-b from-white/20 to-transparent animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-20 h-1 bg-white/10 rounded-full animate-bounce"></div>
        </div>

        {/* Right side: Registration form (Reduced padding and gaps) */}
        <div className="w-full md:w-1/2 px-6 py-8 md:px-8 md:py-10 flex flex-col items-center text-center">
          {/* Logo */}
          <div className="flex justify-center gap-4 mb-4 items-center">
            <Image src="/1.png" alt="Kanzy's Logo" width={50} height={50} className="rounded-full shadow-md" />
            <h1 className="font-bold text-xl md:text-2xl text-black">Kanzy's</h1>
          </div>

          {/* Welcome text */}
          <div className="pb-2">
            <h1 className="text-xl md:text-2xl font-bold text-black">Create Your Account</h1>

          </div>

          {/* Form (Reduced gaps) */}
          <form className="flex flex-col gap-3 w-full max-w-sm" onSubmit={submitHandle}>
            <input
              className={inputClass}
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className={inputClass}
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
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
                onChange={(e) => setPassword(e.target.value)}
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
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            <div className="relative">
              <input
                className={`${inputClass} w-full pr-12`}
                placeholder="Confirm Password"
                type={showConPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={conPasswordVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors duration-200"
                aria-label="Toggle confirm password visibility"
              >
                {!showConPassword && <AiOutlineEye size={20} />}
                {showConPassword && <FaRegEyeSlash size={20} />}
              </button>
            </div>
            <input
              className={inputClass}
              placeholder="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
              required
            />
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Gender</span>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="accent-black"
                  required
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="accent-black"
                  required
                />
                Female
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-black h-10 rounded-xl w-full flex items-center justify-center mt-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Social Login */}
          <div className="w-full max-w-sm mt-1">
            <div className="flex items-center my-4">
              <div className="grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-600 text-sm">Sign up with</span>
              <div className="grow border-t border-gray-300"></div>
            </div>
            <div className="flex justify-center gap-6">
              <div className="flex gap-2 items-center text-gray-700 hover:text-black transition-colors duration-200 cursor-pointer">
                <FcGoogle size={18} />
                <p className="text-sm font-medium">Google</p>
              </div>
              <div className="flex gap-2 items-center text-gray-700 hover:text-black transition-colors duration-200 cursor-pointer">
                <FaFacebook size={18} />
                <p className="text-sm font-medium">Facebook</p>
              </div>
            </div>
          </div>

          {/* Sign-in prompt */}
          <Link href="/auth/login" className="mt-4 flex justify-center text-gray-600 text-sm hover:text-black transition-colors duration-200">
            Already have an account? <span className="text-black font-semibold ml-1">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}