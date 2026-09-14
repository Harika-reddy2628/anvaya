"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-white border-t border-slate-200/80 pt-12 pb-8 px-4 sm:px-6 lg:px-8 select-none">
      {/* Subtle Architectural Dot Grid Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto flex flex-col relative z-10">
        {/* Main Content Grid: 3 Crisp Functional Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200/70">
          {/* Col 1: Brand & Status (5 cols) */}
          <div className="md:col-span-5 flex flex-col">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-black tracking-tight text-[#0A0D17] hover:opacity-90 transition-opacity"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#004CE8]" />
              <span className="font-syne uppercase">anvaya</span>
            </Link>

            <p className="text-xs text-slate-500 mt-2.5 max-w-sm leading-relaxed font-normal">
              High-velocity production software architected and shipped in 14 days. Direct senior builder access, zero agency fluff.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[11px] font-mono font-medium mt-4 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Q4 Sprint Intake Active</span>
            </div>
          </div>

          {/* Col 2: Navigation & Guarantees (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <div className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Navigation
              </div>
              <a href="#sprints" className="text-xs text-slate-600 hover:text-[#004CE8] transition-colors">
                14-Day Sprints
              </a>
              <a href="#philosophy" className="text-xs text-slate-600 hover:text-[#004CE8] transition-colors">
                Architecture
              </a>
              <a href="#proof" className="text-xs text-slate-600 hover:text-[#004CE8] transition-colors">
                Proof of Work
              </a>
              <a href="#calculator" className="text-xs text-slate-600 hover:text-[#004CE8] transition-colors">
                Scope Estimator
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Guarantees
              </div>
              <span className="text-xs text-slate-500">Day-1 IP Transfer</span>
              <span className="text-xs text-slate-500">Zero Lock-in</span>
              <span className="text-xs text-slate-500">30-Day SLA</span>
              <span className="text-xs text-slate-500">Schema-First</span>
            </div>
          </div>

          {/* Col 3: Direct Senior Line (3 cols) */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Direct Senior Line
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                No account managers or middle layers. Connect directly with lead architects.
              </p>
              <a
                href="mailto:build@anvaya.dev"
                className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors group"
              >
                <span className="font-mono text-xs text-slate-700 font-medium">build@anvaya.dev</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#004CE8] transition-colors" />
              </a>
            </div>

            <div className="text-[11px] font-mono text-slate-400 mt-4 md:mt-0">
              Bangalore, India • Distributed Systems
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © 2026 Anvaya Studio. Ideas to Impact. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-600 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-600 transition-colors">
              Terms & Conditions
            </a>
            <span>•</span>
            <a href="#architecture" className="hover:text-slate-600 transition-colors">
              Architecture
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
