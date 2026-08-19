"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Sliders,
  Play,
  Pause,
} from "lucide-react";
import { InteractiveToolModal } from "./InteractiveToolModal";
import { useCart } from "@/context/CartContext";
import { useFrameSequence } from "@/lib/useFrameSequence";
import { BrandEntranceLoader } from "@/components/BrandEntranceLoader";

const TOTAL_FRAMES = 300;

const getFramePath = (index: number) => {
  const padded = String(Math.max(1, Math.min(TOTAL_FRAMES, index))).padStart(3, "0");
  return `/frames/ezgif-frame-${padded}.jpg`;
};

interface HotspotConfig {
  id: string;
  name: string;
  x: number;
  y: number;
  toolKey: string;
}

const HOTSPOTS: HotspotConfig[] = [
  { id: "h-compass", name: "Spur-Gear Compass", x: 16, y: 55, toolKey: "compass" },
  { id: "h-divider", name: "Precision Divider", x: 26, y: 55, toolKey: "divider" },
  { id: "h-ruler", name: "15cm Beveled Scale", x: 48, y: 53, toolKey: "ruler" },
  { id: "h-pencil", name: "Drawing Pencil", x: 50, y: 64, toolKey: "pencil" },
  { id: "h-sharpener", name: "Steel Sharpener", x: 33, y: 63, toolKey: "sharpener" },
  { id: "h-eraser", name: "Dust-Free Eraser", x: 75, y: 35, toolKey: "eraser" },
  { id: "h-setsquares", name: "45° & 60° Set Squares", x: 79, y: 48, toolKey: "setsquares" },
  { id: "h-protractor", name: "180° Protractor", x: 79, y: 66, toolKey: "protractor" },
  { id: "h-tray", name: "Molded Tray", x: 50, y: 38, toolKey: "tray" },
  { id: "h-tin", name: "Asteroid Metallic Case", x: 50, y: 18, toolKey: "tin" },
];

