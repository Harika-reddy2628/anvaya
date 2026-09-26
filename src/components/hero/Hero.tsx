'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HERO_METRICS } from '@/data/mockData';
import { playHapticClick } from '@/utils/audio';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export interface HeroProps {
  readonly onBookClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const macbookRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  // Ant Hop Animation on Click
  const antHop = contextSafe((antId: string) => {
    const el = document.getElementById(antId);
    if (!el) return;
    gsap.to(el, {
      scale: 1.35,
      y: -14,
      duration: 0.18,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
    });
    playHapticClick(900, 'square', 0.05);
  });

  // Toggle Camera Dolly Zoom into MacBook
  const toggleDollyZoom = contextSafe(() => {
    if (!macbookRef.current) return;
    const nextState = !isZoomed;
    setIsZoomed(nextState);

    if (nextState) {
      macbookRef.current.classList.add('macbook-zoomed');
      playHapticClick(800, 'triangle', 0.08);
    } else {
      macbookRef.current.classList.remove('macbook-zoomed');
      playHapticClick(450, 'sine', 0.08);
    }
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-28 pb-16 px-6 sm:px-12 flex flex-col justify-center max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: Monumental Typography & Business Proposition */}
        <div className="lg:col-span-5 z-20 space-y-6">
          
          {/* Live Intake Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF2A55]/10 border border-[#FF2A55]/30 text-[#FF2A55] font-mono text-[11px] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#FF2A55] animate-ping"></span>
            <span>COLONY ACTIVE // Q4 SPRINT INTAKE OPEN</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="font-clash text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            IDEAS TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#FF2A55]">
              IMPACT.
            </span>
          </h1>

          {/* Plain English, High-Trust Copy */}
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-md font-normal">
            We engineer production-grade web applications, deterministic AI systems, and 3D pipelines in{' '}
            <strong className="text-white font-semibold">14 days</strong>. Powered by an industrious multi-agent colony moving with zero agency slop.
          </p>

          {/* Metrics Ticker Strip */}
          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/10 font-mono text-xs text-neutral-400">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label}>
                <div
                  className={`text-2xl font-bold font-sans ${
                    metric.highlight ? 'text-[#FF2A55]' : 'text-white'
                  }`}
                >
                  {metric.value}
                </div>
                <div className="text-[10px] text-neutral-500 uppercase">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href="#intake"
              onClick={() => {
                playHapticClick(700, 'sine', 0.08);
                if (onBookClick) onBookClick();
              }}
              className="px-7 py-3.5 rounded-full bg-[#FF2A55] hover:bg-[#D91B40] text-white font-semibold text-sm transition-all shadow-xl hover:shadow-[0_0_25px_rgba(255,42,85,0.4)] cursor-pointer"
            >
              Schedule 14-Day Sprint →
            </a>
            
            <button
              type="button"
              onClick={toggleDollyZoom}
              className="px-5 py-3.5 rounded-full bg-[#151926] hover:bg-white/10 border border-white/15 text-neutral-300 font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isZoomed ? 'Reset Camera' : 'Dolly into MacBook'}</span>
              <span>{isZoomed ? '↺' : '🔍'}</span>
            </button>
          </div>

          {/* Sanskrit Root Heritage Note */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500 pt-1">
            <span className="text-[#FF2A55] font-bold">ANVAYA:</span> (अन्वय) Logical connection & causal continuity.
          </div>
        </div>

        {/* RIGHT COLUMN: 3D MACBOOK FLIGHT DECK + ANIMATED CRIMSON DOODLE ANTS */}
        <div className="lg:col-span-7 relative flex justify-center items-center perspective-stage min-h-[500px]">
          
          {/* ANT 1: Hoisting Code Slab on Left */}
          <div
            id="ant-hero-1"
            className="absolute -top-6 left-8 z-30 cursor-pointer select-none"
            onClick={() => antHop('ant-hero-1')}
          >
            <div className="flex items-center gap-2">
              <svg width="46" height="34" viewBox="0 0 50 40" fill="none" className="text-[#FF2A55] drop-shadow-[0_0_8px_rgba(255,42,85,0.8)]">
                <ellipse cx="12" cy="20" rx="9" ry="6" fill="currentColor" />
                <ellipse cx="25" cy="20" rx="6" ry="4.5" fill="currentColor" />
                <circle cx="37" cy="18" r="4.5" fill="currentColor" />
                <path d="M38 15 Q43 9 46 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M39 16 Q45 13 47 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 23 Q24 33 28 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ant-leg-l" />
                <path d="M26 23 Q28 34 33 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ant-leg-r" />
                <path d="M12 24 Q10 32 6 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ant-leg-l" />
                <path d="M15 24 Q16 33 13 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ant-leg-r" />
              </svg>
              <div className="px-2.5 py-1 rounded bg-[#131622] border border-[#FF2A55]/50 font-mono text-[10px] text-white shadow-lg">
                <span className="text-[#FF2A55]">const</span> velocity = <span className="text-emerald-400">14_DAYS</span>;
              </div>
            </div>
          </div>

          {/* ANT 2: Walking Along the MacBook Top Bezel */}
          <div
            id="ant-hero-2"
            className="absolute top-8 right-16 z-40 cursor-pointer select-none"
            onClick={() => antHop('ant-hero-2')}
          >
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-[#FF2A55] text-white font-mono text-[9px] font-bold tracking-wider">
                AGENT_01: ARCHITECTURE
              </span>
              <svg width="36" height="28" viewBox="0 0 50 40" fill="none" className="text-[#FF2A55] -scale-x-100 drop-shadow-[0_0_8px_rgba(255,42,85,0.8)]">
                <ellipse cx="12" cy="20" rx="9" ry="6" fill="currentColor" />
                <ellipse cx="25" cy="20" rx="6" ry="4.5" fill="currentColor" />
                <circle cx="37" cy="18" r="4.5" fill="currentColor" />
                <path d="M38 15 Q43 9 46 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 23 Q24 33 28 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ant-leg-l" />
                <path d="M26 23 Q28 34 33 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ant-leg-r" />
              </svg>
            </div>
          </div>

          {/* Architectural Blueprint Doodles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70" viewBox="0 0 600 500" fill="none">
            <path d="M 40 430 L 220 430" stroke="#FF2A55" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 40 425 L 40 435" stroke="#FF2A55" strokeWidth="1.5" />
            <path d="M 220 425 L 220 435" stroke="#FF2A55" strokeWidth="1.5" />
            <text x="65" y="448" fill="#FF2A55" fontFamily="JetBrains Mono" fontSize="10">
              PRODUCTION_SURFACE [100%]
            </text>
          </svg>

          {/* THE 3D MACBOOK FLIGHT DECK */}
          <div
            ref={macbookRef}
            className="macbook-3d w-full max-w-[560px] aspect-[16/10] bg-[#141722] rounded-2xl p-3 border-2 border-neutral-700/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] relative overflow-hidden transition-all duration-700"
          >
            {/* Window Bezel & Notch */}
            <div className="w-full flex justify-between items-center px-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              </div>
              <div className="w-16 h-3 bg-neutral-900 rounded-b-md flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-700"></span>
              </div>
              <div className="font-mono text-[9px] text-neutral-400">anvaya.os // telemetry</div>
            </div>

            {/* Inside Screen */}
            <div className="w-full h-[calc(100%-24px)] bg-[#0A0D15] rounded-lg p-4 font-mono flex flex-col justify-between relative overflow-hidden border border-white/5">
              <div className="flex justify-between items-center text-[10px] text-neutral-400 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF2A55] font-bold">⚡ CLUSTER:</span>
                  <span className="text-white font-semibold">ANVAYA_CORE_v4.2</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400">● 60 FPS</span>
                  <span>p99: 11.2ms</span>
                </div>
              </div>

              {/* Terminal AST Stream */}
              <div className="space-y-2 text-xs my-auto">
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded border border-white/10">
                  <span className="text-[#FF2A55]">❯</span>
                  <span className="text-neutral-300">anvaya sprint --target=&quot;Enterprise AI Architecture&quot;</span>
                </div>

                <div className="space-y-1 text-[11px] pl-3 border-l-2 border-[#FF2A55]/60">
                  <div className="text-neutral-400">
                    <span className="text-[#FF2A55]">[AGENT_01]</span> Compiling Next.js 16 App Router & Tailwind CSS v4... <span className="text-emerald-400">✓ 0.4s</span>
                  </div>
                  <div className="text-neutral-400">
                    <span className="text-[#FF2A55]">[AGENT_02]</span> Provisioning pgvector embeddings & AST diff engine... <span className="text-emerald-400">✓ 0.8s</span>
                  </div>
                  <div className="text-neutral-400">
                    <span className="text-[#FF2A55]">[AGENT_03]</span> Verifying sub-12ms p99 latency SLA on edge... <span className="text-emerald-400">✓ 11.2ms</span>
                  </div>
                  <div className="text-white font-semibold pt-1">
                    <span className="text-[#FF2A55]">★ HANDOVER:</span> 100% Day-1 IP Transferred. Ready for Production.
                  </div>
                </div>
              </div>

              {/* Footer Bar */}
              <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[10px] text-neutral-400">
                <div>STATUS: <span className="text-white font-semibold">PRODUCTION VERIFIED</span></div>
                <div className="px-2 py-0.5 rounded bg-[#FF2A55]/20 text-[#FF2A55] font-bold border border-[#FF2A55]/40">
                  14-DAY CADENCE
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
