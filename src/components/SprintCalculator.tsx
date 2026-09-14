"use client";

import React, { useState } from "react";
import {
  Check,
  Clock,
  Layers,
  ShieldCheck,
  Database,
  Sparkles,
  Bot,
  CreditCard,
  Cloud,
  Lock,
  Calculator,
  CheckCircle2,
} from "lucide-react";

interface FeatureOption {
  id: string;
  name: string;
  category: string;
  days: number;
  costInr: number;
  defaultChecked?: boolean;
  shortTag: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FEATURE_OPTIONS: FeatureOption[] = [
  {
    id: "core",
    name: "Full-Stack Next.js 16 + FastAPI Base Architecture",
    category: "Core Engine",
    days: 4,
    costInr: 60000,
    defaultChecked: true,
    shortTag: "Next.js + FastAPI",
    icon: Layers,
  },
  {
    id: "auth",
    name: "User Authentication & Role-Based Access (Clerk / Supabase)",
    category: "Security",
    days: 2,
    costInr: 25000,
    defaultChecked: true,
    shortTag: "Clerk / Supabase Auth",
    icon: ShieldCheck,
  },
  {
    id: "db",
    name: "PostgreSQL Database with Typed ORM & Migrations",
    category: "Data Layer",
    days: 2,
    costInr: 25000,
    defaultChecked: true,
    shortTag: "Postgres + ORM",
    icon: Database,
  },
  {
    id: "pgvector",
    name: "pgvector Hybrid Semantic Vector Retrieval (HNSW Indexing)",
    category: "AI & Intelligence",
    days: 2,
    costInr: 35000,
    defaultChecked: false,
    shortTag: "pgvector HNSW",
    icon: Sparkles,
  },
  {
    id: "agents",
    name: "Structured LLM Tool Calling & Automated Background Workflows",
    category: "AI & Intelligence",
    days: 2,
    costInr: 30000,
    defaultChecked: false,
    shortTag: "LLM Tool Calling",
    icon: Bot,
  },
  {
    id: "payments",
    name: "Stripe / Razorpay Checkout & Webhook Settlement Engine",
    category: "Monetization",
    days: 1,
    costInr: 20000,
    defaultChecked: false,
    shortTag: "Stripe / Razorpay",
    icon: CreditCard,
  },
  {
    id: "infra",
    name: "Docker Hardening & Cloudflare Zero Trust Edge Ingress",
    category: "Deployment",
    days: 1,
    costInr: 20000,
    defaultChecked: true,
    shortTag: "Docker + Cloudflare Edge",
    icon: Cloud,
  },
];

export const SprintCalculator: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    FEATURE_OPTIONS.filter((f) => f.defaultChecked).map((f) => f.id)
  );

  const toggleFeature = (id: string) => {
    // Keep 'core' always selected as foundation
    if (id === "core") return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedFeatures = FEATURE_OPTIONS.filter((f) => selectedIds.includes(f.id));
  const rawDays = selectedFeatures.reduce((acc, f) => acc + f.days, 0);
  // Enforce strict 10-14 day sprint window
  const totalDays = Math.min(14, Math.max(10, rawDays));
  const totalInr = selectedFeatures.reduce((acc, f) => acc + f.costInr, 0);
  const totalUsd = Math.round(totalInr / 83);

  return (
    <section id="calculator" className="relative w-full py-28 px-4 bg-[#F8F9FC] border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A0D17] text-center mb-4">
          Calculate Your Exact Sprint
        </h2>
        <p className="text-base text-slate-600 text-center max-w-xl mb-14 leading-relaxed">
          Select your required system components to calculate live delivery timelines and budget.
        </p>

        {/* Calculator Body */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Options List (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {FEATURE_OPTIONS.map((feat) => {
              const isSelected = selectedIds.includes(feat.id);
              const isLocked = feat.id === "core";
              const IconComponent = feat.icon;

              return (
                <div
                  key={feat.id}
                  onClick={() => toggleFeature(feat.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? "bg-white border-2 border-[#004CE8] shadow-[0_4px_20px_rgba(0,76,232,0.08)]"
                      : "bg-white/80 border-slate-200/90 hover:bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Checkbox Indicator */}
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-[#004CE8] text-white"
                          : "border border-slate-300 bg-slate-50 group-hover:border-slate-400"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    {/* Icon Badge */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-blue-50 text-[#004CE8] border border-blue-100"
                          : "bg-slate-100 text-slate-500 border border-slate-200/60 group-hover:bg-slate-200/60"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    {/* Text Details */}
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                          {feat.category}
                        </span>
                        {isLocked && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-600 border border-slate-200">
                            <Lock className="w-2.5 h-2.5" />
                            Foundation
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-bold text-[#0A0D17] mt-0.5 leading-snug">
                        {feat.name}
                      </div>
                    </div>
                  </div>

                  {/* Price & Days Tag */}
                  <div className="text-right shrink-0 font-mono text-xs pl-3">
                    <div className="font-bold text-[#0A0D17]">
                      +₹{feat.costInr.toLocaleString()}
                    </div>
                    <div className="mt-1">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          isSelected
                            ? "bg-blue-50 text-[#004CE8] border border-blue-100"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        +{feat.days}d
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Estimate Card (Right) */}
          <div className="lg:col-span-5 sticky top-24 rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(0,76,232,0.08),0_4px_16px_rgba(10,13,23,0.04)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Top Accent Gradient Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#004CE8] via-blue-500 to-indigo-600 absolute top-0 left-0" />

            <div>
              {/* Header Specification Row */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-500 tracking-wider uppercase">
                  <Calculator className="w-3.5 h-3.5 text-[#004CE8]" />
                  <span>Sprint Specification</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#004CE8] font-mono text-[11px] font-bold">
                  {selectedIds.length} modules selected
                </span>
              </div>

              {/* Delivery Envelope Output */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#004CE8]" />
                  <span>Delivery Envelope</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-[#0A0D17] tracking-tight">
                  {totalDays} Production Days
                </div>

                {/* Progress bar visualizer */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                    <span>Execution Window</span>
                    <span className="font-bold text-[#004CE8]">{totalDays} / 14 Days</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#004CE8] transition-all duration-300"
                      style={{ width: `${(totalDays / 14) * 100}%` }}
                    />
                  </div>
                </div>

                {/* SLA Guarantee badge */}
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-lg px-2.5 py-1.5 mt-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Guaranteed fixed-timeline SLA</span>
                </div>
              </div>

              {/* Price Output */}
              <div className="mb-6 pt-6 border-t border-slate-100">
                <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-1">
                  Total Fixed Investment
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-[#0A0D17] tracking-tight">
                  ₹{totalInr.toLocaleString()}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs font-mono text-slate-600">
                  <span className="text-slate-500">International:</span>
                  <span className="font-bold text-slate-800">~${totalUsd.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Selected Modules Quick Chips */}
              <div className="mb-8 pt-4 border-t border-slate-100">
                <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Active Modules
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFeatures.map((f) => (
                    <span
                      key={f.id}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200/80"
                    >
                      {f.shortTag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action */}
            <div>
              <a href="#intake" className="block w-full">
                <button
                  className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white cursor-pointer select-none
                  transform-gpu [backface-visibility:hidden]
                  transition-[transform,box-shadow,border-color,background-color] duration-150 ease-out
                  hover:-translate-y-0.5 active:translate-y-0
                  bg-[linear-gradient(180deg,#090D16_0%,#162032_45%,#455675_100%)]
                  border border-white/15 border-b-white/50
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_3px_rgba(255,255,255,0.32),0_4px_14px_rgba(10,13,23,0.18)]
                  hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),inset_0_-1px_3px_rgba(255,255,255,0.48),0_8px_24px_rgba(10,13,23,0.25)] flex items-center justify-center gap-2"
                >
                  <span>Reserve This Exact Sprint</span>
                  <span>→</span>
                </button>
              </a>
              <div className="text-[11px] text-center font-mono text-slate-500 mt-3">
                Includes 100% Day-1 IP Handoff + 30-Day Warranty
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
