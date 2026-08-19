"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, ArrowRight, PenTool, Compass } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  scrollProgress?: number;
  onExploreClick?: () => void;
  onShopClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollProgress = 0, onExploreClick, onShopClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen, setIsSearchOpen } = useCart();
  const pathname = usePathname();

  const isGeometryPage = pathname === "/geometry" || pathname === "/stationery";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/85 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
            : "bg-gradient-to-b from-black/80 via-black/30 to-transparent py-4 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* LEFT: P.H. Rajput & Sons Store Logo */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2.5 group focus:outline-none rounded-md"
              >
                <div
                  id="navbar-brand-logo"
                  className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-white/20 bg-white p-0.5 transition-transform group-hover:scale-105"
                >
                  <Image
                    src="/logo.jpeg"
                    alt="P.H. Rajput & Sons"
                    width={36}
                    height={36}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold tracking-tight text-sm sm:text-base leading-none text-white">
                    P.H. Rajput & Sons
                  </span>
                  <span className="text-[9px] tracking-widest uppercase font-mono text-neutral-400">
                    Est. Stationery & Co. • Mapusa
                  </span>
                </div>
              </Link>
            </div>

            {/* CENTER: Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-400">
              <Link
                href="/"
                className={`transition-colors hover:text-white flex items-center gap-1.5 ${
                  pathname === "/" ? "text-white font-semibold" : "text-neutral-400"
                }`}
              >
                <PenTool className="w-3.5 h-3.5 text-white" />
                <span>Parker Pen (3D)</span>
              </Link>

              <Link
                href="/products"
                className={`transition-colors hover:text-white flex items-center gap-1.5 ${
                  pathname === "/products" ? "text-white font-semibold" : "text-neutral-400"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-white" />
                <span>Products & Pricing</span>
              </Link>

              <Link
                href="/geometry"
                className={`transition-colors hover:text-white flex items-center gap-1.5 ${
                  pathname === "/geometry" || pathname === "/stationery"
                    ? "text-white font-semibold"
                    : "text-neutral-400"
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-white" />
                <span>Classmate Asteroid (3D)</span>
              </Link>

              <button
                onClick={() => scrollToSection("store-trust")}
                className="transition-colors hover:text-white text-neutral-400"
              >
                About Store
              </button>

              <button
                onClick={() => scrollToSection("categories-section")}
                className="transition-colors hover:text-white text-neutral-400"
              >
                All Departments
              </button>
            </nav>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search catalog"
                className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Cart Bag */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping Bag"
                className="relative p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Shop CTA */}
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-1.5 bg-white hover:bg-neutral-200 text-black font-semibold text-xs px-4 py-2 rounded-full transition-all active:scale-95"
              >
                <span>Shop Products</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open menu"
                className="p-2 rounded-lg md:hidden text-white hover:bg-white/10 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md md:hidden animate-fadeIn">
          <div className="fixed top-16 right-0 bottom-0 w-4/5 max-w-sm bg-[#0C0C0C] p-6 shadow-2xl flex flex-col justify-between border-l border-white/10 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                <Image src="/logo.jpeg" alt="Logo" width={32} height={32} className="rounded" />
                <div>
                  <h4 className="font-sans font-semibold text-sm text-white">
                    P.H. Rajput & Sons
                  </h4>
                  <p className="text-[10px] font-mono text-neutral-400 uppercase">
                    Mapusa Market, Goa
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  Featured 3D Showcases
                </p>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-between border ${
                    !isGeometryPage
                      ? "bg-white/10 text-white border-white/20"
                      : "text-neutral-300 border-white/5 hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <PenTool className="w-3.5 h-3.5 text-white" />
                    <span>Parker Pen (Dashboard)</span>
                  </span>
                  <span className="text-[9px] bg-white/15 text-white px-1.5 py-0.5 rounded font-mono">
                    HERO
                  </span>
                </Link>

                <Link
                  href="/geometry"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-between border ${
                    isGeometryPage
                      ? "bg-white/10 text-white border-white/20"
                      : "text-neutral-300 border-white/5 hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-white" />
                    <span>Classmate Asteroid Box</span>
                  </span>
                  <span className="text-[9px] bg-white/15 text-white px-1.5 py-0.5 rounded font-mono">
                    3D
                  </span>
                </Link>

                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-between border ${
                    pathname === "/products"
                      ? "bg-white/10 text-white border-white/20"
                      : "text-neutral-300 border-white/5 hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-3.5 h-3.5 text-white" />
                    <span>Products & Pricing</span>
                  </span>
                  <span className="text-[9px] bg-white/15 text-white px-1.5 py-0.5 rounded font-mono">
                    SHOP
                  </span>
                </Link>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  Store Navigation
                </p>
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-neutral-300 hover:bg-white/5 block"
                >
                  Products Catalog & Pricing
                </Link>
                <button
                  onClick={() => scrollToSection("store-trust")}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-neutral-300 hover:bg-white/5"
                >
                  About P.H. Rajput & Sons
                </button>
                <button
                  onClick={() => scrollToSection("categories-section")}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-neutral-300 hover:bg-white/5"
                >
                  All Stationery Departments
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
