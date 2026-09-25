"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[min(760px,94vw)] rounded-full border border-white/10 bg-[#0E111B]/85 backdrop-blur-xl px-4 py-2.5 shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Left: Brand Emblem + Name */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center size-7 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 group-hover:border-[#F59E0B] transition-colors">
            {/* Geometric Brass Emblem */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span className="font-clash text-base font-bold tracking-tight text-white group-hover:text-[#F59E0B] transition-colors">
            anvaya
          </span>
        </a>

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide text-[#94A3B8]">
          <a href="#build" className="hover:text-white transition-colors">
            What We Build
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            Architecture
          </a>
          <a href="#proof" className="hover:text-white transition-colors">
            Proof of Work
          </a>
        </div>

        {/* Right: Status Dot + CTA Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[#64748B] bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
            <span className="size-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>Q4 INTAKE</span>
          </div>

          <a
            href="#intake"
            className="group inline-flex items-center gap-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#07080D] text-xs font-bold px-3.5 py-1.5 rounded-full transition-all duration-200 glow-surya"
          >
            <span>Deploy Sprint</span>
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </nav>
  );
};
