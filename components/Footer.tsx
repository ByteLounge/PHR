"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  FileText,
  Clock,
  ArrowUp,
  MessageCircle,
} from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-neutral-400 border-t border-white/10 text-xs">
      {/* Top Banner */}
      <div className="border-b border-white/10 py-10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white p-1 shrink-0 flex items-center justify-center border border-white/20">
              <Image
                src="/logo.jpeg"
                alt="P.H. Rajput & Sons"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-lg text-white">
                P.H. Rajput & Sons
              </h3>
              <p className="text-[11px] font-mono text-neutral-400">
                Est. Stationery & Co. • Mapusa, Goa
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/919623270683?text=Hello%20P.H.%20Rajput%20%26%20Sons%2C%20I%20would%20like%20to%20order%20stationery%20supplies."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-neutral-200 font-semibold px-4 py-2.5 rounded-full text-xs transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Store Order (+91 9623270683)</span>
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Store Intro */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-white">
              About The Store
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Your trusted neighborhood and digital stationery store. Providing genuine school essentials, mathematical instruments, writing supplies, and office stationery to families, students, and professionals.
            </p>
          </div>

          {/* Col 2: Showcases */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-white">
              Interactive 3D Showcases
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Parker IM Premium Pen</span>
                  <span className="text-[9px] font-mono bg-white/10 text-white px-1.5 py-0.5 rounded">HERO</span>
                </Link>
              </li>
              <li>
                <Link href="/geometry" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Classmate Asteroid Box</span>
                  <span className="text-[9px] font-mono bg-white/10 text-white px-1.5 py-0.5 rounded">3D</span>
                </Link>
              </li>
              <li>
                <Link href="/geometry#product-details" className="hover:text-white transition-colors">
                  Geometry Specifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Departments */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-white">
              Stationery Departments
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/#categories-section" className="hover:text-white transition-colors">
                  Writing & Luxury Pens
                </Link>
              </li>
              <li>
                <Link href="/geometry#categories-section" className="hover:text-white transition-colors">
                  Geometry & Mathematics
                </Link>
              </li>
              <li>
                <Link href="/#categories-section" className="hover:text-white transition-colors">
                  Notebooks & Paper
                </Link>
              </li>
              <li>
                <Link href="/#categories-section" className="hover:text-white transition-colors">
                  School Essentials
                </Link>
              </li>
              <li>
                <Link href="/#categories-section" className="hover:text-white transition-colors">
                  Art & Craft Supplies
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Info */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-white">
              Store Information & Location
            </h4>
            <div className="space-y-2 text-xs">
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

        {/* Bottom Legal / Disclaimer */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <p>© 2026 P.H. Rajput & Sons (Est. Stationery & Co.). All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl">
            Brand Hierarchy: P.H. Rajput & Sons is an independent stationery retailer. Classmate and Parker are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};
