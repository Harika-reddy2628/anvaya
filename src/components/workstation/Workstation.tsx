'use client';

import React, { useState } from 'react';
import { CLI_TABS } from '@/data/mockData';
import { playHapticClick } from '@/utils/audio';

export interface WorkstationProps {
  readonly defaultTab?: 'spatial' | 'vector' | 'compiler';
}

export const Workstation: React.FC<WorkstationProps> = ({ defaultTab = 'spatial' }) => {
  const [activeTab, setActiveTab] = useState<'spatial' | 'vector' | 'compiler'>(defaultTab);

  const handleTabChange = (tab: 'spatial' | 'vector' | 'compiler') => {
    setActiveTab(tab);
    playHapticClick(700, 'sine', 0.06);
  };

  const currentTab = CLI_TABS[activeTab];

  return (
    <section id="workstation" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto space-y-8 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="font-mono text-xs text-[#FF2A55] uppercase tracking-wider mb-2">
            TELEMETRY & CODE ENGINE
          </div>
          <h2 className="font-clash text-3xl sm:text-4xl font-bold text-white">
            Interactive CLI Workstation
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {(['spatial', 'vector', 'compiler'] as const).map((tabKey) => {
            const tab = CLI_TABS[tabKey];
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                type="button"
                onClick={() => handleTabChange(tabKey)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FF2A55] text-white shadow-[0_0_15px_rgba(255,42,85,0.4)]'
                    : 'bg-[#151926] hover:bg-white/10 text-neutral-400'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Terminal Container */}
      <div className="rounded-2xl bg-[#0B0D14] border border-white/15 p-6 font-mono text-xs shadow-2xl relative overflow-hidden">
        {/* Terminal Header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10 text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            <span className="text-neutral-400 ml-2">anvaya-cli — bash</span>
          </div>
          <div>UTF-8 // 60 FPS</div>
        </div>

        {/* Terminal Body */}
        <div className="pt-6 space-y-3 leading-relaxed min-h-[220px]">
          <div className="text-neutral-400">
            <span className="text-[#FF2A55] font-bold">$ </span>
            {currentTab.command}
          </div>

          <div className="text-neutral-300 pl-4 border-l-2 border-[#FF2A55] space-y-1">
            {currentTab.logs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
            <div className="text-white font-bold pt-1 text-sm text-[#FF2A55]">
              {currentTab.successMessage}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
