"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface BrandEntranceLoaderProps {
  isReady: boolean;
  progress: number;
  subtitle?: string;
}

const MIN_DISPLAY_DURATION_MS = 5000; // 5 seconds display duration

export const BrandEntranceLoader: React.FC<BrandEntranceLoaderProps> = ({
  isReady,
  progress,
  subtitle = "Interactive 3D Experience",
}) => {
  const [phase, setPhase] = useState<"loading" | "animating" | "done">("loading");
  const [displayProgress, setDisplayProgress] = useState(0);
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({
    transform: "translate(-50%, -50%) scale(1)",
    opacity: 1,
    transition: "none",
  });
  const [backdropOpacity, setBackdropOpacity] = useState(1);
  const isReadyRef = useRef(isReady);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

  // Smooth 5-second progress timer & transition coordinator
  useEffect(() => {
    const startTime = Date.now();
    hasTriggeredRef.current = false;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeRatio = Math.min(1, elapsed / MIN_DISPLAY_DURATION_MS);
      
      // Smooth eased progression over 5 seconds
      const timeProgress = Math.round(timeRatio * 100);
      
      // If assets are ready, allow progress to reach 100% based on timer
      // If not yet ready, cap visual progress at 96% until assets finish
      const currentVisualProgress = isReadyRef.current
        ? Math.max(timeProgress, progress)
        : Math.min(timeProgress, 96);

      setDisplayProgress(Math.min(100, Math.max(0, currentVisualProgress)));

      // Trigger transition after 5 seconds have elapsed and assets are ready
      if (elapsed >= MIN_DISPLAY_DURATION_MS && isReadyRef.current && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        setDisplayProgress(100);
        clearInterval(interval);

        setTimeout(() => {
          setPhase("animating");

          // Measure target navbar logo position
          const navLogo = document.getElementById("navbar-brand-logo");
          let targetCenterX = 40;
          let targetCenterY = 32;
          let targetScale = 0.36;

          if (navLogo) {
            const rect = navLogo.getBoundingClientRect();
            targetCenterX = rect.left + rect.width / 2;
            targetCenterY = rect.top + rect.height / 2;
            targetScale = rect.width / 96; // 96px is initial loader logo width
          } else {
            // Fallback based on standard navbar alignment
            targetCenterX = Math.max(28, (window.innerWidth - 1280) / 2 + 36);
            targetCenterY = 32;
            targetScale = 36 / 96;
          }

          const initialCenterX = window.innerWidth / 2;
          const initialCenterY = window.innerHeight * 0.42;

          const deltaX = targetCenterX - initialCenterX;
          const deltaY = targetCenterY - initialCenterY;

          // Apply fluid transition to top left corner
          setTransformStyle({
            transform: `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(${targetScale})`,
            opacity: 1,
            transition: "transform 750ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease-out",
          });

          // Fade backdrop smoothly
          setBackdropOpacity(0);

          // Finish and unmount after animation completes
          setTimeout(() => {
            setPhase("done");
          }, 850);
        }, 150);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [progress]);

  if (phase === "done") return null;

  const isAnimating = phase === "animating";

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black select-none pointer-events-none transition-opacity duration-700 ${
        isAnimating ? "pointer-events-none" : "pointer-events-auto"
      }`}
      style={{
        opacity: backdropOpacity,
        transition: "opacity 650ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Centered Moving Logo Emblem */}
      <div
        className="fixed z-[101]"
        style={{
          left: "50%",
          top: "42%",
          ...transformStyle,
          willChange: "transform, opacity",
        }}
      >
        <div className="relative group">
          {/* Ambient Glow Halo */}
          {!isAnimating && (
            <div className="absolute -inset-6 rounded-full bg-white/15 blur-2xl animate-pulse pointer-events-none" />
          )}

          {/* Rotating Subtle Loading Ring */}
          {!isAnimating && (
            <div
              className="absolute -inset-2.5 rounded-3xl border border-white/20 border-t-white animate-spin pointer-events-none"
              style={{ animationDuration: "2.5s" }}
            />
          )}

          {/* The Highlighted Logo Card */}
          <div
            className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white p-2 border border-white/40 shadow-2xl shadow-white/10 flex items-center justify-center transition-all duration-500 ${
              !isAnimating ? "scale-100" : ""
            }`}
          >
            <Image
              src="/logo.jpeg"
              alt="P.H. Rajput & Sons"
              width={96}
              height={96}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </div>
      </div>

      {/* Brand Title & Loading Progress Elements (Fades out when animating) */}
      <div
        className={`fixed inset-x-0 top-[56%] sm:top-[57%] flex flex-col items-center justify-center space-y-4 px-4 text-center transition-all duration-300 ${
          isAnimating ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>P.H. RAJPUT & SONS</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-sans font-semibold tracking-tight text-white">
            P.H. Rajput & Sons
          </h2>
          <p className="text-[11px] sm:text-xs text-neutral-400 font-mono tracking-widest uppercase">
            Est. Stationery & Co. • Mapusa, Goa
          </p>
          {subtitle && (
            <p className="text-[10px] text-neutral-500 font-mono">
              {subtitle}
            </p>
          )}
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-44 sm:w-56 space-y-2 pt-1">
          <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-150 ease-out"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-neutral-400">
            <span>Loading Sequence</span>
            <span className="text-white font-medium">{displayProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
