"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Highlighter } from "@/components/ui/highlighter";

interface SpecimenCardData {
  index: string;
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  accentGlow: string;
  accentGlowLight: string;
  delay: number;
}

const CARDS: SpecimenCardData[] = [
  {
    index: "01",
    tag: "Strict Contracts",
    title: "Schema-First Architecture",
    description: "OpenAPI 3.1 contracts and typed Zod schemas reject runtime regressions before client deployment.",
    imageSrc: "/assets/showcase_mvp.png",
    imageAlt: "Schema-First Production Architecture",
    accentGlow: "rgba(0, 76, 232, 0.45)",
    accentGlowLight: "rgba(0, 76, 232, 0.04)",
    delay: 0.1,
  },
  {
    index: "02",
    tag: "Vector Pipelines",
    title: "Deterministic AI Systems",
    description: "Structured JSON function calling and pgvector HNSW indexing under strict mathematical guardrails.",
    imageSrc: "/assets/showcase_ai.png",
    imageAlt: "Deterministic pgvector AI Pipeline Architecture",
    accentGlow: "rgba(0, 76, 232, 0.45)",
    accentGlowLight: "rgba(0, 76, 232, 0.04)",
    delay: 0.2,
  },
  {
    index: "03",
    tag: "Full Sovereignty",
    title: "100% Sovereign Code",
    description: "Full GitHub repository admin rights, clean Dockerfiles, and cloud infrastructure keys handed over on Day 1.",
    imageSrc: "/assets/showcase_edge.png",
    imageAlt: "Sovereign Cloudflare Edge Infrastructure and Admin Handover",
    accentGlow: "rgba(16, 185, 129, 0.45)",
    accentGlowLight: "rgba(16, 185, 129, 0.04)",
    delay: 0.3,
  },
];

const MinimalSpecimenCard: React.FC<SpecimenCardData> = ({
  index,
  tag,
  title,
  description,
  imageSrc,
  imageAlt,
  accentGlow,
  accentGlowLight,
  delay,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -8 }}
      transition={{
        y: { type: "spring", stiffness: 350, damping: 25 },
        opacity: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
      }}
      className="relative group rounded-3xl p-[1.5px] bg-slate-200/90 transition-shadow duration-300 hover:shadow-[0_24px_50px_rgba(0,0,0,0.08)] cursor-default will-change-transform"
    >
      {/* High-Performance Native CSS Dynamic Cursor Spotlight on the Border */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(340px circle at var(--x, 50%) var(--y, 50%), ${accentGlow}, transparent 70%)`,
        }}
      />

      {/* Double-Bezel Inner Core */}
      <div className="relative rounded-[calc(1.5rem-1.5px)] bg-white p-6 sm:p-7 flex flex-col justify-between h-full overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
        {/* Dynamic Cursor Ambient Surface Glow (Bypasses React State for 120 FPS Smoothness) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), ${accentGlowLight}, transparent 70%)`,
          }}
        />

        {/* Minimal Blueprint Content Header */}
        <div className="relative z-10 min-h-[125px] flex flex-col justify-start">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs font-bold text-slate-400 tracking-widest">
              {index}
            </span>
            <span className="font-mono text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {tag}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A0D17] mb-2">
            {title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Embedded 16:9 Visual Proof Asset */}
        <div className="relative aspect-video w-full mt-6 rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-sm group/img">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
          {/* Ambient Glass Sheen Sweep on Hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
};

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-[#F8F9FC] border-b border-slate-200/80 flex flex-col items-center text-center">
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
        {/* Authoritative Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A0D17] text-center mb-4">
          Systems over{" "}
          <Highlighter
            action="underline"
            color="#004CE8"
            strokeWidth={3}
            padding={3}
            isView={true}
            animationDuration={1500}
          >
            slop.
          </Highlighter>
        </h2>

        {/* Manifesto Paragraph */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto mb-14 md:mb-16">
          We do not stitch together brittle no-code templates or outsource to junior developers.
          We engineer deterministic software systems with typed schemas, automated test suites,
          and robust edge infrastructure.
        </p>

        {/* 3 Minimal Architectural Specimen Cards with Connecting Sequence Arrows */}
        <div className="relative w-full mt-16 text-left">
          {/* Hand-drawn connecting arrow: Card 01 -> Card 02 */}
          <div className="hidden lg:block absolute left-[33.33%] -translate-x-1/2 -top-10 z-20 pointer-events-none select-none">
            <svg
              width="100"
              height="44"
              viewBox="0 0 100 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-sm"
            >
              <path
                d="M 10 36 C 26 12, 54 8, 68 18 C 76 24, 76 33, 70 35 C 64 37, 60 30, 66 22 C 72 12, 84 18, 92 30"
                stroke="#004CE8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="5 3.5"
              />
              <path
                d="M 82 28 L 93 32 L 91 20"
                stroke="#004CE8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Hand-drawn connecting arrow: Card 02 -> Card 03 (Positioned at bottom for dynamic wave rhythm) */}
          <div className="hidden lg:block absolute left-[66.67%] -translate-x-1/2 -bottom-10 z-20 pointer-events-none select-none">
            <svg
              width="100"
              height="44"
              viewBox="0 0 100 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-sm"
            >
              <path
                d="M 10 8 C 26 32, 54 36, 68 26 C 76 20, 76 11, 70 9 C 64 7, 60 14, 66 22 C 72 32, 84 26, 92 14"
                stroke="#004CE8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="5 3.5"
              />
              <path
                d="M 82 16 L 93 12 L 91 24"
                stroke="#004CE8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            {CARDS.map((card) => (
              <MinimalSpecimenCard key={card.index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
