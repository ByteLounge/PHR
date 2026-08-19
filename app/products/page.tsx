"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { ParkerEcommerceSection } from "@/components/ParkerEcommerceSection";
import { ProductEcommerceSection } from "@/components/ProductEcommerceSection";
import { CategorySection } from "@/components/CategorySection";
import { StoreTrustSection } from "@/components/StoreTrustSection";
import { Footer } from "@/components/Footer";
import { Sparkles, ShieldCheck, MapPin } from "lucide-react";

export default function ProductsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white selection:bg-phr-gold-500 selection:text-black">
      <div id="hero-top" />

      {/* Responsive Navbar */}
      <Navbar />

      {/* Products Page Header */}
      <section className="pt-28 pb-10 bg-gradient-to-b from-neutral-950 via-black to-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1 rounded-full text-xs font-mono text-neutral-300">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>OFFICIAL STORE PRODUCTS & PRICING</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-sans font-semibold tracking-tight text-white">
                Products & Pricing Catalog
              </h1>
              <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
                Explore genuine luxury writing instruments, mathematics geometry tools, and academic essentials available at P.H. Rajput & Sons in Mapusa, Goa.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-1.5 bg-[#0E0E0E] px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>100% Genuine</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0E0E0E] px-3 py-1.5 rounded-lg border border-white/10">
                <MapPin className="w-4 h-4 text-white" />
                <span>Mapusa Market Pickup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parker IM Premium Pen Section */}
      <ParkerEcommerceSection />

      {/* Classmate Asteroid Geometry Box Section */}
      <ProductEcommerceSection />

      {/* All Stationery Departments Navigation */}
      <CategorySection />

      {/* Store Trust & Retailer Credentials */}
      <StoreTrustSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
