'use client';

import React, { useRef } from 'react';
import { playHapticClick } from '@/utils/audio';

export interface FooterProps {
  readonly onReserveClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReserveClick }) => {
  const wordmarkRef = useRef<HTMLHeadingElement>(null);

  const handleWordmarkMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!wordmarkRef.current) return;
    const rect = wordmarkRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    wordmarkRef.current.style.setProperty('--mouse-x', `${x}%`);
    wordmarkRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <footer id="intake" className="py-24 px-6 sm:px-12 border-t border-white/10 bg-[#06080D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF2A55]/10 border border-[#FF2A55]/30 text-[#FF2A55] font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-[#FF2A55] animate-ping"></span>
          <span>ACCEPTING 2 CLIENT SPRINTS FOR NEXT CYCLE</span>
        </div>

        {/* Headline */}
        <h2 className="font-clash text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-tight">
          READY TO SHIP YOUR PRODUCTION SYSTEM?
        </h2>

        <p className="text-neutral-400 text-base sm:text-lg max-w-xl">
          Lock in your 14-day sprint slot. Our engineering team will review your requirements and begin architecture within 24 hours.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href="mailto:contact@anvaya.dev?subject=Reserve%2014-Day%20Sprint"
            onClick={() => {
              playHapticClick(700, 'sine', 0.1);
              if (onReserveClick) onReserveClick();
            }}
            className="px-8 py-4 rounded-full bg-[#FF2A55] hover:bg-[#D91B40] text-white font-bold text-sm tracking-wide transition-all shadow-2xl hover:shadow-[0_0_30px_rgba(255,42,85,0.5)] cursor-pointer"
          >
            Reserve Sprint Window →
          </a>
        </div>

        {/* Monolithic Display Wordmark with Radial Spotlight */}
        <div className="pt-16 w-full flex justify-center">
          <h1
            ref={wordmarkRef}
            onMouseMove={handleWordmarkMouseMove}
            className="font-clash text-7xl sm:text-9xl md:text-[180px] font-bold tracking-tighter text-white/10 select-none hover-spotlight-text transition-all duration-300 cursor-default"
          >
            ANVAYA
          </h1>
        </div>

        {/* Legal & Attribution Bar */}
        <div className="w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-neutral-500 gap-4">
          <div>© 2026 ANVAYA ENGINEERING STUDIO. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <span>SYSTEMS OVER SLOP</span>
            <span>100% DAY-1 IP</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
