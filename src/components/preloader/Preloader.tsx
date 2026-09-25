"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export interface PreloaderProps {
  readonly onComplete?: () => void;
}

/**
 * Anvaya 2D Minimal Loading Screen (Awwwards Standard)
 * - Pure 2D precision geometric vector animation
 * - Monospace telemetry counter (00 to 100%)
 * - Seamless upward curtain shutter wipe on completion
 * - Themeable via CSS variable tokens (--bg-canvas, --accent-primary, etc.)
 */
export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Counter (00 to 100%) in 1.1s with power2.inOut easing
      const counterState = { val: 0 };
      tl.to(counterState, {
        val: 100,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          setCount(Math.floor(counterState.val));
        },
      });

      // 2. 2D Vector Stroke Drawing
      tl.fromTo(
        ".reticle-geom polygon, .reticle-geom rect",
        { strokeDashoffset: 350, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.95, stagger: 0.1, ease: "power3.out" },
        0
      );

      // Subtle continuous rotation
      tl.to(
        ".reticle-rotating",
        { rotation: 180, duration: 1.4, ease: "power1.inOut" },
        0
      );

      // 3. Bottom hairline progress bar
      tl.fromTo(
        "#preloader-progress-bar",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
        0
      );

      // 4. Quick fade of center text & telemetry
      tl.to(
        [".preloader-hud-content", "#preloader-progress-bar"],
        { opacity: 0, duration: 0.22, ease: "power2.out" },
        "+=0.05"
      );

      // 5. The Awwwards Curtain Shutter Reveal (Wipes upward in 0.7s)
      tl.to(curtainRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power4.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Background Curtain that slides upward */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#090A0F] text-[#F8FAFC] flex flex-col justify-between p-6 sm:p-10 border-b border-white/10"
        style={{ backgroundColor: "var(--bg-canvas, #090A0F)" }}
      >
        {/* TOP HUD: Corner Coordinates & Runtime Status */}
        <div className="preloader-hud-content flex justify-between items-center text-[11px] sm:text-xs font-mono tracking-widest text-[#94A3B8] uppercase">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
            <span className="text-[#F8FAFC] font-semibold">ANVAYA // ARCHITECTURE RUNTIME</span>
            <span className="text-[#64748B] hidden sm:inline">[SYS_V16_INIT]</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#64748B]">12.9716° N, 77.5946° E</span>
            <span className="text-[#F59E0B] font-semibold">ONLINE</span>
          </div>
        </div>

        {/* CENTER: Flat 2D Precision Geometric Reticle */}
        <div className="preloader-hud-content self-center flex flex-col items-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28">
            {/* Outer static dashed circle */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <circle
                cx="50"
                cy="50"
                r="39"
                fill="none"
                stroke="rgba(245, 158, 11, 0.25)"
                strokeWidth="1"
              />
            </svg>

            {/* Rotating inner geometric diamond & square vector */}
            <svg
              className="reticle-geom reticle-rotating absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
            >
              {/* Outer Diamond */}
              <polygon
                points="50,14 86,50 50,86 14,50"
                fill="none"
                stroke="#F8FAFC"
                strokeWidth="1.2"
                style={{ strokeDasharray: 350 }}
              />
              {/* Inner Square */}
              <rect
                x="30"
                y="30"
                width="40"
                height="40"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1.2"
                style={{ strokeDasharray: 300 }}
              />
              {/* Center Reticle Point */}
              <circle cx="50" cy="50" r="2.5" fill="#F8FAFC" />
              <line x1="50" y1="44" x2="50" y2="56" stroke="#F59E0B" strokeWidth="1" />
              <line x1="44" y1="50" x2="56" y2="50" stroke="#F59E0B" strokeWidth="1" />
            </svg>
          </div>

          <span className="mt-5 font-mono text-[11px] tracking-[0.3em] text-[#94A3B8] uppercase">
            DETERMINISTIC SYSTEMS CORE
          </span>
        </div>

        {/* BOTTOM HUD: Brand Tagline + Giant Monospace Counter */}
        <div className="preloader-hud-content flex justify-between items-end">
          <div className="font-mono text-xs sm:text-sm tracking-wider text-[#94A3B8]">
            <span className="text-[#F59E0B] font-bold">01</span> // SYSTEMS OVER SLOP
            <div className="text-[10px] sm:text-xs text-[#64748B] mt-1">
              14-DAY PRODUCTION SPRINT PROTOCOL
            </div>
          </div>

          {/* Giant Minimal Counter */}
          <div className="font-mono font-bold text-5xl sm:text-7xl md:text-8xl text-[#F8FAFC] tracking-tighter leading-none flex items-baseline">
            <span>{count.toString().padStart(2, "0")}</span>
            <span className="text-xl sm:text-3xl text-[#F59E0B] font-light ml-1">%</span>
          </div>
        </div>

        {/* 1.5px Hairline Tracker Line */}
        <div
          id="preloader-progress-bar"
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#F59E0B] origin-left shadow-[0_0_8px_rgba(245,158,11,0.5)]"
        />
      </div>
    </div>
  );
};
