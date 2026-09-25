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
 * Anvaya Minimal Light Preloader (Swiss / Editorial Standard)
 * - Pristine light paper aesthetic (#F8F9FA / #FFFFFF)
 * - Understated, restrained typography & minimal counter
 * - 1px hairline progress line
 * - Clean architectural shutter curtain wipe
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

      // 1. Subtle, smooth counter (00 to 100%) in 1.1s
      const counterState = { val: 0 };
      tl.to(counterState, {
        val: 100,
        duration: 1.15,
        ease: "power2.inOut",
        onUpdate: () => {
          setCount(Math.floor(counterState.val));
        },
      });

      // 2. 1px hairline tracker line
      tl.fromTo(
        "#preloader-progress-bar",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.15, ease: "power2.inOut" },
        0
      );

      // 3. Gentle fade out of preloader metadata before curtain wipe
      tl.to(
        [".preloader-content", "#preloader-progress-bar"],
        { opacity: 0, duration: 0.2, ease: "power2.out" },
        "+=0.05"
      );

      // 4. Clean architectural curtain slide-up
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
      {/* Pristine Light Curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#F8F9FA] text-[#0A0A0A] flex flex-col justify-between p-8 sm:p-12 md:p-16 border-b border-black/10"
      >
        {/* TOP: Brand Wordmark & Studio Tag */}
        <div className="preloader-content flex justify-between items-center text-xs tracking-wider text-[#71717A]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#0A0A0A]" />
            <span className="font-semibold text-[#0A0A0A] tracking-tight">anvaya</span>
            <span className="text-[#A1A1AA]">/ studio</span>
          </div>

          <div className="font-mono text-[11px] tracking-widest text-[#71717A] uppercase hidden sm:block">
            Bangalore · 12.9716° N, 77.5946° E
          </div>
        </div>

        {/* CENTER: Understated Minimal Core */}
        <div className="preloader-content self-center flex flex-col items-center text-center max-w-sm">
          {/* Minimal 1px square glyph */}
          <div className="w-8 h-8 border border-[#18181B] flex items-center justify-center mb-6">
            <div className="w-2 h-2 bg-[#18181B]" />
          </div>

          <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#0A0A0A]">
            Systems over slop.
          </h2>

          <p className="mt-2 font-mono text-[11px] tracking-widest text-[#71717A] uppercase">
            Initializing Environment
          </p>
        </div>

        {/* BOTTOM: Monospace Counter & Progress */}
        <div className="preloader-content flex justify-between items-end">
          <div className="font-mono text-xs text-[#71717A] tracking-wider">
            <span>[01 / 01]</span>
            <div className="text-[11px] text-[#A1A1AA] mt-0.5">READY IN 14 DAYS</div>
          </div>

          {/* Minimal Clean Counter */}
          <div className="font-mono font-medium text-5xl sm:text-7xl text-[#0A0A0A] tracking-tighter leading-none">
            {count.toString().padStart(2, "0")}
            <span className="text-xl sm:text-2xl text-[#71717A] font-light ml-1">%</span>
          </div>
        </div>

        {/* 1px Hairline Tracker Line */}
        <div
          id="preloader-progress-bar"
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#0A0A0A] origin-left"
        />
      </div>
    </div>
  );
};
