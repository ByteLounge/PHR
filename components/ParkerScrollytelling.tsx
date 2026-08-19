"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sliders,
  Play,
  Pause,
} from "lucide-react";
import { useFrameSequence } from "@/lib/useFrameSequence";
import { BrandEntranceLoader } from "@/components/BrandEntranceLoader";

const TOTAL_PARKER_FRAMES = 300;

const getParkerFramePath = (index: number) => {
  const padded = String(Math.max(1, Math.min(TOTAL_PARKER_FRAMES, index))).padStart(3, "0");
  return `/parker-frames/ezgif-frame-${padded}.jpg`;
};

interface ParkerHotspot {
  id: string;
  name: string;
  desc: string;
  x: number;
  y: number;
}

const PARKER_HOTSPOTS: ParkerHotspot[] = [
  {
    id: "p-clip",
    name: "Iconic Arrow Clip & Cap",
    desc: "Polished stainless steel cap with the iconic Parker arrow clip.",
    x: 70,
    y: 28,
  },
  {
    id: "p-button",
    name: "Click Push Mechanism",
    desc: "Precision ratcheting button with stainless helical retention spring.",
    x: 50,
    y: 16,
  },
  {
    id: "p-collar",
    name: "Engraved Chrome Ring",
    desc: "Solid brass collar engraved with authentic Parker branding.",
    x: 50,
    y: 40,
  },
  {
    id: "p-refill",
    name: "Quinkflow Ink Refill",
    desc: "Stainless steel ink cartridge with ultra-smooth fast-drying oil ink.",
    x: 42,
    y: 52,
  },
  {
    id: "p-barrel",
    name: "Lacquered Brass Barrel",
    desc: "Weighted brass body coated in deep royal blue protective lacquer.",
    x: 36,
    y: 63,
  },
  {
    id: "p-tip",
    name: "Tungsten Carbide Tip",
    desc: "0.7mm medium precision point ensuring clean, consistent ink flow.",
    x: 50,
    y: 86,
  },
];

