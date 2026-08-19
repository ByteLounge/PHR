"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  MapPin,
  ShieldCheck,
  Truck,
  Award,
  MessageCircle,
  Clock,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

interface VariantOption {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  badge?: string;
  description: string;
}

const VARIANTS: VariantOption[] = [
  {
    id: "classmate-asteroid-compass-box",
    name: "Single Asteroid Compass Box",
    price: 130,
    originalPrice: 140,
    description: "1x Complete Classmate Asteroid 10-piece geometry tin set",
  },
  {
    id: "classmate-asteroid-duo-pack",
    name: "Student Duo Pack (2 Sets)",
    price: 249,
    originalPrice: 280,
    badge: "Save ₹31",
    description: "2x Complete Classmate Asteroid Sets (Home + School Bag)",
  },
  {
    id: "classmate-asteroid-exam-bundle",
    name: "Complete Geometry & Exam Kit",
    price: 349,
    originalPrice: 395,
    badge: "Best Value",
    description: "1x Asteroid Box + 1x Classmate Notebook + 2x Gel Pens + Graph Pad",
  },
];

const GALLERY_VIEWS = [
  { id: "assembled", label: "Assembled Tin", frameSrc: "/frames/ezgif-frame-001.jpg" },
  { id: "exploded", label: "Exploded View", frameSrc: "/frames/ezgif-frame-300.jpg" },
  { id: "tray", label: "Instrument Tray", frameSrc: "/frames/ezgif-frame-120.jpg" },
  { id: "lineup", label: "Components Lineup", frameSrc: "/frames/ezgif-frame-240.jpg" },
];

export const ProductEcommerceSection: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<VariantOption>(VARIANTS[0]);
  const [selectedGallery, setSelectedGallery] = useState(GALLERY_VIEWS[0]);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(
      {
        id: selectedVariant.id,
        name: selectedVariant.name,
        brand: "Classmate",
        price: selectedVariant.price,
        originalPrice: selectedVariant.originalPrice,
        image: selectedGallery.frameSrc,
        variant: selectedVariant.name,
      },
      quantity
    );
  };

  const handleWhatsAppOrder = () => {
    const msg = encodeURIComponent(
      `Hello P.H. Rajput & Sons! I would like to order:\n` +
      `Product: ${selectedVariant.name}\n` +
      `Quantity: ${quantity}\n` +
      `Price: ₹${selectedVariant.price * quantity}\n` +
      `Please confirm pickup at Shop No. 178 Mapusa or delivery across Goa.`
    );
    window.open(`https://wa.me/919623270683?text=${msg}`, "_blank");
  };

  return (
    <section id="product-details" className="py-20 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-neutral-400">
              <span>OFFICIAL STATIONERY RETAILER</span>
              <span>•</span>
              <span className="text-neutral-300">P.H. Rajput & Sons (Shop No. 178, Mapusa, Goa)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white tracking-tight">
              Classmate Asteroid Compass Box
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Precision mathematical drawing instruments with self-centering spur gear technology, housed in an aerodynamic protective metal case.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <span className="font-semibold text-white">4.9 / 5.0</span>
            <span>(140+ reviews)</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-10 items-start">
          {/* Left Column: Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4 lg:sticky top-24">
            <div className="relative aspect-[16/10] bg-[#0A0A0A] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center p-4 group">
              <Image
                src={selectedGallery.frameSrc}
                alt={selectedGallery.label}
                fill
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                priority
              />

              <div className="absolute top-4 left-4 z-10">
                <span className="bg-black/80 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-full border border-white/10">
                  {selectedGallery.label}
                </span>
              </div>

              <div className="absolute bottom-4 right-4 z-10">
                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded border border-white/10">
                  Classmate • Original
                </span>
              </div>
            </div>

            {/* Thumbnail Switcher */}
            <div className="grid grid-cols-4 gap-3">
              {GALLERY_VIEWS.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setSelectedGallery(view)}
                  className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all p-1 bg-[#0E0E0E] ${
                    selectedGallery.id === view.id
                      ? "border-white shadow-lg"
                      : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={view.frameSrc} alt={view.label} fill className="object-contain p-1" />
                </button>
              ))}
            </div>

            {/* In Store Notice */}
            <div className="bg-[#0E0E0E] p-4 rounded-xl border border-white/10 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/5 text-white shrink-0 border border-white/10">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 text-xs text-neutral-400">
                <span className="font-semibold text-white block">In-Store Stock at Mapusa Market</span>
                <p>Available for immediate pickup at Shop No. 178, Mapusa Municipal Market, Goa.</p>
              </div>
            </div>
          </div>

          {/* Right Column: E-Commerce Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0E0E0E] p-6 sm:p-7 rounded-2xl border border-white/10 shadow-2xl space-y-6">
              {/* Pricing */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-neutral-400 font-mono">STORE PRICE</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-semibold font-sans text-white">
                      ₹{selectedVariant.price}
                    </span>
                    <span className="text-sm text-neutral-500 line-through font-mono">
                      ₹{selectedVariant.originalPrice}
                    </span>
                    <span className="text-xs font-mono text-white bg-white/10 border border-white/10 px-2 py-0.5 rounded">
                      SAVE ₹{selectedVariant.originalPrice - selectedVariant.price}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    In Stock
                  </span>
                  <p className="text-[10px] text-neutral-500 font-mono">Genuine Factory Pack</p>
                </div>
              </div>

              {/* Variant Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Select Pack Option:
                </label>
                <div className="space-y-2">
                  {VARIANTS.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        selectedVariant.id === v.id
                          ? "border-white bg-white/10 ring-1 ring-white/20"
                          : "border-white/10 hover:border-white/20 bg-transparent"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white">{v.name}</span>
                          {v.badge && (
                            <span className="text-[9px] font-mono text-white bg-white/15 border border-white/20 px-1.5 py-0.2 rounded">
                              {v.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-400">{v.description}</p>
                      </div>
                      <span className="text-sm font-semibold text-white">₹{v.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-xs font-mono uppercase text-neutral-400">Quantity:</span>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-1 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center font-bold text-sm hover:bg-white/20 text-white"
                  >
                    -
                  </button>
                  <span className="text-xs font-semibold text-white w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center font-bold text-sm hover:bg-white/20 text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-white hover:bg-neutral-200 text-black font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] text-xs sm:text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag — ₹{selectedVariant.price * quantity}</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/15 font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp (+91 9623270683)</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs text-neutral-400 font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-white shrink-0" />
                  <span>Safe Packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white shrink-0" />
                  <span>Goa Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-white shrink-0" />
                  <span>P.H. Rajput Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16 bg-[#0E0E0E] rounded-2xl border border-white/10 p-6 sm:p-8">
          <h3 className="text-base font-semibold text-white mb-4">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-neutral-400">Brand</span>
              <span className="font-semibold text-white">Classmate (ITC Ltd.)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-neutral-400">Model</span>
              <span className="font-semibold text-white">Asteroid Mathematical Instruments</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-neutral-400">Compass Technology</span>
              <span className="font-semibold text-white">Spur-Gear Self-Centering</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-neutral-400">Casing Material</span>
              <span className="font-semibold text-white">Pressed Metal Tin with Gold-Tone Base</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-neutral-400">Authorized Retailer</span>
              <span className="font-semibold text-white">P.H. Rajput & Sons (Mapusa, Goa)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-neutral-400">Dimensions</span>
              <span className="font-semibold text-white">17.5 cm × 7.5 cm × 2.0 cm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
