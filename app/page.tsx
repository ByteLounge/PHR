"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { ParkerScrollytelling } from "@/components/ParkerScrollytelling";
import { CategorySection } from "@/components/CategorySection";
import { StoreTrustSection } from "@/components/StoreTrustSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white selection:bg-phr-gold-500 selection:text-black">
      {/* Anchor for top of page */}
      <div id="hero-top" />

      {/* Responsive Navbar */}
      <Navbar />

      {/* Main Hero 3D Scrollytelling: Parker IM Premium Pen */}
      <ParkerScrollytelling />

      {/* Stationery Departments Catalog */}
      <CategorySection />

      {/* Store Trust & Retailer Heritage (P.H. Rajput & Sons) */}
      <StoreTrustSection />

      {/* Store Footer */}
      <Footer />
    </main>
  );
}

