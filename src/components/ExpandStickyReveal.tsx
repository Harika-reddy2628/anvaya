"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight, Layers, Sparkles, ShieldCheck } from "lucide-react";

// Dynamically import Prism background locked in as sovereign visual base
const Prism = dynamic(() => import("@/components/Prism"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#F8F9FC]" />,
});

// The 3 showcase milestones (minimal text, visual asset focused)
const SHOWCASE_ITEMS = [
  {
    step: "01",
    tag: "SPRINT MVP",
    title: "14-Day Production Launch",
    oneLiner: "Complete full-stack architecture shipped with 100% Day-1 IP transfer.",
    chromeFile: "01_mvp_launchpad.tsx",
    assetKey: "showcase_mvp",
    assetSrc: "/assets/showcase_mvp.png",
    icon: Layers,
  },
  {
    step: "02",
    tag: "AI SYSTEMS",
    title: "pgvector Intelligence Core",
    oneLiner: "Deterministic hybrid search and sub-2ms query performance.",
    chromeFile: "02_pgvector_intelligence.py",
    assetKey: "showcase_ai",
    assetSrc: "/assets/showcase_ai.png",
    icon: Sparkles,
  },
  {
    step: "03",
    tag: "EDGE SECURITY",
    title: "Zero Trust Cloudflare Edge",
    oneLiner: "Hardened infrastructure deployed directly by senior builders.",
    chromeFile: "03_zero_trust_ingress.tf",
    assetKey: "showcase_edge",
    assetSrc: "/assets/showcase_edge.png",
    icon: ShieldCheck,
  },
];

