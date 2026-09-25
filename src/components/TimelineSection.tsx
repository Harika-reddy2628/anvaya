"use client";

import React from "react";
import { FileCode, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";

interface Milestone {
  days: string;
  title: string;
  badge: string;
  deliverables: string[];
}

const MILESTONES: Milestone[] = [
  {
    days: "Days 01–03",
    title: "Architecture & Contracts",
    badge: "Phase 1",
    deliverables: [
      "System design diagram & data modeling",
      "OpenAPI 3.1 typed schema definition",
      "PostgreSQL tables & pgvector index configuration",
      "CI/CD pipeline and GitHub repository initialization",
    ],
  },
  {
    days: "Days 04–09",
    title: "Core Full-Stack Engine",
    badge: "Phase 2",
    deliverables: [
      "Next.js 16 App Router UI components & state stores",
      "FastAPI or Node.js asynchronous business logic",
      "Real-time database queries & caching layer",
      "Automated unit & integration regression tests",
    ],
  },
  {
    days: "Days 10–12",
    title: "Integrations & Intelligence",
    badge: "Phase 3",
    deliverables: [
      "Authentication flows (Clerk / Supabase)",
      "Payment gateways (Stripe / Razorpay webhooks)",
      "pgvector similarity indexing & LLM function routes",
      "Email / notification transactional triggers",
    ],
  },
  {
    days: "Days 13–14",
    title: "Hardening & IP Handoff",
    badge: "Phase 4",
    deliverables: [
      "Docker container optimization & health checks",
      "Cloudflare Zero Trust edge ingress configuration",
      "Full GitHub admin rights & IP transfer agreement",
      "Production walkthrough & 30-day warranty initiation",
    ],
  },
];

export const TimelineSection: React.FC = () => {
  return (
    <section className="relative w-full py-28 px-4 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A0D17] text-center mb-4">
          How We Ship In 14 Days
        </h2>
        <p className="text-base text-slate-500 text-center max-w-xl mb-16 leading-relaxed">
          Daily commits, continuous staging previews, and direct senior builder access at every phase.
        </p>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
          {MILESTONES.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#F8F9FC] border border-slate-200/80 flex flex-col justify-between hover:border-slate-300 transition-colors duration-150 shadow-sm"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4 font-mono text-xs">
                  <span className="font-bold text-[#004CE8]">{m.days}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500 font-bold">
                    {m.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0A0D17] mb-4">{m.title}</h3>

                {/* Deliverables */}
                <div className="flex flex-col gap-2.5">
                  {m.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <span className="text-[#004CE8] font-bold shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Stage 0{idx + 1}</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
