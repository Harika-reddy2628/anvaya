'use client';

import React from 'react';
import { HERO_METRICS } from '@/data/mockData';
import { playHapticClick } from '@/utils/audio';
import { VolumetricSingularityCanvas } from '@/components/scene/VolumetricSingularityCanvas';

export interface HeroProps {
  readonly onBookClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* 1. Real Volumetric GLSL Raymarched Singularity Canvas */}
      <VolumetricSingularityCanvas />

      {/* 2. Front Hero Content & Cockpit Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-28 pb-16 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Monumental Typography & Business Proposition */}
          <div className="lg:col-span-7 space-y-6 pointer-events-auto">
            {/* Live Intake Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/30 text-[#00F5D4] font-mono text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse"></span>
              <span>AUTONOMOUS SYSTEMS // COSMIC CONDENSATION</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="font-clash text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95]">
              FROM VOID <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#00F5D4]">
                INTO MATTER.
              </span>
            </h1>

            {/* Plain English Value Proposition */}
            <p className="text-neutral-300 text-lg sm:text-xl leading-relaxed max-w-xl font-normal drop-shadow-md">
              We bring order out of chaos. Production-grade web applications, pgvector neural backends, and 3D spatial pipelines shipped in <strong className="text-white font-semibold">14 days</strong>. Zero agency slop.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/15 max-w-lg font-mono text-xs">
              {HERO_METRICS.map((metric) => (
                <div key={metric.label}>
                  <div
                    className={`text-2xl sm:text-3xl font-bold font-sans ${
                      metric.highlight ? 'text-[#FF2A55]' : 'text-white'
                    }`}
                  >
                    {metric.value}
                  </div>
                  <div className="text-[10px] text-neutral-400 uppercase pt-1">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#intake"
                onClick={() => {
                  playHapticClick(700, 'sine', 0.08);
                  if (onBookClick) onBookClick();
                }}
                className="px-8 py-4 rounded-full bg-[#00F5D4] hover:bg-[#00D0B4] text-black font-bold text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(0,245,212,0.45)] cursor-pointer"
              >
                Schedule 14-Day Sprint →
              </a>

              <a
                href="#workstation"
                onClick={() => playHapticClick(500, 'sine', 0.05)}
                className="px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all backdrop-blur-md cursor-pointer"
              >
                Inspect CLI Workstation ✦
              </a>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400 pt-2">
              <span className="text-[#00F5D4] font-bold">INTERACTION:</span> Move cursor to warp gravitational lensing in real time.
            </div>
          </div>

          {/* RIGHT: Floating Frosted Glass Telemetry Cockpit */}
          <div className="lg:col-span-5 pointer-events-auto">
            <div className="rounded-2xl p-6 space-y-5 font-mono text-xs text-neutral-300 bg-[#080B12]/75 backdrop-blur-xl border border-white/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.85)]">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F5D4]"></span>
                  <span className="text-white font-bold">CORE_ENGINE_TELEMETRY</span>
                </div>
                <span className="text-[10px] text-neutral-400">LAGRANGE_PT_01</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Volumetric Engine:</span>
                  <span className="text-emerald-400 font-bold">Raymarched GLSL 2.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Gravitational Lensing:</span>
                  <span className="text-[#00F5D4] font-bold">Schwarzschild Geodesic</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Bioluminescent Fluid:</span>
                  <span className="text-[#FF2A55] font-bold">Curl-Noise 3D fBM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Delivery SLA:</span>
                  <span className="text-white font-bold">14-Day Production Release</span>
                </div>
              </div>

              {/* Terminal Snippet */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-[11px] space-y-1">
                <div className="text-neutral-400">
                  <span className="text-[#00F5D4]">$ </span>
                  anvaya synthesize --quantum
                </div>
                <div className="text-neutral-300">[INFO] Bending light around event horizon...</div>
                <div className="text-[#00F5D4]">[OK] 4 Autonomous Agents Synchronized.</div>
                <div className="text-white font-semibold pt-1">[STATUS] 100% Day-1 IP Ready for Transfer.</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
