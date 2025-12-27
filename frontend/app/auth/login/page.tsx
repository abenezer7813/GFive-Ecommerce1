'use client'
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from 'react';
import { PiShoppingCartLight } from "react-icons/pi";
import { AiOutlineEye } from "react-icons/ai";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


interface User {
  
  password: string
  email: string


}
export default function login() {

    const router = useRouter();


  const inputClass = "shadow-sm p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400";
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [showPassword, setShowPassword]= useState(false);
   const [loading, setLoading] = useState(false);


  const passwordVisibility =() =>{
    setShowPassword(prev => !prev)
  }

const submitHandle = async (e: React.FormEvent) => {
  e.preventDefault();
      setLoading(true);

  
  const newUser: User ={
     email, password
  }
  setEmail("")
  setPass("")


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
  expires: 1 , // 1 minute
        sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
      });

      // ✅ Redirect user
      router.push("/product");

    } catch (err: any) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  console.log(newUser)
}

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-100 p-5">
      <div className="border-amber-500 border-2 flex flex-col  md:flex-row justify-center gap-8 w-full max-w-[80%] pr-10 pl-10 md:pl-0 md:pr-0 lg:max-w-[65%] md:max-w-[80%] bg-white rounded-4xl shadow-2xl overflow-hidden">
        
        {/* Left side: Gradient card */}
<div className="rounded-b-4xl rounded-tr-full shadow-xl  hidden md:flex relative flex-col bg-linear-to-t from-amber-200 via-amber-500 to-orange-400 w-full md:w-1/2 p-10">
          <h1 className="font-bold text-white lg:max-w-[90%] mt-10 md:mt-0 text-[clamp(1.5rem,4vw,2.5rem)]">
  Simplify management with our dashboard
</h1>
          <PiShoppingCartLight className='absolute left-0 -bottom-12 md:max-w-[150]' size={250} color='white' />
         <Image
  alt=""
  src="/one.png"
  width={400}
  height={300}
  className="absolute md:left-20 md:bottom-[-100] lg:left-20 lg:bottom-[-100] lg:w-full md:w-full h-auto"
/>
     </div>
        {/* Right side: Registration/Login form */}
        <div className="w-full md:w-1/2 px-5 py-15 text-center  flex-col items-center">
          {/* Logo */}
          <div className="flex justify-center gap-5 mb-6 items-center">
            <Image src="/1.png" alt="E Spurt Logo" width={70} height={70} className="rounded-full" />
            <h1 className="font-bold text-2xl">E Spurt</h1>
          </div>

          {/* Welcome text */}
          <div className="pb-7">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Please login to your account</p>
          </div>

          {/* Form Inputs */}
          {/* Form Inputs */}
          <form className="flex flex-col gap-3 w-full" onSubmit={submitHandle}>
            <input
              className={inputClass}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className=' relative flex'>
               <input
              className={`${inputClass} w-full`}
              placeholder="Password"
              type={showPassword? "text": "password"}
              value={password}
              onChange={(e) => setPass(e.target.value)}
              required
            />
            <button type='button' onClick={passwordVisibility}  
            className='hover:cursor-pointer absolute right-4 top-1/2 -translate-y-1/2' >
                          {!showPassword && <AiOutlineEye size={20} />}
                          {showPassword &&<FaRegEyeSlash size={20}/>}
            </button>

            </div>
           
            <button type="submit"   disabled={loading}
 className="text-white bg-orange-400 h-12 rounded-xl w-full flex items-center justify-center mt-2">
              {loading ? "Logging in..." : "Login"}
            </button>
            
          </form>

            
          <Link className='flex flex-col text-end p-1 text-gray-600' href={"/"}>Forgot Password?</Link>
        
        
          
            {/* Social Login */}
            <div className="  w-full">
<div className="flex items-center my-6">
  <div className="grow border-t border-gray-300"></div>
  <span className="mx-4 text-gray-600 text-sm">Sign in with</span>
  <div className="grow border-t border-gray-300"></div>
</div>              <div className='flex justify-evenly'>
                <div className="flex gap-2 items-center">
                <FcGoogle size={20}/>
                <p>Google</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaFacebook size={20}/>
                <p>Facebook</p>
              </div>
              </div>
            </div>

            {/* Sign-up prompt */}
            <Link href="/auth/registration" className="mt-7 flex justify-center text-gray-600">
              Do you have an account?  <p className="text-orange-400 font-semibold pl-1">Sign up</p>
            </Link>
          </div>
        </div>
      </div>
  )
}

