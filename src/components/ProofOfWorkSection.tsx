"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Terminal, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";

interface SystemProof {
  id: string;
  tabLabel: string;
  category: string;
  title: string;
  tagline: string;
  imageSrc: string;
  imageAlt: string;
  command?: string;
  telemetry: { label: string; value: string }[];
  accentColor: string;
}

const SYSTEMS: SystemProof[] = [
  {
    id: "checkdk",
    tabLabel: "01 checkDK Engine",
    category: "DEVELOPER TOOLING",
    title: "TypeScript AST Parsing & Automated Code Diffing",
    tagline: "Zero breaking runtime regressions across 50,000+ parsed AST nodes.",
    imageSrc: "/assets/checkdk_showcase.png",
    imageAlt: "checkDK AST Engine Architecture and CLI Showcase",
    command: "npm install checkdk@latest",
    telemetry: [
      { label: "Parse Latency", value: "18.2ms" },
      { label: "Memory Footprint", value: "< 22MB" },
      { label: "Regressions", value: "0" },
    ],
    accentColor: "#004CE8",
  },
  {
    id: "oppy",
    tabLabel: "02 Oppy Desktop",
    category: "LOCAL-FIRST RUNTIME",
    title: "Streaming SQLite Write-Ahead-Log (WAL) Engine",
    tagline: "High-performance IPC synchronization built for real-time local intelligence.",
    imageSrc: "/assets/oppy_showcase.png",
    imageAlt: "Oppy Browser Engine Dashboard and WAL Streamer",
    command: "npx @dshenoyh/oppy-cli",
    telemetry: [
      { label: "Sync Frequency", value: "120Hz" },
      { label: "Throughput", value: "14.2k tx/s" },
      { label: "Lock Contention", value: "0ms" },
    ],
    accentColor: "#10B981",
  },
  {
    id: "edge",
    tabLabel: "03 Zero Trust Edge",
    category: "EDGE INFRASTRUCTURE",
    title: "Bare-Metal Automation Cluster with mTLS Ingress",
    tagline: "Self-hosted workflow engine fronted by Cloudflare Zero Trust with zero public IP exposure.",
    imageSrc: "/assets/showcase_edge.png",
    imageAlt: "Cloudflare Zero Trust Global Network and Admin Console",
    command: "cloudflared tunnel run n8n-edge",
    telemetry: [
      { label: "Ingress Latency", value: "9ms p95" },
      { label: "Public Exposure", value: "0" },
      { label: "Cluster Uptime", value: "99.98%" },
    ],
    accentColor: "#F59E0B",
  },
  {
    id: "vector",
    tabLabel: "04 Neural Retrieval",
    category: "VECTOR ARCHITECTURE",
    title: "Deterministic RAG with pgvector HNSW Guardrails",
    tagline: "Mathematical guardrails and structured JSON schemas that eliminate model hallucination.",
    imageSrc: "/assets/showcase_ai.png",
    imageAlt: "Deterministic pgvector Vector Search Pipeline",
    command: "pgvector HNSW (m=16, ef=64)",
    telemetry: [
      { label: "Query Latency", value: "< 12ms" },
      { label: "Recall Precision", value: "99.2%" },
      { label: "Hallucinations", value: "0" },
    ],
    accentColor: "#8B5CF6",
  },
];

export const ProofOfWorkSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSystem = SYSTEMS[activeIdx];

  // Smooth automatic cycling every 7 seconds, pauses on user hover
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SYSTEMS.length);
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % SYSTEMS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + SYSTEMS.length) % SYSTEMS.length);
  };

  return (
    <section
      id="proof"
      className="relative w-full pt-40 pb-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80 flex flex-col items-center scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        {/* Authoritative Section Title (Tag removed per user request) */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0D17] text-center mb-4">
          Proof of Engineering Capabilities
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-12 leading-relaxed">
          Clients buy evidence, not promises. Explore Anvaya&apos;s verified production systems.
        </p>

        {/* Top Segmented Tabs Navigation */}
        <div className="w-full max-w-5xl flex items-center justify-between mb-6">
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80">
            {SYSTEMS.map((sys, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={sys.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors duration-200 cursor-pointer ${
                    isActive ? "text-[#0A0D17]" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSystemTab"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      className="absolute inset-0 rounded-xl bg-white shadow-sm border border-slate-200/90"
                    />
                  )}
                  <span className="relative z-10">{sys.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Previous / Next Stepper Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous System"
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 flex items-center justify-center text-slate-700 transition-colors cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next System"
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 flex items-center justify-center text-slate-700 transition-colors cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive System Cockpit Chassis with Atmospheric Ambient Glow */}
        <div className="relative w-full max-w-5xl">
          {/* Atmospheric Ambient Aura keyed to active system accent */}
          <div
            className="absolute -inset-6 sm:-inset-10 rounded-[3rem] opacity-50 blur-3xl pointer-events-none transition-all duration-700 ease-out"
            style={{
              background: `radial-gradient(ellipse 75% 55% at 50% 45%, ${activeSystem.accentColor} 0%, transparent 70%)`,
            }}
          />

          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full rounded-3xl p-2 bg-slate-100/90 border border-slate-200/90 shadow-[0_30px_70px_-15px_rgba(10,13,23,0.18),0_0_50px_-10px_rgba(0,76,232,0.1)]"
          >
          <div className="w-full rounded-2xl bg-[#090D16] border border-white/10 overflow-hidden text-left relative flex flex-col">
            {/* Precision Chassis Top Bar */}
            <div className="w-full px-6 py-3.5 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-2 font-mono text-xs font-medium text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                <span>SYSTEM 0{activeIdx + 1}</span>
                <span className="text-white/20">//</span>
                <span className="text-slate-500 uppercase">{activeSystem.category}</span>
              </div>
              <div className="font-mono text-[11px] text-slate-600 uppercase tracking-wider hidden sm:block">
                0{activeIdx + 1} / 0{SYSTEMS.length}
              </div>
            </div>

            {/* Active Stage Body */}
            <div className="p-6 sm:p-8 lg:p-10 min-h-[460px] flex items-center">
              <motion.div
                key={activeSystem.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
              >
                  {/* Left Column: Specifications & Telemetry */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2.5 leading-tight">
                        {activeSystem.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        {activeSystem.tagline}
                      </p>

                      {/* Command Snippet / Quick Launch Pill */}
                      {activeSystem.command && (
                        <div className="flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 mb-6 group/cmd">
                          <div className="flex items-center gap-2.5 font-mono text-xs text-slate-300 truncate">
                            <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="truncate">{activeSystem.command}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(activeSystem.command!)}
                            aria-label="Copy Command"
                            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                          >
                            {copied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Live Telemetry Matrix (Clean 2-line stat + label) */}
                    <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/10">
                      {activeSystem.telemetry.map((t, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
                            {t.value}
                          </span>
                          <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider mt-1">
                            {t.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Visual System Proof Asset */}
                  <div className="lg:col-span-7 w-full">
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl group/asset">
                      <Image
                        src={activeSystem.imageSrc}
                        alt={activeSystem.imageAlt}
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/asset:scale-[1.03]"
                      />
                      {/* Ambient Specimen Glass Sheen */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
            </div>

            {/* Bottom Progress Bar (Visual indicator for automatic cycle) */}
            <div className="w-full h-1 bg-white/5 overflow-hidden">
              <motion.div
                key={activeIdx}
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "0%" : "100%" }}
                transition={{ duration: isHovered ? 0 : 7, ease: "linear" }}
                className="h-full bg-[#004CE8]"
              />
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};
