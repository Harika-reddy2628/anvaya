"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ShieldCheck, Cpu, Terminal, Clock } from "lucide-react";
import { CockpitDrawer } from "./CockpitDrawer";

gsap.registerPlugin(useGSAP);

export const HeroStage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-status-tag", { opacity: 0, y: -20, duration: 0.8 }, 0.2);
      tl.from(".hero-headline-1", { opacity: 0, y: 30, duration: 0.9 }, 0.4);
      tl.from(".hero-headline-2", { opacity: 0, y: 30, duration: 0.9 }, 0.55);
      tl.from(".hero-subheadline", { opacity: 0, y: 20, duration: 0.7 }, 0.7);
      tl.from(".hero-cta-group", { opacity: 0, y: 20, duration: 0.7 }, 0.85);
      tl.from(".hero-telemetry-item", { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, 1.0);
      tl.from(".hero-cockpit", { opacity: 0, y: 40, duration: 0.8 }, 1.2);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between items-center bg-yantra-grid overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-[#F59E0B]/5 blur-[120px] pointer-events-none" />

      {/* Main Hero Content */}
      <div className="max-w-5xl mx-auto text-center z-10 my-auto flex flex-col items-center">
        {/* Status Tag */}
        <div className="hero-status-tag inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0E111B]/80 backdrop-blur-md font-mono text-xs text-[#94A3B8] mb-8">
          <span className="size-2 rounded-full bg-[#F59E0B] animate-ping" />
          <span className="text-[#F59E0B] font-semibold">[SYS_V16_STABLE]</span>
          <span className="text-white/40">✦</span>
          <span>DETERMINISTIC AI & FULL-STACK SYSTEMS</span>
        </div>

        {/* Headline */}
        <h1 className="font-clash font-extrabold tracking-tight text-white mb-6">
          <span className="hero-headline-1 block text-5xl sm:text-7xl lg:text-8xl leading-[1.05]">
            IDEAS TO IMPACT.
          </span>
          <span className="hero-headline-2 block text-4xl sm:text-6xl lg:text-7xl leading-[1.1] mt-2 bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F8FAFC] bg-clip-text text-transparent">
            PRODUCTION SYSTEMS IN 14 DAYS.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="hero-subheadline font-satoshi text-base sm:text-lg lg:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed">
          Deterministic AI architectures, pgvector neural backends, and bespoke interfaces.
          <span className="text-white font-medium"> No superficial fluff. Zero agency bloat.</span>
        </p>

        {/* CTA Button Group */}
        <div className="hero-cta-group flex flex-col sm:flex-row items-center gap-4 mb-16">
          <a
            href="#intake"
            className="group inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#07080D] font-bold text-sm px-6 py-3.5 rounded-full transition-all duration-200 glow-surya"
          >
            <span>Commission 14-Day Sprint</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#proof"
            className="inline-flex items-center gap-2 bg-[#0E111B]/80 hover:bg-[#151926] text-[#F8FAFC] border border-white/10 hover:border-[#A855F7]/40 font-medium text-sm px-6 py-3.5 rounded-full transition-all duration-200 glow-amethyst"
          >
            <Terminal className="size-4 text-[#A855F7]" />
            <span>Inspect Proof of Work</span>
          </a>
        </div>

        {/* Telemetry HUD Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl py-6 border-y border-white/10 bg-[#0E111B]/40 backdrop-blur-sm rounded-2xl px-6">
          <div className="hero-telemetry-item flex flex-col items-center">
            <div className="flex items-center gap-1.5 font-mono text-2xl sm:text-3xl font-bold text-[#F59E0B]">
              <Clock className="size-5 text-[#F59E0B]/70" />
              <span>14 Days</span>
            </div>
            <span className="font-mono text-xs text-[#64748B] uppercase tracking-wider mt-1">
              Target Delivery
            </span>
          </div>

          <div className="hero-telemetry-item flex flex-col items-center">
            <div className="flex items-center gap-1.5 font-mono text-2xl sm:text-3xl font-bold text-white">
              <ShieldCheck className="size-5 text-[#10B981]" />
              <span>100% Day-1</span>
            </div>
            <span className="font-mono text-xs text-[#64748B] uppercase tracking-wider mt-1">
              IP Sovereignty
            </span>
          </div>

          <div className="hero-telemetry-item flex flex-col items-center">
            <div className="flex items-center gap-1.5 font-mono text-2xl sm:text-3xl font-bold text-[#A855F7]">
              <Cpu className="size-5 text-[#A855F7]/70" />
              <span>&lt; 15ms</span>
            </div>
            <span className="font-mono text-xs text-[#64748B] uppercase tracking-wider mt-1">
              pgvector Retrieval
            </span>
          </div>

          <div className="hero-telemetry-item flex flex-col items-center">
            <div className="flex items-center gap-1.5 font-mono text-2xl sm:text-3xl font-bold text-white">
              <Terminal className="size-5 text-[#004CE8]" />
              <span>Zero</span>
            </div>
            <span className="font-mono text-xs text-[#64748B] uppercase tracking-wider mt-1">
              Middle Management
            </span>
          </div>
        </div>
      </div>

      {/* Pinned Cockpit Drawer at bottom fold */}
      <div className="hero-cockpit w-full z-20 mt-12">
        <CockpitDrawer />
      </div>
    </section>
  );
};
