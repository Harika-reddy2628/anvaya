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
    <section className="py-6 border-y border-white/10 bg-[#0A0D15]/80 overflow-hidden relative select-none">
      <div className="marquee-track flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-neutral-300 whitespace-nowrap">
        {/* Track 1 */}
        <div className="flex items-center gap-8">
          {items.map((item, idx) => (
            <span key={`t1-${idx}`} className="flex items-center gap-2">
              <span className="text-[#FF2A55]">✦</span> {item}
            </span>
          ))}
        </div>
        {/* Track 2 (Duplicate for infinite seamless loop) */}
        <div className="flex items-center gap-8">
          {items.map((item, idx) => (
            <span key={`t2-${idx}`} className="flex items-center gap-2">
              <span className="text-[#FF2A55]">✦</span> {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
