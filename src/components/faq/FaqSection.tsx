'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '@/data/mockData';
import { playHapticClick } from '@/utils/audio';

export interface FaqSectionProps {
  readonly items?: typeof FAQ_ITEMS;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ items = FAQ_ITEMS }) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    playHapticClick(500, 'sine', 0.05);
  };

  return (
    <section id="faq" className="py-24 px-6 sm:px-12 max-w-4xl mx-auto space-y-10 scroll-mt-20">
      <div className="text-center space-y-2">
        <div className="font-mono text-xs text-[#FF2A55]">LEDGER // FAQ</div>
        <h2 className="font-clash text-3xl sm:text-4xl font-bold text-white">
          Frequently Addressed Questions
        </h2>
      </div>

      <div className="divide-y divide-white/10 border-y border-white/10 font-mono text-sm">
        {items.map((item) => {
          const isOpen = !!openIds[item.id];
          return (
            <div
              key={item.id}
              className="py-5 cursor-pointer select-none transition-colors hover:text-white"
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold flex items-center gap-3">
                  <span className="text-[#FF2A55]">{item.index}</span> {item.question}
                </span>
                <span className="text-[#FF2A55] font-bold text-lg">
                  {isOpen ? '−' : '+'}
                </span>
              </div>
              {isOpen && (
                <div className="pt-3 text-neutral-400 text-xs font-sans leading-relaxed animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
