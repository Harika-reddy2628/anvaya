"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How can you ship production software in 14 days without cutting corners?",
    answer:
      "Traditional agencies lose 70% of their billable hours to account managers, fragmented slide decks, and outsourced junior developers. At Anvaya, you interface directly with lead system architects. We deploy battle-tested modular templates, schema-first OpenAPI contracts, and automated CI/CD pipelines that eliminate boilerplate lag entirely.",
  },
  {
    question: "What does '100% Day-1 IP Ownership' mean?",
    answer:
      "From the moment sprint agreements are signed, your organization owns 100% of all intellectual property, source code, database migrations, and infrastructure scripts. You receive immediate GitHub admin repository access. We never hold code hostage or charge recurring agency retainers.",
  },
  {
    question: "Who will I be communicating with during the sprint?",
    answer:
      "You communicate directly with the senior engineer and architect building your system via a dedicated private Slack or Discord channel. Zero account managers, zero sales middlemen, zero telephone games.",
  },
  {
    question: "What happens after the 14-day sprint is delivered?",
    answer:
      "Every production sprint includes a comprehensive 30-day post-launch warranty. If any bug, edge case, or regression arises within the original scope, we fix it immediately at zero cost. We also provide full documentation and an architectural handover video for your team.",
  },
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full py-28 px-4 bg-white border-b border-slate-200/80">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Title & Description */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A0D17] text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-base text-slate-500 text-center max-w-lg mb-16 leading-relaxed">
          Everything you need to know about our sprint execution model and commitments.
        </p>

        {/* FAQ Accordion List */}
        <div className="w-full flex flex-col gap-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-[background-color,border-color,box-shadow] duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#F8F9FC] border-[#004CE8] shadow-sm"
                    : "bg-white border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 select-none"
                >
                  <span className="text-base font-bold text-[#0A0D17] leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-blue-100 text-[#004CE8]" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-200/50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
