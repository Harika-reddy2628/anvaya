'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export interface PreloaderProps {
  readonly onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      const counterState = { val: 0 };

      // 1. Progress count from 00 to 100% in 1.1s
      tl.to(counterState, {
        val: 100,
        duration: 1.15,
        ease: 'power2.inOut',
        onUpdate: () => {
          setCount(Math.floor(counterState.val));
          if (barRef.current) {
            barRef.current.style.width = `${Math.floor(counterState.val)}%`;
          }
        },
      });

      // 2. Smooth fade of preloader content
      tl.to('.preloader-elements', {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
      });

      // 3. Shutter curtain wipe upward
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.75,
          ease: 'power4.inOut',
        },
        '+=0.05'
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between p-8 sm:p-14 bg-[#07090E] border-b border-white/10 select-none"
    >
      {/* Top Bar */}
      <div className="preloader-elements flex justify-between items-center text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF2A55] animate-ping"></span>
          <span className="text-white font-bold tracking-wider">ANVAYA HARNESS</span>
          <span className="text-neutral-500">// v4.2 PROD</span>
        </div>
        <div>BENGALURU // GLOBAL REMOTE</div>
      </div>

      {/* Center Stage: Walking Ant with Counter */}
      <div className="preloader-elements flex flex-col items-center justify-center my-auto">
        <div className="relative flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            {/* Animated SVG Crimson Ant */}
            <svg width="48" height="36" viewBox="0 0 50 40" fill="none" className="text-[#FF2A55] drop-shadow-[0_0_12px_rgba(255,42,85,0.8)]">
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
            <div className="px-3 py-1.5 rounded-lg bg-[#0E111A] border border-[#FF2A55] font-mono text-sm font-bold text-white shadow-lg">
              <span className="text-[#FF2A55]">{count < 10 ? `0${count}` : count}</span>% SPRINT_READY
            </div>
          </div>

          <h2 className="font-clash text-2xl font-bold tracking-tight text-white mb-2">
            COLONY INITIALIZING...
          </h2>
          <p className="font-mono text-xs text-neutral-400 max-w-sm text-center">
            Deploying autonomous multi-agent workers. Synchronizing AST diff engine.
          </p>
        </div>

        {/* 1px Hairline Tracker Line */}
        <div className="w-full max-w-md h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden relative">
          <div ref={barRef} className="h-full bg-[#FF2A55] w-0 transition-all duration-75"></div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="preloader-elements flex justify-between items-center text-[11px] font-mono text-neutral-500">
        <div>SYSTEMS OVER SLOP</div>
        <div>100% DAY-1 IP OWNERSHIP</div>
      </div>
    </div>
  );
};
