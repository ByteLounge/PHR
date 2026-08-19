"use client";

import React from "react";
import { X, CheckCircle2, Shield, Sparkles } from "lucide-react";

export interface ToolDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  useCase: string;
  highlight: string;
  frameIndex: number;
}

export const TOOL_DATA: Record<string, ToolDetail> = {
  compass: {
    id: "compass",
    name: "Self-Centering Precision Compass",
    category: "Drawing Instrument",
    description:
      "Engineered with a unique spur-gear self-centering mechanism that maintains equal arm extension for effortless, distortion-free circles and arcs.",
    features: [
      "Spur-gear self-centering mechanism prevents arm wobble",
      "Ergonomic knurled pencil tightening screw",
      "Die-cast zinc construction for long-term rigidity",
      "Smooth arm pivot for micro-adjustments",
    ],
    useCase: "Circles, geometric constructions, bisecting angles, and trigonometry proofs.",
    highlight: "Spur Gear Self-Centering",
    frameIndex: 260,
  },
  divider: {
    id: "divider",
    name: "Double-Needle Precision Divider",
    category: "Measuring Instrument",
    description:
      "Features twin sharp needle points crafted from tempered steel, ideal for step-measuring line segments and accurate dimension transfer.",
    features: [
      "Dual needle points for pinpoint accuracy",
      "Balanced weight distribution for one-handed operation",
      "Firm pivot joint that holds distances reliably",
      "Corrosion-resistant matte finish",
    ],
    useCase: "Dividing line segments, transferring scale measurements, and map reading.",
    highlight: "Dual Tempered Needles",
    frameIndex: 260,
  },
  ruler: {
    id: "ruler",
    name: "15cm Transparent Beveled Ruler",
    category: "Measuring Tool",
    description:
      "Crystal-clear optical-grade acrylic ruler with dual metric (cm/mm) and imperial (inch) markings, featuring a beveled edge to prevent ink smudging.",
    features: [
      "Scratch-resistant crystal clear acrylic",
      "Dual metric and imperial graduations",
      "Beveled edge prevents pencil and ink smearing",
      "Snug fit inside the lower tray compartment",
    ],
    useCase: "Straight line drafting, margins, and linear measurements in exams.",
    highlight: "Anti-Smudge Beveled Edge",
    frameIndex: 280,
  },
  setsquares: {
    id: "setsquares",
    name: "45° & 60° Precision Set Squares",
    category: "Drafting Geometry",
    description:
      "Complementary pair of 45° and 60°/30° set squares molded from transparent acrylic with high-contrast millimeter scales.",
    features: [
      "Crisp, clear right-angle corners",
      "Dual 45°/45° and 30°/60° set",
      "Finger cutouts for effortless lifting from paper",
      "High transparency for viewing underlying grids",
    ],
    useCase: "Parallel lines, perpendicular drafting, 3D isometric sketching, and technical drawings.",
    highlight: "High Transparency Acrylic",
    frameIndex: 290,
  },
  protractor: {
    id: "protractor",
    name: "180° Semi-Circular Protractor",
    category: "Angle Measurement",
    description:
      "Precision 180-degree protractor with bidirectional numbering for measuring clockwise and counterclockwise angles with ease.",
    features: [
      "Bidirectional 0° to 180° degree graduations",
      "Recessed center origin marker for exact vertex alignment",
      "Anti-glare crystal clarity",
      "Durable non-brittle polymer",
    ],
    useCase: "Measuring and constructing angles, polygon proofs, and physics vectors.",
    highlight: "Zero-Offset Center Point",
    frameIndex: 290,
  },
  eraser: {
    id: "eraser",
    name: "Classmate Dust-Free Eraser",
    category: "Stationery Essential",
    description:
      "Specially formulated polymer eraser that rolls residue into clean rolls rather than messy dust, keeping drawing sheets pristine.",
    features: [
      "Dust-free technology rolls shavings neatly",
      "Soft texture prevents paper tearing",
      "Removes graphite without ghost smudges",
      "Protective cardboard sleeve included",
    ],
    useCase: "Graphite correction on exam answer sheets and drafting paper.",
    highlight: "Minimal Residue Formulation",
    frameIndex: 270,
  },
  sharpener: {
    id: "sharpener",
    name: "Classmate Precision Sharpener",
    category: "Sharpening Tool",
    description:
      "Compact sharpener equipped with an anti-rust high-carbon steel blade calibrated to produce a long, needle-sharp pencil tip without lead breakage.",
    features: [
      "High-carbon surgical steel blade",
      "Contoured grip for finger stability",
      "Optimized 23° cutting angle prevents lead snap",
      "Fits standard 8mm pencils and short compass pencils",
    ],
    useCase: "Sharpening drawing pencils and compass leads on the go.",
    highlight: "Anti-Rust High-Carbon Blade",
    frameIndex: 270,
  },
  pencil: {
    id: "pencil",
    name: "Short HB Wooden Drawing Pencil",
    category: "Writing Tool",
    description:
      "Compact pre-sharpened HB wooden pencil with an integrated eraser top, specifically proportioned to fit securely inside the compass clamp.",
    features: [
      "High-density graphite core for dark, consistent lines",
      "Pre-sharpened and ready for immediate use",
      "Integrated eraser cap for fast touch-ups",
      "Exact length matched to internal tray slot",
    ],
    useCase: "Geometry circles, construction lines, and margin notes.",
    highlight: "Balanced Compact Length",
    frameIndex: 270,
  },
  tray: {
    id: "tray",
    name: "Molded Dual-Tier Organizer Tray",
    category: "Case Component",
    description:
      "Custom-contoured transparent internal organizer tray engineered to hold each instrument firmly in place without rattling or scratching.",
    features: [
      "Dedicated snap-fit recesses for every instrument",
      "Prevents needles and points from dulling",
      "Dual-tier separation keeps rulers and set squares protected",
      "Lightweight shatter-resistant plastic",
    ],
    useCase: "Silent transport and rapid tool retrieval in the classroom.",
    highlight: "Anti-Rattle Custom Contours",
    frameIndex: 180,
  },
  tin: {
    id: "tin",
    name: "Embossed Protective Tin Case",
    category: "Outer Shell",
    description:
      "Rigid pressed tin case with a modern curved silhouette, metallic dark graphic lid, and luxury gold-tone bottom tray for lifelong stationery protection.",
    features: [
      "Rigid metal casing protects contents from backpack pressure",
      "Classmate Asteroid signature aerodynamic graphics",
      "Integrated 'Name & Class' label slot on side",
      "Gold-tone bottom finish with secure snap-lock closure",
    ],
    useCase: "Daily school transport, desk storage, and drop protection.",
    highlight: "Pressed Metallic Armor",
    frameIndex: 1,
  },
};

