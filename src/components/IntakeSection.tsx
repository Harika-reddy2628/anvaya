"use client";

import React, { useState } from "react";
import CurvedInput from "@/components/CurvedInput";
import { CheckCircle2 } from "lucide-react";

export const IntakeSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (value?: string) => {
    const val = (value || email).trim();
    if (!val || !val.includes("@") || !val.includes(".")) {
      setError("Please provide a valid work email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section id="intake" className="relative w-full py-28 px-4 bg-[#F8F9FC] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative">
        {/* Directional Curled Arrow pointing from Headline to Curved Input Button */}
        <svg
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none select-none z-20"
          viewBox="0 0 896 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Curled / Twirled Trajectory Path */}
          <path
            d="M 788 42 C 850 30, 880 70, 860 110 C 840 145, 785 130, 790 95 C 795 65, 840 85, 840 125 C 840 160, 785 180, 725 192"
            stroke="#004CE8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 3.5"
          />
          {/* Precision Arrowhead pointing at Reserve Sprint Button */}
          <path
            d="M 740 183 L 723 192 L 738 200"
            stroke="#004CE8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A0D17] text-center mb-4">
          Let&apos;s build your system.
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-xl text-center mb-14 md:mb-16 leading-relaxed mx-auto">
          Accepting Q4 sprint intake. Enter your work email or brief to reserve direct senior builder access.
        </p>

        {/* Submission Confirmation or Curved Input */}
        <div className="w-full flex flex-col items-center justify-center">
          {submitted ? (
            <div className="w-full max-w-md p-8 rounded-3xl bg-white border border-emerald-500/30 shadow-[0_20px_50px_rgba(16,185,129,0.12)] flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0A0D17] mb-2">
                Sprint Reservation Received
              </h3>
              <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
                Anvaya senior system architects will review your intake and deliver a 1-page sprint proposal within 24 hours.
              </p>
              <div className="px-4 py-2 rounded-full bg-slate-100 font-mono text-xs text-slate-600 font-bold">
                Assigned Architect: Dhanush S. (Lead Systems)
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center">
              {/* React Bits Curved Input: Perfectly Centered */}
              <div className="w-full flex justify-center items-center">
                <CurvedInput
                  theme="light"
                  placeholder="Enter work email for 14-day sprint intake..."
                  buttonText="Reserve Sprint →"
                  buttonColor="#004CE8"
                  buttonTextColor="#FFFFFF"
                  backgroundColor="#FFFFFF"
                  borderColor="#CBD5E1"
                  textColor="#0A0D17"
                  placeholderColor="#94A3B8"
                  width={580}
                  height={60}
                  bend={8}
                  fontSize={15}
                  value={email}
                  onChange={(v: string) => {
                    setEmail(v);
                    if (error) setError("");
                  }}
                  onSubmit={(val: string) => handleSubmit(val)}
                  className="mx-auto"
                />
              </div>

              {error && (
                <p className="mt-3 text-xs font-mono font-bold text-red-500 text-center">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