export const HeroScrollytelling: React.FC<{
  onScrollUpdate?: (progress: number) => void;
  onShopClick?: () => void;
}> = ({ onScrollUpdate, onShopClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);

  const { addToCart } = useCart();

  const {
    canvasRef,
    isReady,
    fastBootProgress,
    currentFrameIndex,
    setTargetFrame,
  } = useFrameSequence({
    totalFrames: TOTAL_FRAMES,
    getFramePath,
    keyframeStep: 5,
    fastBootDenseCount: 15,
    maxConcurrentBackground: 6,
  });

  // Scroll Progress Handler
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
      if (onScrollUpdate) onScrollUpdate(progress);

      let calculatedFrame = 1;
      if (progress <= 0.15) {
        calculatedFrame = 1;
      } else if (progress > 0.15 && progress <= 0.50) {
        const stageProgress = (progress - 0.15) / 0.35;
        calculatedFrame = 1 + stageProgress * (TOTAL_FRAMES - 1);
      } else if (progress > 0.50 && progress <= 0.75) {
        calculatedFrame = TOTAL_FRAMES;
      } else if (progress > 0.75 && progress <= 0.88) {
        const stageProgress = (progress - 0.75) / 0.13;
        calculatedFrame = TOTAL_FRAMES - stageProgress * 150;
      } else {
        const stageProgress = (progress - 0.88) / 0.12;
        calculatedFrame = 150 - stageProgress * 149;
      }
      setTargetFrame(calculatedFrame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScrollUpdate, setTargetFrame]);

  // Autoplay
  useEffect(() => {
    if (!isPlayingAuto) return;
    const interval = setInterval(() => {
      setTargetFrame((currentFrameIndex % TOTAL_FRAMES) + 1);
    }, 35);
    return () => clearInterval(interval);
  }, [isPlayingAuto, currentFrameIndex, setTargetFrame]);


  const scrollToShop = () => {
    if (onShopClick) {
      onShopClick();
    } else {
      const details = document.getElementById("product-details");
      if (details) details.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isStage1 = scrollProgress < 0.15;
  const isStage2 = scrollProgress >= 0.15 && scrollProgress < 0.35;
  const isStage3 = scrollProgress >= 0.35 && scrollProgress < 0.55;
  const isStage4 = scrollProgress >= 0.55 && scrollProgress < 0.75;
  const isStage5 = scrollProgress >= 0.75 && scrollProgress < 0.88;
  const isStage6 = scrollProgress >= 0.88;

  const areHotspotsVisible = showHotspots && scrollProgress >= 0.35 && scrollProgress <= 0.75;

  return (
    <div
      id="scrollytelling-section"
      ref={containerRef}
      className="relative w-full bg-black text-white"
      style={{ height: "550vh" }}
    >
      {/* Sticky Fullscreen Scrollytelling Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden select-none bg-black">
        {/* Floating Store Hierarchy */}
        <div className="absolute top-16 sm:top-20 left-0 right-0 z-20 pointer-events-none flex justify-center px-4">
          <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] sm:text-[11px] font-mono text-neutral-400">
            <span className="text-white font-medium uppercase tracking-wider">
              P.H. Rajput & Sons
            </span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-300 truncate max-w-[140px] sm:max-w-none">
              Classmate Asteroid Series
            </span>
          </div>
        </div>

        {/* Responsive Centered Canvas */}
        <div className="relative w-full max-w-6xl aspect-[16/9] flex items-center justify-center p-2 sm:p-4 my-auto">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          />

          {/* Minimal Responsive Hotspots */}
          {areHotspotsVisible && (
            <div className="absolute inset-0 pointer-events-auto">
              {HOTSPOTS.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => setSelectedTool(hotspot.toolKey)}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-30 touch-manipulation p-1.5"
                  aria-label={`Inspect ${hotspot.name}`}
                >
                  <span className="absolute inset-0 rounded-full bg-white/20 animate-ping pointer-events-none" />
                  <span className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/90 border border-white/60 text-white transition-transform duration-200 group-hover:scale-125">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />
                  </span>

                  {/* Micro Tooltip */}
                  <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap bg-black/90 text-white text-[10px] font-medium px-2 py-0.5 rounded border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                    {hotspot.name} ↗
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RESPONSIVE MONOCHROME APPLE OVERLAYS */}

        {/* STAGE 1: HERO / PRODUCT INTRO (0% - 15%) */}
        <div
          className={`absolute left-4 sm:left-12 lg:left-16 bottom-16 sm:bottom-20 max-w-lg pointer-events-none transition-all duration-700 ${
            isStage1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="space-y-2 sm:space-y-3 pointer-events-auto bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3 sm:p-0 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                01 // P.H. RAJPUT & SONS • MAPUSA
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-semibold tracking-tight text-white leading-tight">
              Everything you need. <br />
              <span className="text-neutral-400 font-normal">In one box.</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
              A smart, compact stationery companion designed to keep your everyday essentials organized.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={scrollToShop}
                className="bg-white text-black hover:bg-neutral-200 font-semibold text-xs px-4 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-1.5 transition-all shadow-lg active:scale-95"
              >
                <span>Shop Now — ₹130</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="hidden sm:inline text-[11px] text-neutral-500 font-mono">Scroll to explore ↓</span>
            </div>
          </div>
        </div>

        {/* STAGE 2: PRODUCT REVEAL (15% - 35%) */}
        <div
          className={`absolute left-4 sm:left-12 lg:left-16 top-1/4 sm:top-1/3 -translate-y-1/2 max-w-md pointer-events-none transition-all duration-700 ${
            isStage2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          }`}
        >
          <div className="space-y-1.5 sm:space-y-2 pointer-events-auto bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3 sm:p-0 rounded-xl">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              02 // PRODUCT REVEAL
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-sans font-semibold text-white leading-tight">
              Open. Organize. <br />
              <span className="text-neutral-400">Create.</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Discover the thoughtful organization inside the Classmate Asteroid Compass Box, available at P.H. Rajput & Sons.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] sm:text-[11px] text-neutral-300">
              <span className="bg-white/10 border border-white/10 px-2 py-0.5 rounded">Organized essentials</span>
              <span className="bg-white/10 border border-white/10 px-2 py-0.5 rounded">Compact design</span>
            </div>
          </div>
        </div>

        {/* STAGE 3: THE DETAILS (35% - 55%) */}
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
              Every detail has a place.
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              From geometry essentials to everyday writing tools, the Asteroid Compass Box keeps your stationery together, organized, and ready to use.
            </p>
            <p className="text-[9px] sm:text-[10px] font-mono text-neutral-400 pt-0.5">
              • Tap any point to inspect
            </p>
          </div>
        </div>

        {/* STAGE 4: BUILT FOR EVERYDAY (55% - 75%) */}
        <div
          className={`absolute left-4 sm:left-12 lg:left-16 bottom-16 sm:bottom-20 max-w-xl pointer-events-none transition-all duration-700 ${
            isStage4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="space-y-2 sm:space-y-3 pointer-events-auto bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3 sm:p-0 rounded-xl">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              04 // DAILY PRACTICE
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-sans font-semibold text-white">
              Built for the everyday.
            </h3>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              From mathematics class to homework sessions, keep the essentials together without adding unnecessary bulk to your bag.
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-0.5 text-xs">
              <div className="border-l border-white/20 pl-2">
                <span className="font-semibold text-white block text-[11px] sm:text-xs">Carry</span>
                <span className="text-[10px] sm:text-[11px] text-neutral-400">Compact size</span>
              </div>
              <div className="border-l border-white/20 pl-2">
                <span className="font-semibold text-white block text-[11px] sm:text-xs">Organize</span>
                <span className="text-[10px] sm:text-[11px] text-neutral-400">No loose pins</span>
              </div>
              <div className="border-l border-white/20 pl-2">
                <span className="font-semibold text-white block text-[11px] sm:text-xs">Create</span>
                <span className="text-[10px] sm:text-[11px] text-neutral-400">Class & exams</span>
              </div>
            </div>
          </div>
        </div>

        {/* STAGE 5: THE STATIONERY EXPERIENCE (75% - 88%) */}
        <div
          className={`absolute left-4 sm:left-12 lg:left-16 top-1/3 -translate-y-1/2 max-w-md pointer-events-none transition-all duration-700 ${
            isStage5 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          }`}
        >
          <div className="space-y-1.5 sm:space-y-2 pointer-events-auto bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3 sm:p-0 rounded-xl">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              05 // PRECISION
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-sans font-semibold text-white leading-tight">
              Small tools. <br />
              <span className="text-neutral-400">Big possibilities.</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Whether you&apos;re drawing a perfect circle, measuring a line, solving a geometry problem, or simply getting through the school day, the right tools are always within reach.
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
              Ready for your next idea.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Classmate Asteroid Compass Box — available at P.H. Rajput & Sons.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <button
                onClick={() => {
                  addToCart({
                    id: "classmate-asteroid-compass-box",
                    name: "Classmate Asteroid Compass Box",
                    brand: "Classmate",
                    price: 130,
                    originalPrice: 140,
                    image: "/frames/ezgif-frame-001.jpg",
                  });
                }}
                className="bg-white hover:bg-neutral-200 text-black font-semibold text-xs px-5 py-2.5 sm:px-6 sm:py-3 rounded-full flex items-center gap-1.5 transition-all active:scale-95"
              >
                <span>Shop Now — ₹130</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={scrollToShop}
                className="border border-white/20 hover:border-white/40 text-neutral-300 text-xs px-4 py-2.5 sm:py-3 rounded-full transition-colors"
              >
                View Details
              </button>
            </div>
            <p className="text-[9px] sm:text-[10px] text-neutral-500 font-mono pt-1">
              Your stationery. Your everyday essentials. From P.H. Rajput & Sons.
            </p>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6 z-30 pointer-events-auto flex items-center justify-between gap-4 max-w-7xl mx-auto text-[10px] sm:text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-2.5">
            <span className="text-white font-medium">
              {String(currentFrameIndex).padStart(3, "0")} / {TOTAL_FRAMES}
            </span>
            <div className="w-16 sm:w-24 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-75"
                style={{ width: `${(currentFrameIndex / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHotspots(!showHotspots)}
              className={`p-1.5 rounded border transition-colors ${
                showHotspots ? "border-white/60 text-white" : "border-white/10 text-neutral-500"
              }`}
              title="Toggle Component Hotspots"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              className="p-1.5 rounded border border-white/10 text-neutral-400 hover:text-white transition-colors"
              title={isPlayingAuto ? "Pause" : "Play 360 Explosion"}
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
        subtitle="Classmate Asteroid 3D Showcase"
      />

      <InteractiveToolModal toolId={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  );
};
