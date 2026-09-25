"use client";

import React, { useState } from "react";
import { Terminal, ChevronUp, Cpu, ShieldCheck, Zap } from "lucide-react";

export const CockpitDrawer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sprints = [
    {
      id: "01",
      title: "MVP Launchpad",
      tech: "FastAPI + Next.js 16 + Postgres",
      metric: "14 Days Handoff",
      icon: Zap,
      status: "STABLE",
      accent: "#F59E0B",
    },
    {
      id: "02",
      title: "Neural Core",
      tech: "pgvector HNSW + Gemini 2.5 RAG",
      metric: "< 15ms Latency",
      icon: Cpu,
      status: "OPTIMIZED",
      accent: "#A855F7",
    },
    {
      id: "03",
      title: "Zero Trust Edge",
      tech: "Cloudflare Workers + SOC-2 Guard",
      metric: "100% Day-1 Sovereign",
      icon: ShieldCheck,
      status: "HARDENED",
      accent: "#004CE8",
    },
  ];

  return (
    <div
      className={`w-full max-w-6xl mx-auto rounded-t-2xl border-t border-x border-white/10 bg-[#0E111B]/95 backdrop-blur-xl shadow-2xl transition-all duration-500 overflow-hidden ${
        isExpanded ? "max-h-[600px]" : "max-h-[140px]"
      }`}
    >
      {/* Drawer Bar Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-5 py-3.5 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-3">
          {/* macOS window control dots */}
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-[#FF5F56]" />
            <span className="size-3 rounded-full bg-[#FFBD2E]" />
            <span className="size-3 rounded-full bg-[#27C93F]" />
          </div>

          <div className="h-4 w-px bg-white/10 mx-1" />

          <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
            <Terminal className="size-3.5 text-[#F59E0B]" />
            <span>anvaya-cockpit: ~/sprints/active-deployments</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-[#64748B]">
          <span className="hidden sm:inline">
            {isExpanded ? "[ CLICK TO COLLAPSE ]" : "[ CLICK TO EXPAND COCKPIT ]"}
          </span>
          <ChevronUp
            className={`size-4 text-[#F59E0B] transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Cockpit Content & Active Sprints */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {sprints.map((sprint) => {
          const Icon = sprint.icon;
          return (
            <div
              key={sprint.id}
              className="group relative rounded-xl border border-white/10 bg-[#151926]/60 p-4 hover:border-white/20 hover:bg-[#151926] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#64748B]">
                    {sprint.id}
                  </span>
                  <div
                    className="p-1.5 rounded-lg border border-white/10"
                    style={{ backgroundColor: `${sprint.accent}15` }}
                  >
                    <Icon className="size-4" style={{ color: sprint.accent }} />
                  </div>
                </div>

                <span
                  className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10"
                  style={{ color: sprint.accent, borderColor: `${sprint.accent}30` }}
                >
                  {sprint.status}
                </span>
              </div>

              <h4 className="font-clash font-semibold text-sm text-white mb-1 group-hover:text-[#F59E0B] transition-colors">
                {sprint.title}
              </h4>
              <p className="font-mono text-xs text-[#94A3B8] mb-3">
                {sprint.tech}
              </p>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] pt-2 border-t border-white/5">
                <span>METRIC</span>
                <span className="text-white font-semibold">{sprint.metric}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
