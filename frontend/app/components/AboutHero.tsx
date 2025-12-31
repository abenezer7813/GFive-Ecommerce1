import React from "react";

const AboutHero = () => {
  return (
    <section className="text-center py-20 px-4 bg-gradient-to-r from-indigo-50 via-sky-50 to-rose-50 rounded-3xl shadow-lg animate-slide-down">
      <h1 className="text-5xl font-bold text-indigo-900 mb-4 animate-fade-in-up">
        Welcome to Kanzy Shop
      </h1>
      <p className="text-lg text-indigo-800 max-w-2xl mx-auto animate-fade-in-up delay-200">
        Ethiopia’s premier online marketplace — connecting you with local artisans and premium products.
      </p>
    </section>
  );
};

export default AboutHero;