export const ExpandStickyReveal: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const portalCardRef = useRef<HTMLDivElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);

  // Active milestone index for Sticky Scroll Reveal (0, 1, 2)
  const [activeMilestone, setActiveMilestone] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "anvayaMasterPin",
          trigger: stageRef.current,
          start: "top top",
          end: "+=380%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      const vh = typeof window !== "undefined" ? window.innerHeight : 900;
      const pinDistance = vh * 3.8;
      // Mathematical lockstep: the exact normalized scroll duration for the next section to rise from screen bottom to 52px
      const shrinkDuration = Math.min(0.28, Math.max(0.20, (vh - 52) / pinDistance));
      const shrinkStart = 1.0 - shrinkDuration;
      const m1End = 0.16 + (shrinkStart - 0.16) * 0.33;
      const m2End = 0.16 + (shrinkStart - 0.16) * 0.66;

      // PHASE 1: STRICTLY RECTILINEAR EXPANSION FROM BOTTOM DOCK (0.00 -> 0.16)
      // Fade out centered hero text smoothly
      tl.to(
        heroContentRef.current,
        {
          opacity: 0,
          y: -44,
          duration: 0.15,
          ease: "power1.inOut",
        },
        0
      );

      // Expand card strictly along the vertical center axis:
      // portalCardRef maintains `left: 50%` and `transform: translateX(-50%)` at all times.
      // Starts docked at bottom (52px strip) and expands to 100vw x 100vh.
      tl.to(
        portalCardRef.current,
        {
          top: "0px",
          width: () => `${window.innerWidth}px`,
          height: "100vh",
          borderRadius: "0px",
          borderWidth: "0px",
          boxShadow: "none",
          duration: 0.16,
          ease: "power1.inOut",
        },
        0
      );

      tl.to(
        contentAreaRef.current,
        {
          opacity: 1,
          duration: 0.12,
          ease: "power1.inOut",
        },
        0.04
      );

      // PHASE 2: ACETERNITY STICKY SCROLL REVEAL (0.16 -> shrinkStart)
      // Step 1: Milestone 1 active
      tl.call(() => {
        setActiveMilestone(0);
      }, [], 0.16);

      // Step 2: Milestone 2 active
      tl.call(() => {
        setActiveMilestone(1);
      }, [], m1End);

      // Step 3: Milestone 3 active (Cloudflare Zero Trust Edge)
      tl.call(() => {
        setActiveMilestone(2);
      }, [], m2End);

      // Content cleanly fades out right before the shrink begins
      tl.to(
        contentAreaRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.05,
          ease: "power1.inOut",
        },
        Math.max(0.70, shrinkStart - 0.04)
      );

      // PHASE 3: SYMMETRICAL CLOSING SEQUENCE INTO 50PX TOP STRIP (shrinkStart -> 1.00)
      // Linear ease guarantees the rising marquee ribbon and shrinking card bottom edge move in 100% lockstep!
      tl.to(
        portalCardRef.current,
        {
          top: "0px",
          width: () => `${Math.min(1120, window.innerWidth * 0.94)}px`,
          height: "52px",
          borderRadius: "0px 0px 20px 20px",
          borderWidth: "0px 1px 1px 1px",
          borderColor: "rgba(100, 116, 139, 0.4)",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.5)",
          duration: shrinkDuration,
          ease: "none",
        },
        shrinkStart
      );
    }, stageRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const handleInspectArchitecture = () => {
    const trigger = ScrollTrigger.getById("anvayaMasterPin");
    if (trigger) {
      window.scrollTo({
        top: trigger.start + (trigger.end - trigger.start) * 0.25,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={stageRef}
      id="architecture"
      className="relative w-full h-screen bg-[#F8F9FC] overflow-hidden"
    >
      {/* Dynamic Background Stage: Locked to Prism */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="w-full h-full opacity-90">
          <Prism
            lightMode={true}
            transparent={true}
            height={3.2}
            baseWidth={5.2}
            glow={1.2}
            bloom={1.0}
            noise={0.2}
            timeScale={0.35}
            scale={3.2}
          />
        </div>
        {/* Soft Vignette Overlay for Typographic Sharpness */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(248,249,252,0.10)_0%,rgba(248,249,252,0.85)_75%)] pointer-events-none" />
      </div>

      {/* Main Viewport Container */}
      <div className="relative z-10 w-full h-full overflow-hidden flex flex-col items-center justify-center text-center px-4">
        {/* Centered Hero Content: ANVAYA + Punchy Subtitle + Refined CTAs */}
        <div
          ref={heroContentRef}
          className="max-w-5xl w-full flex flex-col items-center justify-center will-change-transform z-10 absolute top-[46%] -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 text-center"
        >
          {/* Monolithic Sculpted Hero Wordmark with Syne Font */}
          <div className="relative inline-flex flex-col items-center justify-center my-1 group">
            {/* Ambient Radiant Backlight Halo */}
            <div
              aria-hidden="true"
              className="absolute -inset-x-24 -inset-y-12 bg-[radial-gradient(ellipse_at_center,rgba(0,76,232,0.18)_0%,rgba(59,130,246,0.10)_45%,transparent_75%)] blur-3xl pointer-events-none -z-10 scale-110"
            />

            <h1 className="relative font-syne text-7xl sm:text-8xl md:text-9xl lg:text-[124px] xl:text-[138px] font-extrabold tracking-[-0.035em] leading-none uppercase select-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] drop-shadow-[0_20px_40px_rgba(10,13,23,0.10)]">
              <span className="bg-[linear-gradient(180deg,#06080F_0%,#182334_42%,#5E718E_100%)] bg-clip-text text-transparent">
                ANVAYA
              </span>
            </h1>
          </div>

          {/* Value proposition primed for trust and partnership */}
          <p className="max-w-2xl mx-auto leading-relaxed tracking-tight mt-5">
            <span className="font-bold text-[#0A0D17] text-xl sm:text-2xl md:text-3xl block mb-2">
              We got you digitally covered.
            </span>
            <span className="text-slate-500 font-medium text-base sm:text-lg block">
              You focus on the vision. We handle the engineering.
            </span>
          </p>

          {/* Refined CTAs Grouped at Center with Bottom-Shaded Gradient Button */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#intake"
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold tracking-wide text-white cursor-pointer select-none
                transform-gpu [backface-visibility:hidden]
                transition-[transform,box-shadow,background-color,border-color] duration-150 ease-out
                hover:-translate-y-0.5 active:translate-y-0
                bg-[linear-gradient(180deg,#090D16_0%,#162032_45%,#455675_100%)]
                border border-white/15 border-b-white/50
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_3px_rgba(255,255,255,0.32),0_8px_24px_rgba(10,13,23,0.2)]
                hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),inset_0_-1px_3px_rgba(255,255,255,0.48),0_12px_32px_rgba(10,13,23,0.28)]"
            >
              <span className="text-white/95 font-semibold">Schedule 14-Day Sprint</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </a>

            <button
              type="button"
              onClick={handleInspectArchitecture}
              className="px-7 py-3.5 rounded-full bg-white/95 hover:bg-white border border-slate-200/90 text-slate-700 hover:text-[#0A0D17] text-sm sm:text-base font-semibold shadow-xs hover:shadow flex items-center gap-2 cursor-pointer
                transform-gpu [backface-visibility:hidden]
                transition-[transform,box-shadow,background-color,border-color] duration-150 ease-out
                hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Inspect Architecture</span>
              <ArrowDown className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Docked Expandable Architecture Cockpit Card:
            - Starts docked at bottom with ~52px chrome visible (rounded-t-[20px]).
            - Expands strictly rectilinear to 100vw x 100vh.
            - Ends docked at top with ~52px chrome visible (rounded-b-[20px]). */}
        <div
          ref={portalCardRef}
          onClick={handleInspectArchitecture}
          className="absolute top-[calc(100vh-52px)] left-1/2 -translate-x-1/2 w-[min(1120px,94vw)] h-[calc(100vh-36px)] rounded-t-[20px] bg-[#090D16] border-t border-x border-slate-700/60 shadow-[0_-12px_40px_rgba(10,13,23,0.14),0_0_0_1px_rgba(139,92,246,0.25)] overflow-hidden z-30 flex flex-col will-change-transform cursor-pointer"
        >
          {/* Cockpit Window Chrome (Minimal Ceramic Traffic Lights) */}
          <div className="h-[52px] bg-[#0E121B]/95 backdrop-blur-xl border-b border-white/10 px-6 flex items-center justify-between z-30 shrink-0 select-none">
            {/* Left: Window Traffic Lights with subtle rim depth */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
            </div>
          </div>

          {/* Internal View Stage (Clean, Minimal Sticky Scroll Reveal with Exact-Fit 16:9 Visual Frame) */}
          <div
            ref={contentAreaRef}
            className="relative flex-1 w-full h-[calc(100%-52px)] overflow-hidden bg-[#06080E] flex items-center will-change-opacity"
          >
            <div className="w-full max-w-[1680px] mx-auto h-full px-6 sm:px-10 lg:px-14 py-4 sm:py-6 flex flex-col justify-center">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
                {/* Left Column: 3 Minimalist Step Indicators (Zero Glow, Clean Editorial Left-Border Accent) */}
                <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 xl:gap-6 text-left justify-center select-none">
                  {SHOWCASE_ITEMS.map((item, idx) => {
                    const isActive = activeMilestone === idx;
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.step}
                        className={`transition-all duration-300 p-6 sm:p-7 xl:p-8 rounded-2xl border ${
                          isActive
                            ? "bg-white/[0.07] border-white/20 border-l-4 border-l-white translate-x-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                            : "bg-transparent border-transparent opacity-30 hover:opacity-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                          <span>{item.step} / {item.tag}</span>
                        </div>
                        <h3 className={`text-2xl sm:text-3xl lg:text-[28px] xl:text-[32px] font-bold tracking-tight leading-tight ${isActive ? "text-white" : "text-slate-400"}`}>
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal leading-relaxed">
                          {item.oneLiner}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column: Visual Asset Showcase Frame (Exact 16:9 Image Fit, Zero Letterbox Black Bars) */}
                <div className="lg:col-span-7 w-full flex items-center justify-center">
                  <div className="relative w-full aspect-[16/9] max-h-[620px] xl:max-h-[700px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.1)] bg-[#0A0D15]">
                    {SHOWCASE_ITEMS.map((item, idx) => {
                      const isActive = activeMilestone === idx;
                      return (
                        <div
                          key={item.assetKey}
                          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                            isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                          }`}
                        >
                          <Image
                            src={item.assetSrc}
                            alt={item.title}
                            fill
                            priority
                            className="object-cover object-center"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
