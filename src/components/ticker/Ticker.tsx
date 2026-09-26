'use client';

import React from 'react';

export interface TickerProps {
  readonly items?: readonly string[];
}

const DEFAULT_TICKER_ITEMS: readonly string[] = [
  '14-Day Production Sprints',
  '100% Day-1 IP Ownership',
  'Next.js 16 & Tailwind v4',
  'Autonomous Multi-Agent Council',
  'pgvector Real-Time AI Search',
  'Sub-12ms p99 Latency',
  'Headless Blender 3D Pipelines',
  'Systems Over Slop',
];

export const Ticker: React.FC<TickerProps> = ({ items = DEFAULT_TICKER_ITEMS }) => {
  return (
    <section id="ticker" className="py-5 border-y border-white/10 bg-[#070A12]/90 backdrop-blur-xl overflow-hidden relative select-none">
      <div className="marquee-track flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-neutral-300 whitespace-nowrap">
        {/* Track 1 */}
        <div className="flex items-center gap-8">
          {items.map((item, idx) => (
            <span key={`t1-${idx}`} className="flex items-center gap-3">
              <svg width="14" height="12" viewBox="0 0 50 40" fill="none" className="text-[#FF2A55] inline-block">
                <ellipse cx="12" cy="20" rx="9" ry="6" fill="currentColor" />
                <ellipse cx="25" cy="20" rx="6" ry="4.5" fill="currentColor" />
                <circle cx="37" cy="18" r="4.5" fill="currentColor" />
              </svg>
              <span>{item}</span>
            </span>
          ))}
        </div>
        {/* Track 2 */}
        <div className="flex items-center gap-8">
          {items.map((item, idx) => (
            <span key={`t2-${idx}`} className="flex items-center gap-3">
              <svg width="14" height="12" viewBox="0 0 50 40" fill="none" className="text-[#FF2A55] inline-block">
                <ellipse cx="12" cy="20" rx="9" ry="6" fill="currentColor" />
                <ellipse cx="25" cy="20" rx="6" ry="4.5" fill="currentColor" />
                <circle cx="37" cy="18" r="4.5" fill="currentColor" />
              </svg>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
