"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroScrollytelling } from "@/components/HeroScrollytelling";
import { ProductEcommerceSection } from "@/components/ProductEcommerceSection";
import { CategorySection } from "@/components/CategorySection";
import { StoreTrustSection } from "@/components/StoreTrustSection";
import { Footer } from "@/components/Footer";

export default function StationeryPage() {
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

      {/* Navbar */}
      <Navbar scrollProgress={scrollProgress} onShopClick={handleShopClick} />

      {/* Classmate Asteroid 3D Showcase */}
      <HeroScrollytelling
        onScrollUpdate={(prog) => setScrollProgress(prog)}
        onShopClick={handleShopClick}
      />

      {/* Product E-Commerce Section */}
      <ProductEcommerceSection />

      {/* Full Catalog Navigation */}
      <CategorySection />

      {/* Store Trust */}
      <StoreTrustSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
