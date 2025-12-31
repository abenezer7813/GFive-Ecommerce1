import React from "react";
import AboutHero from "../../components/AboutHero";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { Users, Truck, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-slate-50 p-6 dark:bg-gray-900 dark:text-gray-100">
      <section className="max-w-6xl mx-auto">
        <AboutHero />

        <div className="mt-10 text-center">
          <h2 className="text-4xl font-bold mb-4 animate-slide-down">About Kanzy Shop</h2>
          <p className="text-lg max-w-2xl mx-auto animate-fade-in-up">
            Kanzy Shop empowers local Ethiopian artisans by delivering high-quality products directly to customers nationwide.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle>
                <Users className="h-5 w-5 text-indigo-600" /> Our People
              </CardTitle>
            </CardHeader>
            <CardContent>
              Dedicated team delivering premium e-commerce experiences and best-in-class customer support.
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up delay-100">
            <CardHeader>
              <CardTitle>
                <Truck className="h-5 w-5 text-emerald-500" /> Reliable Shipping
              </CardTitle>
            </CardHeader>
            <CardContent>
              Fast, trackable shipping and hassle-free returns for a smooth shopping experience.
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up delay-200">
            <CardHeader>
              <CardTitle>
                <Star className="h-5 w-5 text-amber-500" /> Quality Promise
              </CardTitle>
            </CardHeader>
            <CardContent>
              Curated products and rigorous quality assurance, designed for longevity and delight.
            </CardContent>
          </Card>
        </div>

        <section className="mt-12 grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl bg-white/60 backdrop-blur-md shadow-md p-6 animate-fade-in-up">
            <h3 className="text-2xl font-semibold mb-3">Our Story</h3>
            <p className="text-sm leading-relaxed">
              Founded with a simple idea: make great Ethiopian products accessible online while delivering exceptional support.
            </p>
            <h4 className="mt-6 text-lg font-medium">What drives us</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Human-centered design and effortless shopping flows</li>
              <li>Sustainable sourcing and long-term product value</li>
              <li>Fast, transparent support and hassle-free returns</li>
            </ul>
          </article>

          <aside className="space-y-4">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>Press & Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                Interested in collaborating? Reach out for wholesale, press inquiries, and integrations.
              </CardContent>
            </Card>
            <Card className="animate-fade-in-up delay-100">
              <CardHeader>
                <CardTitle>Careers</CardTitle>
              </CardHeader>
              <CardContent>
                We’re building something special. Check our careers page for openings in product, design, and support.
              </CardContent>
            </Card>
          </aside>
        </section>
      </section>
    </main>
  );
}
