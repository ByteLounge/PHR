"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  PenTool,
  BookOpen,
  Palette,
  Briefcase,
  Paperclip,
  GraduationCap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  popularItems: string[];
  itemCount: string;
  href?: string;
  badge?: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "writing-instruments",
    title: "Writing & Luxury Pens",
    subtitle: "Parker IM Premium, fountain pens, Octane gel pens & mechanical pencils",
    icon: <PenTool className="w-5 h-5 text-white" />,
    popularItems: ["Parker IM Premium", "Parker Quink Refills", "Octane Gel Pens"],
    itemCount: "120+ Products",
    href: "/",
    badge: "Hero 3D",
  },
  {
    id: "geometry-math",
    title: "Geometry & Mathematics",
    subtitle: "Classmate Asteroid, self-centering compasses, set squares & drafting kits",
    icon: <Compass className="w-5 h-5 text-white" />,
    popularItems: ["Classmate Asteroid Box", "Camlin Scale 30cm", "Technical Drafter"],
    itemCount: "35+ Products",
    href: "/geometry",
    badge: "Classmate 3D",
  },
  {
    id: "school-essentials",
    title: "School Essentials",
    subtitle: "Exam clipboards, pencil pouches, scissors, adhesives & student kits",
    icon: <GraduationCap className="w-5 h-5 text-white" />,
    popularItems: ["Exam Writing Board", "Double-Zip Pouch", "Student Scissors"],
    itemCount: "80+ Products",
  },
  {
    id: "notebooks-paper",
    title: "Notebooks & Paper",
    subtitle: "Classmate spiral registers, practical record notebooks & graph pads",
    icon: <BookOpen className="w-5 h-5 text-white" />,
    popularItems: ["Classmate Long Books", "6-Subject Spiral Note", "Graph Pad"],
    itemCount: "95+ Products",
  },
  {
    id: "art-craft",
    title: "Art & Craft Supplies",
    subtitle: "Artist water colours, oil pastels, acrylics, markers & sketchpads",
    icon: <Palette className="w-5 h-5 text-white" />,
    popularItems: ["Faber-Castell Pastels", "Camel Watercolors", "Craft Paper"],
    itemCount: "60+ Products",
  },
  {
    id: "office-supplies",
    title: "Office Supplies",
    subtitle: "Staplers, 2-hole punches, document folders, desk organizers & notes",
    icon: <Briefcase className="w-5 h-5 text-white" />,
    popularItems: ["Kangaro Stapler", "Expanding File Folder", "Sticky Notes"],
    itemCount: "75+ Products",
  },
  {
    id: "stationery-accessories",
    title: "Stationery Accessories",
    subtitle: "Dust-free polymer erasers, sharpeners, correction fluid & acrylic scales",
    icon: <Paperclip className="w-5 h-5 text-white" />,
    popularItems: ["Dust-Free Eraser", "Rotary Sharpener", "Correction Tape"],
    itemCount: "50+ Products",
  },
];

export const CategorySection: React.FC = () => {
  const { setIsSearchOpen } = useCart();

  return (
    <section id="categories-section" className="py-20 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              STATIONERY DEPARTMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white tracking-tight mt-1">
              Explore Our Store Catalog
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Authentic school essentials, mathematical instruments, and luxury writing tools available at P.H. Rajput & Sons in Mapusa, Goa.
            </p>
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs font-mono px-4 py-2.5 rounded-full border border-white/15 transition-all shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Search Full Catalog</span>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-8">
          {CATEGORIES.map((category) => {
            const Content = (
              <div className="group bg-[#0E0E0E] p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-white/40 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer hover:-translate-y-0.5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                      {category.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      {category.badge && (
                        <span className="text-[9px] font-mono text-white bg-white/10 border border-white/15 px-1.5 py-0.5 rounded">
                          {category.badge}
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-neutral-500">{category.itemCount}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-base text-white group-hover:text-neutral-200 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{category.subtitle}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {category.popularItems.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-white/5 text-neutral-300 border border-white/5 px-2 py-0.5 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white">
                  <span>Explore Department</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );

            return category.href ? (
              <Link key={category.id} href={category.href}>
                {Content}
              </Link>
            ) : (
              <div key={category.id} onClick={() => setIsSearchOpen(true)}>
                {Content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
