"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroScrollytelling } from "@/components/HeroScrollytelling";
import { ProductEcommerceSection } from "@/components/ProductEcommerceSection";
import { CategorySection } from "@/components/CategorySection";
import { StoreTrustSection } from "@/components/StoreTrustSection";
import { Footer } from "@/components/Footer";

export default function GeometryPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleShopClick = () => {
    const el = document.getElementById("product-details");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-white selection:bg-phr-gold-500 selection:text-black">
      <div id="hero-top" />

      {/* Responsive Navbar */}
      <Navbar scrollProgress={scrollProgress} onShopClick={handleShopClick} />

      {/* Classmate Asteroid 3D Scrollytelling Showcase */}
      <HeroScrollytelling
        onScrollUpdate={(prog) => setScrollProgress(prog)}
        onShopClick={handleShopClick}
      />

      {/* Classmate Asteroid E-Commerce & Specifications Section */}
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
