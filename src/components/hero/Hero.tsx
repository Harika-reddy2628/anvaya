'use client';

import React, { useState } from 'react';
import { HERO_METRICS } from '@/data/mockData';
import { playHapticClick } from '@/utils/audio';
import { WorldForgeScene } from '@/components/scene/WorldForgeScene';

export interface HeroProps {
  readonly onBookClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const [stats, setStats] = useState<{ fps: number; particleCount: number }>({
    fps: 60,
    particleCount: 2614,
  });
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'status' | 'ast' | 'telemetry'>('status');

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden cosmic-nebula">
      {/* 1. Real 3D World Forge & Relativistic Singularity */}
      <WorldForgeScene onStatsUpdate={setStats} />

      {/* 2. Top Spacer for Navbar */}
      <div className="h-28 sm:h-32" />

      {/* 3. Main Hero Stage Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pointer-events-none my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: Monumental Editorial & Commercial Value (7 cols) */}
          <div className="lg:col-span-7 space-y-8 pointer-events-auto">
            
            {/* Status & Cadence Pill */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 font-mono text-[11px] uppercase tracking-wider backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-[#FF2A55] animate-pulse"></span>
              <span className="text-white font-medium">COLONY AUTONOMY</span>
              <span className="text-neutral-500">//</span>
              <span className="text-[#00F5D4]">14-DAY PRODUCTION CADENCE</span>
            </div>

            {/* Monumental Architectural Headline */}
            <div className="space-y-1">
              <h1 className="font-clash text-6xl sm:text-8xl lg:text-[7rem] font-bold text-white leading-[0.92] tracking-[-0.04em]">
                FROM VOID <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00F5D4]">
                  INTO MATTER.
                </span>
              </h1>
            </div>

            {/* High-Ticket Value Proposition */}
            <p className="font-satoshi text-neutral-300 text-lg sm:text-xl leading-relaxed max-w-xl font-normal drop-shadow-sm">
              We bring architectural order out of chaos. Production-grade software applications, autonomous multi-agent swarms, and 3D spatial engines engineered and deployed in <strong className="text-white font-semibold underline decoration-[#FF2A55] decoration-2 underline-offset-4">14 days</strong>. Zero agency slop. 100% Day-1 IP ownership.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#intake"
                onClick={() => {
                  playHapticClick(720, 'sine', 0.08);
                  if (onBookClick) onBookClick();
                }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-black font-semibold text-sm tracking-wide transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:shadow-[0_0_50px_rgba(0,245,212,0.4)] cursor-pointer"
              >
                <span>Schedule 14-Day Sprint</span>
                <span className="transition-transform group-hover:translate-x-1 font-bold">→</span>
              </a>

              <a
                href="#philosophy"
                onClick={() => playHapticClick(480, 'sine', 0.05)}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/30 text-neutral-200 font-medium text-sm transition-all duration-300 backdrop-blur-xl cursor-pointer"
              >
                <span>Inspect Architecture</span>
                <span className="text-[#00F5D4]">✦</span>
              </a>
            </div>

            {/* 3 Core Guarantee Pillars */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
              {HERO_METRICS.map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <div
                    className={`font-clash text-3xl sm:text-4xl font-bold tracking-tight ${
                      metric.highlight ? 'text-[#00F5D4]' : 'text-white'
                    }`}
                  >
                    {metric.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Expansive breathing room for 3D Singularity; Mobile HUD fallback */}
          <div className="lg:col-span-5 pointer-events-auto lg:hidden pt-8">
            {/* Mobile HUD */}
            <div className="w-full rounded-2xl frosted-cockpit p-4 space-y-3 font-mono text-xs text-neutral-300 border border-white/10">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-white font-bold">ANVAYA // TELEMETRY</span>
                <span className="text-[#00F5D4] text-[10px]">{stats.fps} FPS // ONLINE</span>
              </div>
              <div className="text-[11px] text-neutral-400">
                Colony multi-agent workers synchronized. Turnaround: 14 days.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Desktop Floating Telemetry HUD (Docked cleanly at bottom right corner) */}
      <div className="hidden lg:block absolute bottom-8 right-8 lg:right-12 z-20 pointer-events-auto">
        <div className="w-96 rounded-2xl frosted-cockpit p-4 space-y-3 font-mono text-xs text-neutral-300 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/10">
          
          {/* HUD Header with Tabs */}
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping"></span>
              <span className="text-white font-bold tracking-wider text-[11px]">FLIGHT_DECK // HUD</span>
            </div>
            
            <div className="flex items-center gap-1 text-[10px]">
              <button
                onClick={() => setActiveTelemetryTab('status')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activeTelemetryTab === 'status'
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                STATUS
              </button>
              <button
                onClick={() => setActiveTelemetryTab('ast')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activeTelemetryTab === 'ast'
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                DIFF
              </button>
              <button
                onClick={() => setActiveTelemetryTab('telemetry')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activeTelemetryTab === 'telemetry'
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                LOGS
              </button>
            </div>
          </div>

              {/* Tab 1: Live Status & Specs */}
              {activeTelemetryTab === 'status' && (
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-neutral-400">Rendering Engine:</span>
                    <span className="text-white font-medium">WebGL 2.0 // Keplerian Accretion</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-neutral-400">Frame Budget:</span>
                    <span className="text-[#00F5D4] font-medium">{stats.fps} FPS // Locked</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-neutral-400">Multi-Agent Swarm:</span>
                    <span className="text-[#FF2A55] font-medium">14 Workers Synchronized</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-neutral-400">Turnaround Guarantee:</span>
                    <span className="text-white font-medium">14 Production Days</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">IP Transfer:</span>
                    <span className="text-emerald-400 font-medium">100% Day-1 Sovereign Ownership</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Live AST Diff Preview */}
              {activeTelemetryTab === 'ast' && (
                <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[10px] space-y-1">
                  <div className="text-neutral-500">// Autonomous AST Engine Diff</div>
                  <div className="text-red-400">- const agencySlop = true; // 6 months, $120k</div>
                  <div className="text-emerald-400">+ const anvayaSprint = {`{`} days: 14, ip: &apos;100% Day 1&apos;, p99: &apos;&lt;12ms&apos; {`}`};</div>
                  <div className="text-neutral-400 pt-1">// Verified: Zero mock placeholders.</div>
                </div>
              )}

              {/* Tab 3: CLI Telemetry Logs */}
              {activeTelemetryTab === 'telemetry' && (
                <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[10px] space-y-1">
                  <div className="text-neutral-400">
                    <span className="text-[#00F5D4]">$ </span>
                    anvaya colony --swarm=active
                  </div>
                  <div className="text-neutral-500">[SWARM] 14 agents listening on event loop...</div>
                  <div className="text-[#00F5D4]">[OK] Neural consensus achieved in 4.2ms.</div>
                  <div className="text-white font-semibold">[READY] Production handover primed.</div>
                </div>
              )}

              {/* Bottom Real-Time Telemetry Bar */}
              <div className="pt-2 flex justify-between items-center text-[10px] text-neutral-500 font-mono border-t border-white/10">
                <div>PARTICLES: {stats.particleCount} MOTES</div>
                <div className="text-[#00F5D4]">GYROSCOPE ACTIVE</div>
              </div>

            </div>
          </div>

      {/* 4. Bottom Scroll Indicator */}
      <div className="relative z-10 w-full pb-8 flex flex-col items-center justify-center text-center pointer-events-none">
        <a
          href="#ticker"
          className="pointer-events-auto flex flex-col items-center gap-2 font-mono text-[11px] text-neutral-500 hover:text-white transition-colors"
        >
          <span className="tracking-widest uppercase text-[10px]">EXPLORE THE CAPABILITIES</span>
          <span className="animate-bounce text-[#00F5D4]">↓</span>
        </a>
      </div>

    </section>
  );
};