export const ParkerScrollytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<ParkerHotspot | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);

  const {
    canvasRef,
    isReady,
    fastBootProgress,
    currentFrameIndex,
    setTargetFrame,
  } = useFrameSequence({
    totalFrames: TOTAL_PARKER_FRAMES,
    getFramePath: getParkerFramePath,
    keyframeStep: 5,
    fastBootDenseCount: 15,
    maxConcurrentBackground: 6,
  });

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalScrollable = containerHeight - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      setScrollProgress(progress);

      let calculatedFrame = 1;
      if (progress <= 0.15) {
        calculatedFrame = 1;
      } else if (progress > 0.15 && progress <= 0.50) {
        const stageProgress = (progress - 0.15) / 0.35;
        calculatedFrame = 1 + stageProgress * (TOTAL_PARKER_FRAMES - 1);
      } else if (progress > 0.50 && progress <= 0.75) {
        calculatedFrame = TOTAL_PARKER_FRAMES;
      } else if (progress > 0.75 && progress <= 0.88) {
        const stageProgress = (progress - 0.75) / 0.13;
        calculatedFrame = TOTAL_PARKER_FRAMES - stageProgress * 150;
      } else {
        const stageProgress = (progress - 0.88) / 0.12;
        calculatedFrame = 150 - stageProgress * 149;
      }
      setTargetFrame(calculatedFrame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setTargetFrame]);

  // Autoplay
  useEffect(() => {
    if (!isPlayingAuto) return;
    const interval = setInterval(() => {
      setTargetFrame((currentFrameIndex % TOTAL_PARKER_FRAMES) + 1);
    }, 35);
    return () => clearInterval(interval);
  }, [isPlayingAuto, currentFrameIndex, setTargetFrame]);

  const isStage1 = scrollProgress < 0.15;
  const isStage2 = scrollProgress >= 0.15 && scrollProgress < 0.35;
  const isStage3 = scrollProgress >= 0.35 && scrollProgress < 0.55;
  const isStage4 = scrollProgress >= 0.55 && scrollProgress < 0.75;
  const isStage5 = scrollProgress >= 0.75 && scrollProgress < 0.88;
  const isStage6 = scrollProgress >= 0.88;

  const areHotspotsVisible = showHotspots && scrollProgress >= 0.35 && scrollProgress <= 0.75;

  return (
    <div
      id="parker-scrollytelling"
      ref={containerRef}
      className="relative w-full bg-black text-white"
      style={{ height: "550vh" }}
    >
      {/* Sticky Fullscreen Canvas */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden select-none bg-black">
        {/* Floating Store Hierarchy */}
        <div className="absolute top-16 sm:top-20 left-0 right-0 z-20 pointer-events-none flex justify-center px-4">
          <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] sm:text-[11px] font-mono text-neutral-400">
            <span className="text-white font-medium uppercase tracking-wider">
              P.H. Rajput & Sons
            </span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-300 truncate max-w-[140px] sm:max-w-none">
              Parker Luxury Writing
            </span>
          </div>
        </div>

        {/* Responsive Canvas */}
        <div className="relative w-full max-w-6xl aspect-[16/9] flex items-center justify-center p-2 sm:p-4 my-auto">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          />

          {/* Minimal Hotspots */}
          {areHotspotsVisible && (
            <div className="absolute inset-0 pointer-events-auto">
              {PARKER_HOTSPOTS.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => setSelectedHotspot(hotspot)}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-30 touch-manipulation p-1.5"
                  aria-label={`Inspect ${hotspot.name}`}
                >
                  <span className="absolute inset-0 rounded-full bg-white/20 animate-ping pointer-events-none" />
                  <span className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/90 border border-white/60 text-white transition-transform duration-200 group-hover:scale-125">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />
                  </span>

                  <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap bg-black/90 text-white text-[10px] font-medium px-2 py-0.5 rounded border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                    {hotspot.name} ↗
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RESPONSIVE MONOCHROME APPLE OVERLAYS */}

        {/* STAGE 1: THE FORM (0% - 15%) */}
        <div
          className={`absolute left-4 sm:left-12 lg:left-16 bottom-16 sm:bottom-20 max-w-lg pointer-events-none transition-all duration-700 ${
            isStage1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="space-y-2 sm:space-y-3 pointer-events-auto bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3 sm:p-0 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                01 // WRITING INSTRUMENTS • PARKER
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-semibold tracking-tight text-white leading-tight">
              Precision in every stroke.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
              Parker IM Premium Ballpoint Pen in Royal Blue Chrome. Timeless British craftsmanship, available at P.H. Rajput & Sons.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <Link
                href="/products#parker-details"
                className="bg-white text-black hover:bg-neutral-200 font-semibold text-xs px-4 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-1.5 transition-all shadow-lg active:scale-95"
              >
                <span>View Product Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="hidden sm:inline text-[11px] text-neutral-500 font-mono">Scroll to explore ↓</span>
            </div>
          </div>
        </div>

        {/* STAGE 2: THE MECHANISM (15% - 35%) */}
        <div
          className={`absolute left-4 sm:left-12 lg:left-16 top-1/4 sm:top-1/3 -translate-y-1/2 max-w-md pointer-events-none transition-all duration-700 ${
            isStage2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          }`}
        >
          <div className="space-y-1.5 sm:space-y-2 pointer-events-auto bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3 sm:p-0 rounded-xl">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              02 // MECHANICAL BALANCE
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-sans font-semibold text-white leading-tight">
              Engineered balance.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Precision threaded brass chassis, tempered click retractor spring, and frictionless ink delivery designed for effortless long writing sessions.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] sm:text-[11px] text-neutral-300">
              <span className="bg-white/10 border border-white/10 px-2 py-0.5 rounded">All-Metal Brass Body</span>
              <span className="bg-white/10 border border-white/10 px-2 py-0.5 rounded">Quinkflow Technology</span>
            </div>
          </div>
        </div>

        {/* STAGE 3: EXPLODED ANATOMY (35% - 55%) */}
        <div
          className={`absolute right-4 sm:right-12 lg:right-16 top-20 sm:top-28 max-w-sm pointer-events-none transition-all duration-700 ${
            isStage3 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <div className="space-y-1.5 sm:space-y-2 pointer-events-auto text-right bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3 sm:p-0 rounded-xl">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              03 // EXPLODED ANATOMY
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-semibold text-white">
              Anatomy of timeless craft.
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every component is balanced to millimeter tolerances, from the iconic arrow clip down to the tungsten carbide writing ball.
            </p>
            <p className="text-[9px] sm:text-[10px] font-mono text-neutral-400 pt-0.5">
              • Tap any point to inspect specs
            </p>
          </div>
        </div>

        {/* STAGE 4: WRITING FEEL (55% - 75%) */}
        <div
          className={`absolute left-4 sm:left-12 lg:left-16 bottom-16 sm:bottom-20 max-w-xl pointer-events-none transition-all duration-700 ${
            isStage4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="space-y-2 sm:space-y-3 pointer-events-auto bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3 sm:p-0 rounded-xl">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              04 // WRITING FEEL
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-sans font-semibold text-white">
              Crafted for effortless expression.
            </h3>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              Whether signing official documents, drafting plans, or journaling your day, experience the consistent, smear-free flow of authentic Parker Quink ink.
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-0.5 text-xs">
              <div className="border-l border-white/20 pl-2">
                <span className="font-semibold text-white block text-[11px] sm:text-xs">Grip</span>
                <span className="text-[10px] sm:text-[11px] text-neutral-400">Ergonomic profile</span>
              </div>
              <div className="border-l border-white/20 pl-2">
                <span className="font-semibold text-white block text-[11px] sm:text-xs">Ink</span>
                <span className="text-[10px] sm:text-[11px] text-neutral-400">Quinkflow blue</span>
              </div>
              <div className="border-l border-white/20 pl-2">
                <span className="font-semibold text-white block text-[11px] sm:text-xs">Finish</span>
                <span className="text-[10px] sm:text-[11px] text-neutral-400">Scratch lacquer</span>
              </div>
            </div>
          </div>
        </div>

        {/* STAGE 5: THE HERITAGE (75% - 88%) */}
        <div
          className={`absolute left-4 sm:left-12 lg:left-16 top-1/3 -translate-y-1/2 max-w-md pointer-events-none transition-all duration-700 ${
            isStage5 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          }`}
        >
          <div className="space-y-1.5 sm:space-y-2 pointer-events-auto bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3 sm:p-0 rounded-xl">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              05 // HERITAGE
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-sans font-semibold text-white leading-tight">
              An iconic gift. <br />
              <span className="text-neutral-400">A personal hallmark.</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Supplied in an official Parker luxury gift case with genuine certificate, available directly from P.H. Rajput & Sons in Mapusa.
            </p>
          </div>
        </div>

        {/* STAGE 6: REASSEMBLY & FINAL CTA (88% - 100%) */}
        <div
          className={`absolute inset-0 pointer-events-none flex flex-col justify-center items-center p-4 sm:p-6 text-center transition-all duration-700 ${
            isStage6 ? "opacity-100 scale-100" : "opacity-0 scale-98"
          }`}
        >
          <div className="max-w-md pointer-events-auto space-y-3 sm:space-y-4 bg-black/60 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-4 sm:p-0 rounded-2xl">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              06 // AVAILABLE AT P.H. RAJPUT & SONS
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white">
              Your signature instrument.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Parker IM Premium Ballpoint Pen — available at P.H. Rajput & Sons.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <Link
                href="/products#parker-details"
                className="bg-white hover:bg-neutral-200 text-black font-semibold text-xs px-5 py-2.5 sm:px-6 sm:py-3 rounded-full flex items-center gap-1.5 transition-all active:scale-95"
              >
                <span>View Products & Pricing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => {
                  const el = document.getElementById("categories-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-white/20 hover:border-white/40 text-neutral-300 text-xs px-4 py-2.5 sm:py-3 rounded-full transition-colors"
              >
                Explore Catalog
              </button>
            </div>
            <p className="text-[9px] sm:text-[10px] text-neutral-500 font-mono pt-1">
              Guaranteed Authentic • Mapusa Store In-Person Pickup & Goa Delivery
            </p>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6 z-30 pointer-events-auto flex items-center justify-between gap-4 max-w-7xl mx-auto text-[10px] sm:text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-2.5">
            <span className="text-white font-medium">
              {String(currentFrameIndex).padStart(3, "0")} / {TOTAL_PARKER_FRAMES}
            </span>
            <div className="w-16 sm:w-24 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-75"
                style={{ width: `${(currentFrameIndex / TOTAL_PARKER_FRAMES) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHotspots(!showHotspots)}
              className={`p-1.5 rounded border transition-colors ${
                showHotspots ? "border-white/60 text-white" : "border-white/10 text-neutral-500"
              }`}
              title="Toggle Component Pins"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              className="p-1.5 rounded border border-white/10 text-neutral-400 hover:text-white transition-colors"
              title={isPlayingAuto ? "Pause" : "Play 360 Rotation"}
            >
              {isPlayingAuto ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>

      {/* Branded Logo Entrance Loader */}
      <BrandEntranceLoader
        isReady={isReady}
        progress={fastBootProgress}
        subtitle="Parker Luxury Writing Collection"
      />

      {/* Hotspot Modal */}
      {selectedHotspot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedHotspot(null)}
        >
          <div
            className="w-full max-w-sm bg-[#121212] text-white p-5 sm:p-6 rounded-2xl border border-white/15 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                PARKER COMPONENT
              </span>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="text-neutral-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            <h3 className="font-sans font-semibold text-base sm:text-lg text-white">{selectedHotspot.name}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{selectedHotspot.desc}</p>
            <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px] text-neutral-400">
              <span>Available at P.H. Rajput & Sons</span>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="px-3 py-1 bg-white text-black font-semibold rounded text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
