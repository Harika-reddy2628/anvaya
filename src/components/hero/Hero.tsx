'use client';

import React, { useRef, useState } from 'react';
import { HERO_METRICS } from '@/data/mockData';
import { playHapticClick } from '@/utils/audio';
import { MacbookNeuralScene, MacbookNeuralSceneRef } from '@/components/scene/MacbookNeuralScene';

export interface HeroProps {
  readonly onBookClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const sceneRef = useRef<MacbookNeuralSceneRef>(null);
  const [isInside, setIsInside] = useState<boolean>(false);

  const handleFlightToggle = () => {
    if (!sceneRef.current) return;
    const newState = sceneRef.current.toggleFlight();
    setIsInside(newState);
    playHapticClick(newState ? 850 : 450, 'sine', 0.08);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* 1. Real Three.js WebGL Background Canvas */}
      <MacbookNeuralScene
        ref={sceneRef}
        onFlightChange={(state) => setIsInside(state)}
      />

      {/* 2. Front Hero Content & Telemetry Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-28 pb-16 pointer-events-none">
        
        {/* DESK STAGE: Fades when flying into neural core */}
        <div
          className={`max-w-xl space-y-6 transition-all duration-700 pointer-events-auto ${
            isInside
              ? 'opacity-0 -translate-y-8 pointer-events-none'
              : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF2A55]/10 border border-[#FF2A55]/30 text-[#FF2A55] font-mono text-[11px] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#FF2A55] animate-ping"></span>
            <span>AUTONOMOUS WORKFLOW MATRIX // Q4 INTAKE OPEN</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="font-clash text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            FROM VOID <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#FF2A55]">
              INTO MATTER.
            </span>
          </h1>

          {/* Value Prop */}
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed font-normal">
            Real 3D hardware engineering meets autonomous multi-agent intelligence. We deliver production-grade systems in <strong className="text-white font-semibold">14 days</strong> with zero agency slop.
          </p>

          {/* Metrics */}
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

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              type="button"
              onClick={handleFlightToggle}
              className="px-7 py-3.5 rounded-full bg-[#FF2A55] hover:bg-[#D91B40] text-white font-semibold text-sm transition-all shadow-[0_0_25px_rgba(255,42,85,0.45)] flex items-center gap-2.5 cursor-pointer"
            >
              <span>DIVE INTO NEURAL CORE</span>
              <span>⚡</span>
            </button>

            <a
              href="#intake"
              onClick={() => {
                playHapticClick(700, 'sine', 0.08);
                if (onBookClick) onBookClick();
              }}
              className="px-6 py-3.5 rounded-full bg-[#151926] hover:bg-white/10 border border-white/15 text-neutral-300 font-medium text-sm transition-all cursor-pointer"
            >
              Book 14-Day Sprint →
            </a>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500 pt-1">
            <span className="text-[#FF2A55] font-bold">DRAG:</span> Rotate 3D MacBook // <span className="text-white">HOVER:</span> Metallic PBR Parallax
          </div>
        </div>

        {/* NEURAL STAGE: Appears when camera punches through the screen */}
        <div
          className={`max-w-2xl mx-auto text-center space-y-5 transition-all duration-700 pointer-events-auto ${
            isInside
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/30 text-[#00F5D4] font-mono text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping"></span>
            <span>INSIDE AUTONOMOUS NEURAL MATRIX // 4 AGENTS SYNCHRONIZED</span>
          </div>

          <h2 className="font-clash text-4xl sm:text-6xl font-bold text-white tracking-tight">
            THE MULTI-AGENT SWARM
          </h2>

          <p className="font-mono text-xs text-neutral-300 max-w-lg mx-auto">
            Every node represents a specialized autonomous agent routing live AST diffs, pgvector embeddings, and Draco 3D geometry in parallel.
          </p>

          {/* 4 Agent Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 font-mono text-xs text-left">
            <div className="p-3.5 rounded-xl bg-white/5 border border-[#FF2A55]/40 backdrop-blur-md">
              <div className="text-[#FF2A55] font-bold">AGENT 01</div>
              <div className="text-white text-xs font-semibold">Architecture</div>
              <div className="text-neutral-400 text-[10px] pt-1">Next.js 16</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-[#00F5D4]/40 backdrop-blur-md">
              <div className="text-[#00F5D4] font-bold">AGENT 02</div>
              <div className="text-white text-xs font-semibold">pgvector AI</div>
              <div className="text-neutral-400 text-[10px] pt-1">7.4ms p99</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-[#8B5CF6]/40 backdrop-blur-md">
              <div className="text-[#8B5CF6] font-bold">AGENT 03</div>
              <div className="text-white text-xs font-semibold">3D Spatial</div>
              <div className="text-neutral-400 text-[10px] pt-1">Draco -93%</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-amber-400/40 backdrop-blur-md">
              <div className="text-amber-400 font-bold">AGENT 04</div>
              <div className="text-white text-xs font-semibold">AST Quality</div>
              <div className="text-neutral-400 text-[10px] pt-1">Zero Slop</div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleFlightToggle}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Pull Back to Desk ↺
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
