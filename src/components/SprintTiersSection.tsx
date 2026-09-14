"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";

interface FeatureItem {
  lead: string;
  detail: string;
}

interface Tier {
  id: string;
  name: string;
  duration: string;
  target: string;
  priceInr: string;
  priceUsd: string;
  highlight?: boolean;
  badge?: string;
  features: FeatureItem[];
}

const TIERS: Tier[] = [
  {
    id: "tier-1",
    name: "The 14-Day MVP Launchpad",
    duration: "10–14 Days",
    target: "Pre-seed & Seed Founders",
    priceInr: "₹1,20,000 – ₹2,50,000",
    priceUsd: "$1,500 – $3,000",
    highlight: true,
    badge: "Most Requested",
    features: [
      { lead: "Next.js 16 App Router", detail: "Tailwind CSS v4 with responsive layouts" },
      { lead: "Fullstack Architecture", detail: "FastAPI / Node.js with Supabase & Postgres" },
      { lead: "Strict Typed Contracts", detail: "Schema-first OpenAPI & end-to-end typing" },
      { lead: "Edge Deployment", detail: "Dockerized production pipeline on Cloudflare" },
      { lead: "Auth & Payments", detail: "Clerk or Supabase Auth with Stripe & Razorpay" },
      { lead: "Full IP Transfer", detail: "100% Day-1 Git ownership with complete docs" },
      { lead: "Warranty & Support", detail: "30-day post-launch bug-fix & stability SLA" },
    ],
  },
  {
    id: "tier-2",
    name: "AI & Agentic Workflow Engine",
    duration: "7–10 Days",
    target: "B2B SMBs & Operations",
    priceInr: "₹60,000 – ₹1,50,000",
    priceUsd: "$750 – $1,800",
    features: [
      { lead: "Hybrid Search RAG", detail: "Vector embeddings + BM25 lexical retrieval" },
      { lead: "Semantic Indexing", detail: "pgvector & FAISS search with HNSW graphs" },
      { lead: "Automated Workflows", detail: "Self-hosted n8n orchestrating backend logic" },
      { lead: "Reliable Tool Calling", detail: "Structured function calls with zero hallucinations" },
      { lead: "Multi-Channel Intake", detail: "Email, Webhook, and REST API ingestion" },
      { lead: "Zero Vendor Lock-in", detail: "Self-hosted open source infrastructure" },
      { lead: "Handover & Warranty", detail: "14-day warranty & maintenance SLA" },
    ],
  },
  {
    id: "tier-3",
    name: "Interface Modernization Sprint",
    duration: "5–7 Days",
    target: "Startups with Legacy UIs",
    priceInr: "₹40,000 – ₹90,000",
    priceUsd: "$500 – $1,100",
    features: [
      { lead: "Design System Overhaul", detail: "Modern ceramic design tokens & component specs" },
      { lead: "60fps Micro-Interactions", detail: "Fluid animations & high-trust typography" },
      { lead: "Modern CSS Architecture", detail: "Tailwind CSS v4 responsive restructuring" },
      { lead: "Lighthouse 95+ Score", detail: "Sub-second Core Web Vitals optimization" },
      { lead: "Zero Downtime Deploy", detail: "Seamless staging-to-production migration" },
      { lead: "Component Guidelines", detail: "Living design specs & reusable token library" },
      { lead: "Handoff Warranty", detail: "14-day visual QA & post-launch polish" },
    ],
  },
];

export const SprintTiersSection: React.FC = () => {
  return (
    <section id="sprints" className="relative w-full py-28 px-4 bg-[#F8F9FC] border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A0D17] mb-4">
          Transparent Scope. Fixed Timeline.
        </h2>
        <p className="text-base text-slate-600 max-w-xl mb-16 leading-relaxed">
          No vague hourly estimates or scope creep. Clear deliverables delivered within a strict 14-day execution envelope.
        </p>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left">
          {TIERS.map((t) => (
            <div
              key={t.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-[transform,box-shadow,border-color] duration-200 transform-gpu [backface-visibility:hidden] ${
                t.highlight
                  ? "bg-white border-2 border-[#004CE8] shadow-[0_20px_50px_rgba(0,76,232,0.12)] md:-translate-y-2.5"
                  : "bg-white border border-slate-200/90 shadow-[0_4px_24px_rgba(10,13,23,0.04)] hover:shadow-[0_12px_36px_rgba(10,13,23,0.08)] hover:border-slate-300"
              }`}
            >
              {/* Highlight Badge */}
              {t.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#004CE8] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3 h-3" />
                  <span>{t.badge}</span>
                </div>
              )}

              <div>
                {/* Duration & Target */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold tracking-wide uppercase bg-blue-50 text-[#004CE8] border border-blue-100/80 shrink-0">
                    {t.duration}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider text-right line-clamp-1">
                    {t.target}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xl sm:text-2xl font-black text-[#0A0D17] mb-4 tracking-tight leading-snug">
                  {t.name}
                </h3>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="text-2xl sm:text-3xl font-black text-[#0A0D17] font-mono tracking-tight">
                    {t.priceInr}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-600 font-mono">
                    <span className="text-slate-500">International:</span>
                    <span className="font-semibold text-slate-800">{t.priceUsd}</span>
                  </div>
                </div>

                {/* Feature List */}
                <div className="flex flex-col gap-3.5 mb-8">
                  {t.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-[13px] leading-snug">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                      </div>
                      <span className="text-slate-600">
                        <strong className="font-semibold text-[#0A0D17]">{feat.lead}:</strong>{" "}
                        {feat.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-auto pt-4">
                <a href="#intake" className="block w-full">
                  {t.highlight ? (
                    <button className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white cursor-pointer select-none
                      transform-gpu [backface-visibility:hidden]
                      transition-[transform,box-shadow,border-color,background-color] duration-150 ease-out
                      hover:-translate-y-0.5 active:translate-y-0
                      bg-[linear-gradient(180deg,#090D16_0%,#162032_45%,#455675_100%)]
                      border border-white/15 border-b-white/50
                      shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_3px_rgba(255,255,255,0.32),0_4px_14px_rgba(10,13,23,0.18)]
                      hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),inset_0_-1px_3px_rgba(255,255,255,0.48),0_8px_24px_rgba(10,13,23,0.25)]">
                      Select Launchpad Sprint →
                    </button>
                  ) : (
                    <button className="w-full py-3.5 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-bold uppercase tracking-wider transition-colors duration-150 cursor-pointer">
                      Select Scope →
                    </button>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
