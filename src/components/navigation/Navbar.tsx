'use client';

import React, { useState } from 'react';
import { NAV_ITEMS } from '@/data/mockData';
import { toggleAudioState, playHapticClick } from '@/utils/audio';

export interface NavbarProps {
  readonly onBookClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [soundOn, setSoundOn] = useState<boolean>(false);

  const handleSoundToggle = () => {
    const newState = toggleAudioState();
    setSoundOn(newState);
  };

  const handleNavClick = () => {
    playHapticClick(500, 'sine', 0.05);
  };

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto h-12 px-5 rounded-full bg-[#0E111A]/90 backdrop-blur-md border border-white/10 flex items-center gap-6 shadow-2xl">
        {/* Wordmark */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleNavClick}>
          <span className="w-2 h-2 rounded-full bg-[#FF2A55] animate-pulse"></span>
          <span className="font-clash font-bold tracking-tight text-white text-base">ANVAYA</span>
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">STUDIO</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-xs text-neutral-400 font-medium">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              {item.badge && <span className="text-[#FF2A55]">{item.badge}</span>}
              {item.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSoundToggle}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white transition-all text-[11px] font-mono flex items-center gap-1.5 cursor-pointer"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                soundOn ? 'bg-[#FF2A55] animate-pulse' : 'bg-neutral-500'
              }`}
            ></span>
            <span>{soundOn ? 'SOUND: ON' : 'SOUND: OFF'}</span>
          </button>

          <a
            href="#intake"
            onClick={() => {
              playHapticClick(700, 'sine', 0.08);
              if (onBookClick) onBookClick();
            }}
            className="px-4 py-1.5 rounded-full bg-[#FF2A55] hover:bg-[#D91B40] text-white text-xs font-semibold tracking-wide transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,42,85,0.4)]"
          >
            Book 14-Day Sprint →
          </a>
        </div>
      </nav>
    </header>
  );
};
