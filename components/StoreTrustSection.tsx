"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  FileText,
  ShieldCheck,
  PackageCheck,
  Clock,
  MessageCircle,
} from "lucide-react";

export const StoreTrustSection: React.FC = () => {
  const [showCardModal, setShowCardModal] = useState(false);

  return (
    <section id="store-trust" className="py-20 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
            THE RETAILER
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white tracking-tight">
            Your stationery, all in one place.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
            P.H. Rajput & Sons brings together everyday stationery, school essentials, writing supplies, and creative tools in one convenient destination.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Business Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div
              onClick={() => setShowCardModal(true)}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-white p-2 cursor-pointer transition-transform duration-300 hover:scale-[1.02] group"
            >
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-gray-50">
                <Image
                  src="/business-card.jpeg"
                  alt="P.H. Rajput & Sons Business Card"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="bg-black/80 text-white text-xs font-mono px-3 py-1.5 rounded-full border border-white/20">
                  Inspect Official Card 🔍
                </span>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-[#0E0E0E] p-5 rounded-2xl border border-white/10 space-y-3 text-xs text-neutral-300 font-mono">
              <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                <div className="w-8 h-8 rounded-lg bg-white p-0.5 shrink-0 flex items-center justify-center">
                  <Image src="/logo.jpeg" alt="Logo" width={28} height={28} className="object-contain" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-white">
                    P.H. Rajput & Sons
                  </h4>
                  <p className="text-[10px] text-neutral-400">
                    Stationery • Office Supplies • Party Supplies
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>Shop No. 178, Mapusa Municipal Market, Mapusa-Goa</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-white shrink-0" />
                  <span>+91 9623270683 / +91 9421242934</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-white shrink-0" />
                  <span>PHRajpoot@proton.me</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-white shrink-0" />
                  <span>GSTIN: 30AEXPR7400N1ZZ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0E0E0E] p-5 rounded-2xl border border-white/10 space-y-2">
                <ShieldCheck className="w-5 h-5 text-white" />
                <h4 className="font-semibold text-sm text-white">100% Authentic Brands</h4>
                <p className="text-xs text-neutral-400">
                  Direct official inventory from Classmate, Parker, Camlin, and Faber-Castell.
                </p>
              </div>

              <div className="bg-[#0E0E0E] p-5 rounded-2xl border border-white/10 space-y-2">
                <MapPin className="w-5 h-5 text-white" />
                <h4 className="font-semibold text-sm text-white">Mapusa Municipal Market</h4>
                <p className="text-xs text-neutral-400">
                  Shop No. 178 in the central market for easy walk-in shopping and swift pickups.
                </p>
              </div>

              <div className="bg-[#0E0E0E] p-5 rounded-2xl border border-white/10 space-y-2">
                <PackageCheck className="w-5 h-5 text-white" />
                <h4 className="font-semibold text-sm text-white">School & Institutional Packs</h4>
                <p className="text-xs text-neutral-400">
                  Curated geometry, notebook, and pen packages for students, schools, and offices.
                </p>
              </div>

              <div className="bg-[#0E0E0E] p-5 rounded-2xl border border-white/10 space-y-2">
                <Clock className="w-5 h-5 text-white" />
                <h4 className="font-semibold text-sm text-white">Direct WhatsApp Assistance</h4>
                <p className="text-xs text-neutral-400">
                  Personalized stock inquiries and fast order confirmations on WhatsApp.
                </p>
              </div>
            </div>

            {/* Banner */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <h4 className="font-semibold text-sm text-white">Custom supplies or bulk orders?</h4>
                <p className="text-xs text-neutral-400">Reach out to our Mapusa store directly.</p>
              </div>
              <a
                href="https://wa.me/919623270683?text=Hello%20P.H.%20Rajput%20%26%20Sons%2C%20I%20have%20an%20inquiry%20about%20stationery%20supplies."
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-white hover:bg-neutral-200 text-black font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Store</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {showCardModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowCardModal(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
              <Image src="/business-card.jpeg" alt="Card" fill className="object-contain" />
            </div>
            <div className="mt-4 flex justify-between items-center px-2">
              <span className="text-xs text-neutral-600 font-mono">Mapusa, Goa Credentials</span>
              <button
                onClick={() => setShowCardModal(false)}
                className="px-4 py-1.5 bg-black text-white rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