interface InteractiveToolModalProps {
  toolId: string | null;
  onClose: () => void;
}

export const InteractiveToolModal: React.FC<InteractiveToolModalProps> = ({ toolId, onClose }) => {
  if (!toolId || !TOOL_DATA[toolId]) return null;

  const tool = TOOL_DATA[toolId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg max-h-[90vh] bg-[#0E0E0E] text-white rounded-2xl shadow-2xl border border-white/15 overflow-y-auto animate-scaleIn flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-[#141414] p-5 sm:p-6 border-b border-white/10 relative shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-white" />
              {tool.category}
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold font-sans text-white mt-1.5">{tool.name}</h3>
          <div className="mt-2 inline-flex items-center gap-1.5 bg-white/5 text-neutral-300 text-[11px] px-2.5 py-0.5 rounded-full border border-white/10 font-mono">
            <span>Classmate Asteroid Component</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm flex-1">
          <p className="text-neutral-300 leading-relaxed">
            {tool.description}
          </p>

          {/* Key Features */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono font-medium uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-white" />
              Key Engineering Features
            </h4>
            <div className="grid grid-cols-1 gap-2 pt-0.5">
              {tool.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300 bg-white/5 p-2.5 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Use Case */}
          <div className="bg-black/60 p-3.5 rounded-xl border border-white/10">
            <p className="text-[11px] font-mono uppercase font-semibold text-neutral-400 mb-0.5">
              Ideal Practical Use Case:
            </p>
            <p className="text-xs text-neutral-300">{tool.useCase}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#141414] px-5 sm:px-6 py-3.5 border-t border-white/10 flex items-center justify-between shrink-0">
          <div className="text-[11px] font-mono text-neutral-400">
            Available at <span className="text-white font-semibold">P.H. Rajput & Sons</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white text-black font-semibold text-xs rounded-lg transition-colors hover:bg-neutral-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
