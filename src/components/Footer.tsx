"use client";

import React from "react";
import Link from "next/link";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-white border-t border-slate-200/80 pt-16 pb-12 px-4 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Top Header Row */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pb-12 border-b border-slate-100">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-extrabold tracking-tight text-[#0A0D17]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#004CE8]" />
            <span>anvaya</span>
          </Link>

          <div className="flex items-center gap-6 text-xs font-mono text-slate-500">
            <span>Direct Inquiries:</span>
            <a
              href="mailto:build@anvaya.dev"
              className="font-bold text-[#0A0D17] hover:text-[#004CE8] transition-colors"
            >
              build@anvaya.dev
            </a>
          </div>
        </div>

        {/* Aceternity Text Hover Effect Display */}
        <div className="w-full h-44 sm:h-64 md:h-80 flex items-center justify-center my-6">
          <TextHoverEffect text="ANVAYA" />
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="w-full pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
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
