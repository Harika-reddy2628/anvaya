"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#06080F] text-white border-t border-white/10 pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Subtle Ambient Radial Backlight Glow along top rim */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-40 bg-[radial-gradient(ellipse_at_top,rgba(0,76,232,0.18)_0%,transparent_70%)] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto flex flex-col relative z-10">
        {/* 4-Column Studio Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10 text-left">
          {/* Column 1: Brand & Ethos (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-black tracking-tight text-white hover:opacity-90 transition-opacity"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#004CE8]" />
              <span className="font-syne uppercase">anvaya</span>
            </Link>

            <p className="text-sm text-slate-400 mt-3 max-w-sm leading-relaxed font-normal">
              Production software architected and shipped in 14 days. Direct senior builder access, zero agency fluff.
            </p>

            {/* Operational Beacon */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mt-5 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Q4 Sprint Intake Active</span>
            </div>

            <div className="text-[11px] font-mono text-slate-500 mt-4">
              Bangalore, India • Distributed Global Systems
            </div>
          </div>

          {/* Column 2: Sprint Scopes (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Sprint Scopes
            </div>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400 font-medium">
              <li>
                <a href="#sprints" className="hover:text-white transition-colors">
                  The 14-Day MVP Launchpad
                </a>
              </li>
              <li>
                <a href="#sprints" className="hover:text-white transition-colors">
                  AI & Agentic Workflow Engine
                </a>
              </li>
              <li>
                <a href="#sprints" className="hover:text-white transition-colors">
                  Interface Modernization Sprint
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Interactive Scope Estimator
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Standards (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Guarantees
            </div>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400 font-medium">
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors">
                  100% Day-1 IP Transfer
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors">
                  Schema-First Contracts
                </a>
              </li>
              <li>
                <a href="#proof" className="hover:text-white transition-colors">
                  Zero Vendor Lock-in
                </a>
              </li>
              <li>
                <a href="#proof" className="hover:text-white transition-colors">
                  Cloudflare Zero Trust
                </a>
              </li>
              <li>
                <a href="#sprints" className="hover:text-white transition-colors">
                  30-Day Stability SLA
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Builder Contact (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Direct Senior Line
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              No account managers or middle layers. Connect directly with lead architects.
            </p>

            <a
              href="mailto:build@anvaya.dev"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group mt-3"
            >
              <span className="font-mono text-xs text-slate-200">build@anvaya.dev</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </a>

            <a
              href="#intake"
              className="block w-full mt-3 py-2.5 px-4 text-center rounded-xl bg-[#004CE8] hover:bg-[#0038B0] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              Reserve 14-Day Sprint →
            </a>
          </div>
        </div>

        {/* Monolithic ANVAYA Interactive Text Hover Effect */}
        <div className="w-full h-32 sm:h-44 md:h-56 flex items-center justify-center my-4 overflow-hidden">
          <TextHoverEffect text="ANVAYA" />
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 Anvaya Studio. Ideas to Impact. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </a>
            <span>•</span>
            <a href="#architecture" className="hover:text-slate-300 transition-colors">
              Architecture
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
