'use client'
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from 'react';
import { PiShoppingCartLight } from "react-icons/pi";
import { AiOutlineEye } from "react-icons/ai";


interface User {
  firstName: string
  lastName: string
  gender: string
  password: string
  email: string
  age: number | ""
}

export default function registration() {
  const inputClass = "shadow-sm p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400";
  const [users, setUsers] = useState<User[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword]= useState(false);
  const [showConPassword, setShowConPassword]= useState(false);

  const passwordVisibility =() =>{
    setShowPassword(prev => !prev)
  }
   const conPasswordVisibility =() =>{
    setShowConPassword(prev => !prev)
  }

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
    const res = await fetch("https://localhost:8081/user/register", {
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
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};


const submitHandle = (e: React.FormEvent) => {
  e.preventDefault();
  if (password != confirmPassword){
    alert("Password do not match!")
    return;
  }
  const newUser: User ={
     firstName, lastName, gender, age, email, password
  }
  setUsers([newUser]);
  addUser();
  setFirstName("");
  setLastName("");
  setAge("");
  setGender("");
  setEmail("");
  setPassword("");
  setConfirmPassword("");
  // your logic
}

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-100 p-5">
      <div className="flex flex-col  border-2 border-amber-500  md:flex-row justify-center gap-8 w-full max-w-[80%] pr-10 pl-10 md:pl-0 md:pr-0 lg:max-w-[65%] md:max-w-[80%] bg-white rounded-4xl shadow-2xl overflow-hidden">
        
        {/* Left side: Gradient card */}
<div className="rounded-b-4xl rounded-tr-full hidden md:flex relative flex-col bg-linear-to-t from-amber-200 via-amber-500 to-orange-400 w-full md:w-1/2 p-10">
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
        <div className="w-full md:w-1/2 p-5 text-center  flex-col items-center">
          
          {/* Logo */}
          <div className="flex justify-center gap-5 mb-3 items-center">
            <Image src="/1.png" alt="E Spurt Logo" width={70} height={70} className="rounded-full" />
            <h1 className="font-bold text-2xl">E Spurt</h1>
          </div>

          {/* Welcome text */}
          <div className="pb-4">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Please login to your account</p>
          </div>

          {/* Form Inputs */}
          {/* Form Inputs */}
          <form className="flex flex-col gap-3 w-full" onSubmit={submitHandle}>
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
            <div className=' relative flex'>
               <input
              className={`${inputClass} w-full`}
              placeholder="Password"
              type={showPassword? "text": "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type='button' onClick={passwordVisibility}  
            className='hover:cursor-pointer absolute right-4 top-1/2 -translate-y-1/2' >
                          {!showPassword && <AiOutlineEye size={20} />}
                          {showPassword &&<FaRegEyeSlash size={20}/>}
            </button>

            </div>
            <div className=' relative flex'>

            <input
              className={`${inputClass} w-full`}
              placeholder="Confirmation Password"
              type={showConPassword? "text" :"password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            
             <button type='button' onClick={conPasswordVisibility}  
            className='hover:cursor-pointer absolute right-4 top-1/2 -translate-y-1/2' >
                          {!showConPassword && <AiOutlineEye size={20} />}
                          {showConPassword &&<FaRegEyeSlash size={20}/>}
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
             <div className='flex item-center gap-1 '>
              <span className=' p-2 mr-10'>
                Gender
              </span>
              <label className='flex items-center gap-2 mr-3'>
                <input 
                type='radio'
                name='gender'
                value="male"
                checked={gender === "male"}
                onChange={(e)=> setGender(e.target.value)}
                className="accent-orange-400 "
                required
                />
                Male
              </label>
              <label className='flex items-center gap-2'>
                <input
                type='radio'
                value="female"
                name='gender'
                checked={gender === "female"}
                onChange={(e)=> setGender(e.target.value)}
                required
                />
                Female
              </label>
            </div>
            <button type="submit" className="text-white bg-orange-400 h-12 rounded-xl w-full flex items-center justify-center mt-1">
              Register
            </button>
          </form>
          
            {/* Social Login */}
            <div className=" mt-2 w-full">
<div className="flex items-center my-3">
  <div className="grow border-t border-gray-300"></div>
  <span className="mx-4 text-gray-600 text-sm">Sign up with</span>
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
            <Link href="/auth/login" className="mt-3 flex justify-center text-gray-600">
              Already have an account?  <p className="text-orange-400 font-semibold pl-1">Sign in</p>
            </Link>
          </div>
        </div>
      </div>
  );
};

