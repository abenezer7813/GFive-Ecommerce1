'use client'

import React from "react";
import ContactForm from "@/components/ContactForm";
import Map from "../../components/Map";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-900 dark:text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 animate-slide-down">Contact Kanzy Shop</h1>
        <p className="text-lg animate-fade-in-up">
          Have questions or suggestions? Fill out the form below or reach us through our contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <ContactForm />
        <Map />
      </div>
    </main>
  );
}
