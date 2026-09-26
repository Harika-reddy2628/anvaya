'use client';

import React, { useRef } from 'react';
import { BENTO_TILES } from '@/data/mockData';

export interface BentoGridProps {
  readonly onExploreClick?: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="philosophy" ref={containerRef} className="pt-32 pb-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-[#FF2A55]">
          <span>THE COLONY ARCHITECTURE</span>
        </div>
        <h2 className="font-clash text-4xl sm:text-5xl font-bold tracking-tight text-white">
          SYSTEMS OVER SLOP.
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          While traditional agencies drown in bureaucracy and junior developers, our autonomous engineering colony delivers verified production systems with mathematical rigor.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* TILE 1: Velocity Engine (Span 7) */}
        <div
          onMouseMove={handleMouseMove}
          className="bento-card md:col-span-7 p-8 flex flex-col justify-between min-h-[320px]"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs text-[#FF2A55] px-2.5 py-1 rounded bg-[#FF2A55]/10 border border-[#FF2A55]/30">
                {BENTO_TILES[0].protocol}
              </span>
              <span className="font-mono text-xs text-neutral-500">{BENTO_TILES[0].index}</span>
            </div>
            <h3 className="font-clash text-2xl font-bold text-white">
              {BENTO_TILES[0].title}
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-lg">
              {BENTO_TILES[0].description}
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-neutral-300">Sprint Timeline: Day 01 Kickoff → Day 14 Handover</span>
            </div>
            <span className="text-[#FF2A55] font-bold">{BENTO_TILES[0].tag}</span>
          </div>
        </div>

        {/* TILE 2: Latency Telemetry (Span 5) */}
        <div
          onMouseMove={handleMouseMove}
          className="bento-card md:col-span-5 p-8 flex flex-col justify-between min-h-[320px]"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs text-[#FF2A55] px-2.5 py-1 rounded bg-[#FF2A55]/10 border border-[#FF2A55]/30">
                {BENTO_TILES[1].protocol}
              </span>
              <span className="font-mono text-xs text-neutral-500">{BENTO_TILES[1].index}</span>
            </div>
            <h3 className="font-clash text-2xl font-bold text-white">
              {BENTO_TILES[1].title}
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {BENTO_TILES[1].description}
            </p>
          </div>

          {/* Animated Wave SVG */}
          <div className="py-4">
            <svg className="w-full h-12 stroke-[#FF2A55]" fill="none" viewBox="0 0 300 40">
              <path d="M0 20 Q 30 5, 60 20 T 120 20 T 180 20 T 240 20 T 300 20" strokeWidth="2" className="opacity-80" />
              <path d="M0 20 Q 30 35, 60 20 T 120 20 T 180 20 T 240 20 T 300 20" strokeWidth="1.5" className="opacity-40" strokeDasharray="3 3" />
            </svg>
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs font-mono text-neutral-400">
            <span>EDGE BUDGET: &lt;15ms</span>
            <span className="text-emerald-400 font-bold">{BENTO_TILES[1].tag}</span>
          </div>
        </div>

        {/* TILE 3: Day-1 IP Ownership (Span 5) */}
        <div
          onMouseMove={handleMouseMove}
          className="bento-card md:col-span-5 p-8 flex flex-col justify-between min-h-[300px]"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs text-[#FF2A55] px-2.5 py-1 rounded bg-[#FF2A55]/10 border border-[#FF2A55]/30">
                {BENTO_TILES[2].protocol}
              </span>
              <span className="font-mono text-xs text-neutral-500">{BENTO_TILES[2].index}</span>
            </div>
            <h3 className="font-clash text-2xl font-bold text-white">
              {BENTO_TILES[2].title}
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {BENTO_TILES[2].description}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-neutral-300">
            <span className="text-[#FF2A55] font-bold">✓</span> Full Source Code + Infrastructure as Code (IaC)
          </div>
        </div>

        {/* TILE 4: Agent Council (Span 7) */}
        <div
          onMouseMove={handleMouseMove}
          className="bento-card md:col-span-7 p-8 flex flex-col justify-between min-h-[300px]"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs text-[#FF2A55] px-2.5 py-1 rounded bg-[#FF2A55]/10 border border-[#FF2A55]/30">
                {BENTO_TILES[3].protocol}
              </span>
              <span className="font-mono text-xs text-neutral-500">{BENTO_TILES[3].index}</span>
            </div>
            <h3 className="font-clash text-2xl font-bold text-white">
              {BENTO_TILES[3].title}
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-lg">
              {BENTO_TILES[3].description}
            </p>
          </div>

          {/* 4 Agent Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-white/10 font-mono text-[10px]">
            <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
              <div className="text-[#FF2A55] font-bold">AGENT 01</div>
              <div className="text-neutral-400">Architecture</div>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
              <div className="text-[#FF2A55] font-bold">AGENT 02</div>
              <div className="text-neutral-400">pgvector AI</div>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
              <div className="text-[#FF2A55] font-bold">AGENT 03</div>
              <div className="text-neutral-400">3D Blender</div>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
              <div className="text-[#FF2A55] font-bold">AGENT 04</div>
              <div className="text-neutral-400">AST Quality</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
