"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface SearchProduct {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  description: string;
}

const SEARCH_DATABASE: SearchProduct[] = [
  {
    id: "parker-im-premium-ballpoint",
    name: "Parker IM Premium Ballpoint Pen",
    category: "Writing & Luxury Pens",
    brand: "Parker",
    price: 750,
    image: "/parker-frames/ezgif-frame-001.jpg",
    description: "Royal blue lacquered brass barrel with chrome trim and QuinkFlow medium refill",
  },
  {
    id: "classmate-asteroid-compass-box",
    name: "Classmate Asteroid Compass Box",
    category: "Geometry & Mathematics",
    brand: "Classmate",
    price: 130,
    image: "/frames/ezgif-frame-001.jpg",
    description: "Self-centering spur gear compass, divider, ruler, set squares & eraser tin set",
  },
  {
    id: "parker-im-gift-bundle",
    name: "Parker Executive Gift Set (+ Extra Refill)",
    category: "Writing & Luxury Pens",
    brand: "Parker",
    price: 999,
    image: "/parker-frames/ezgif-frame-300.jpg",
    description: "Parker IM Pen + extra Quink refill in a luxury presentation box",
  },
  {
    id: "classmate-asteroid-duo-pack",
    name: "Classmate Asteroid Student Duo Pack (2 Sets)",
    category: "Geometry & Mathematics",
    brand: "Classmate",
    price: 249,
    image: "/frames/ezgif-frame-300.jpg",
    description: "Pack of 2 Classmate Asteroid complete geometry sets for school and tuition",
  },
  {
    id: "classmate-pulse-notebook-spiral",
    name: "Classmate Pulse 6-Subject Spiral Notebook",
    category: "Notebooks & Paper",
    brand: "Classmate",
    price: 185,
    image: "/frames/ezgif-frame-120.jpg",
    description: "300 pages premium paper with colored divider tabs for high school students",
  },
  {
    id: "classmate-octane-gel-pens",
    name: "Classmate Octane Gel Pen Pack (5 Colors)",
    category: "Writing Instruments",
    brand: "Classmate",
    price: 50,
    image: "/frames/ezgif-frame-240.jpg",
    description: "Waterproof fast-drying gel pens for smooth and dark handwriting",
  },
];

export const SearchDialog: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useCart();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = SEARCH_DATABASE.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.brand.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-[#0E0E0E] text-white rounded-2xl shadow-2xl border border-white/15 overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-4 h-4 text-white shrink-0" />
          <input
            type="text"
            placeholder="Search Parker pens, Classmate Asteroid, geometry sets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-sm bg-transparent text-white placeholder-neutral-500 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-neutral-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-2">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-neutral-500 text-xs">
              No products found matching &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-lg bg-black overflow-hidden shrink-0 border border-white/10">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 uppercase">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span className="text-neutral-500">{item.brand}</span>
                    </div>
                    <h4 className="font-semibold text-xs sm:text-sm text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 truncate">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-semibold text-white">₹{item.price}</span>
                  <button
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        name: item.name,
                        brand: item.brand,
                        price: item.price,
                        originalPrice: item.price + 50,
                        image: item.image,
                      });
                      setIsSearchOpen(false);
                    }}
                    className="px-3 py-1.5 bg-white hover:bg-neutral-200 text-black rounded-lg text-xs font-semibold transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-black/60 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-500">
          <span>P.H. Rajput & Sons Official Catalog • Mapusa, Goa</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
