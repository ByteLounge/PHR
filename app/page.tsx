"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { ParkerScrollytelling } from "@/components/ParkerScrollytelling";
import { ParkerEcommerceSection } from "@/components/ParkerEcommerceSection";
import { CategorySection } from "@/components/CategorySection";
import { StoreTrustSection } from "@/components/StoreTrustSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const handleShopClick = () => {
    const el = document.getElementById("parker-details");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-white selection:bg-phr-gold-500 selection:text-black">
      {/* Anchor for top of page */}
      <div id="hero-top" />

      {/* Responsive Navbar */}
      <Navbar onShopClick={handleShopClick} />

      {/* Main Hero 3D Scrollytelling: Parker IM Premium Pen */}
      <ParkerScrollytelling onShopClick={handleShopClick} />

      {/* Parker E-Commerce & Gifting Section */}
      <ParkerEcommerceSection />

      {/* Stationery Departments Catalog */}
      <CategorySection />

      {/* Store Trust & Retailer Heritage (P.H. Rajput & Sons) */}
      <StoreTrustSection />

      {/* Store Footer */}
      <Footer />
    </main>
  );
}
