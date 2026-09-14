"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const Prism = dynamic(() => import("@/components/Prism"), {
  ssr: false,
});

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-white border-t border-slate-200/80 pt-16 pb-12 px-4 overflow-hidden select-none">
      {/* Dynamic Background Shader: Optical Glass Prism with Light Mode */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-80">
        <Prism
          lightMode={true}
          transparent={true}
          height={3.0}
          baseWidth={5.0}
          glow={1.2}
          bloom={1.0}
          noise={0.15}
          timeScale={0.3}
          scale={2.8}
        />
        {/* Soft Radial Vignette feathering out to white edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(255,255,255,0.6)_65%,white_95%)] pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col relative z-10">
        {/* Top Header Row */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pb-12 border-b border-slate-200/60">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-extrabold tracking-tight text-[#0A0D17]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#004CE8]" />
            <span>anvaya</span>
          </Link>

          <div className="flex items-center gap-2.5 text-xs font-mono text-slate-500">
            <span>Direct Inquiries:</span>
            <a
              href="mailto:build@anvaya.dev"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/90 text-[#0A0D17] hover:text-[#004CE8] transition-colors font-medium"
            >
              <span>build@anvaya.dev</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Monolithic Interactive ANVAYA Text Hover Effect */}
        <div className="w-full h-44 sm:h-64 md:h-80 flex items-center justify-center my-6">
          <TextHoverEffect text="ANVAYA" />
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="w-full pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
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
