"use client";

import { useEffect, useState } from "react";
import { FaBoxOpen, FaDollarSign } from "react-icons/fa";
import { getProductAnalytics } from "@/lib/dashboard";
import { redirect } from "next/navigation";


const Page = () => {
 redirect('/admin/dashboard');

};

export default Page;
