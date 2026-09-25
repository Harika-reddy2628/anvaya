"use client";

import React from "react";

const CAPABILITIES = [
  "14-Day Production Sprints",
  "Deterministic AI Architecture",
  "checkDK Rust AST Compiler",
  "100% Day-1 IP Ownership",
  "Zero Middle Management",
  "Direct Senior Builder Intake",
  "Cloudflare Zero Trust Ingress",
  "FastAPI + PostgreSQL pgvector",
  "Battle-Tested CI/CD Pipelines",
];

export const CapabilitiesRibbon: React.FC = () => {
  return (
    <section className="relative w-full py-5 bg-white border-y border-slate-200/80 overflow-hidden select-none z-10">
      {/* Edge gradient masks for soft, seamless entry and exit */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

      {/* Multi-track GPU-accelerated infinite marquee */}
      <div className="flex overflow-hidden w-full [--gap:2rem] [gap:var(--gap)] [--duration:38s]">
        {[0, 1, 2, 3].map((trackIdx) => (
          <div
            key={trackIdx}
            className="flex shrink-0 items-center justify-around [gap:var(--gap)] animate-marquee min-w-full"
            aria-hidden={trackIdx > 0 ? "true" : undefined}
          >
            {CAPABILITIES.map((item, idx) => (
              <div
                key={`cap-${trackIdx}-${idx}`}
                className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider text-slate-700 uppercase"
              >
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#004CE8] shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
