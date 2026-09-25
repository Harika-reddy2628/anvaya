"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export interface AwwwardsPreloaderProps {
  readonly onComplete?: () => void;
}

export function AwwwardsPreloader({ onComplete }: AwwwardsPreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Counter (00 to 100%) in 1.1s
      const counterObj = { val: 0 };
      tl.to(counterObj, {
        val: 100,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          setCount(Math.floor(counterObj.val));
        },
      });

      // 2. 2D Vector Stroke Drawing
      tl.fromTo(
        ".yantra-2d polygon",
        { strokeDashoffset: 400, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" },
        0
      );

      // 3. Hairline bottom progress bar
      tl.fromTo(
        "#preloader-bar",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
        0
      );

      // 4. The Awwwards Curtain Shutter Reveal
      tl.to(
        [".preloader-content", "#preloader-bar"],
        { opacity: 0, duration: 0.2, ease: "power2.out" },
        "+=0.05"
      );

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
    >
      {/* Background Curtain that slides up */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#07080D] flex flex-col justify-between p-6 sm:p-10"
      >
        {/* TOP HUD: Corner Coordinates */}
        <div className="preloader-content flex justify-between items-center text-[11px] font-mono tracking-widest text-[#94A3B8] uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            <span>ANVAYA // ARCHITECTURE RUNTIME</span>
          </div>
          <span className="text-[#64748B]">12.9716° N, 77.5946° E</span>
        </div>

        {/* CENTER: Flat 2D Minimal Yantra Vector */}
        <div className="preloader-content self-center flex flex-col items-center">
          <svg
            className="yantra-2d w-20 h-20 sm:w-24 sm:h-24 stroke-[#F8FAFC] fill-none stroke-[1]"
            viewBox="0 0 100 100"
          >
            {/* Minimalist 2D interlocking triangle geometry */}
            <polygon
              points="50,15 85,75 15,75"
              className="stroke-[#F8FAFC]"
              style={{ strokeDasharray: 400 }}
            />
            <polygon
              points="50,85 15,25 85,25"
              className="stroke-[#F59E0B]"
              style={{ strokeDasharray: 400 }}
            />
            <circle cx="50" cy="50" r="3" className="fill-[#F8FAFC] stroke-none" />
          </svg>
          <span className="mt-4 font-mono text-[10px] tracking-[0.25em] text-[#64748B] uppercase">
            CAUSAL CONTINUITY
          </span>
        </div>

        {/* BOTTOM HUD: Brand Tagline + Giant Monospace Counter */}
        <div className="preloader-content flex justify-between items-end">
          <div className="font-mono text-xs tracking-wider text-[#94A3B8]">
            <span className="text-[#F59E0B]">01</span> // SYSTEMS OVER SLOP
          </div>

          {/* Giant Minimal Counter */}
          <div className="font-mono font-bold text-4xl sm:text-6xl md:text-7xl text-[#F8FAFC] tracking-tighter">
            {count.toString().padStart(2, "0")}
            <span className="text-xl sm:text-2xl text-[#F59E0B] font-light ml-1">%</span>
          </div>
        </div>

        {/* 1px Hairline Tracker Line */}
        <div
          id="preloader-bar"
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#F59E0B] origin-left"
        />
      </div>
    </div>
  );
}
