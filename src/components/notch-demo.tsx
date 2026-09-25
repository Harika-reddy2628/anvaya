"use client";
import React, { useState } from "react";
import { Notch, type NotchItem } from "@/components/ui/notch";
import { cn } from "@/lib/utils";

const COLORS = [
  { id: "#3b82f6", label: "Blue" },
  { id: "#8b5cf6", label: "Violet" },
  { id: "#10b981", label: "Emerald" },
  { id: "#f43f5e", label: "Rose" },
];

const ALIGNMENTS = [
  { id: "left", label: "Left" },
  { id: "center", label: "Center" },
  { id: "right", label: "Right" },
];

export default function NotchDemo() {
  const [bg, setBg] = useState("#3b82f6");
  const [align, setAlign] = useState<"left" | "center" | "right">("center");

  const items: NotchItem[] = [
    {
      id: "background",
      label: "Background",
      options: COLORS,
      value: bg,
      onChange: (id) => setBg(id),
    },
    {
      id: "alignment",
      label: "Alignment",
      options: ALIGNMENTS,
      value: align,
      onChange: (id) => setAlign(id as "left" | "center" | "right"),
    },
  ];

  const alignClass =
    align === "left"
      ? "items-start text-left"
      : align === "right"
        ? "items-end text-right"
        : "items-center text-center";

  return (
    <div className="relative flex min-h-screen w-full translate-z-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-950 [&_.fixed]:absolute">
      <div
        className={cn(
          `relative flex w-80 flex-col justify-center gap-2 overflow-hidden rounded-2xl px-1 pt-1 pb-8 text-white shadow-xl transition-colors duration-300`,
          alignClass,
        )}
      >
        <div
          style={{ background: bg }}
          className={cn(
            "absolute inset-0 mask-t-from-10% transition-colors duration-300",
          )}
        ></div>
        <img
          src="https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="The serenity of the sea"
          className="relative z-20 h-full w-full rounded-xl object-cover shadow-2xl"
        />
        <div className="px-4">
          <h3 className="relative mt-4 text-xl font-semibold">
            The serenity of the sea
          </h3>
          <p className="relative text-sm text-white/80">
            Use the notch below to change my background color and text
            alignment.
          </p>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 text-neutral-600 sm:bottom-20 sm:gap-2 dark:text-neutral-300">
        <svg
          viewBox="0 0 120 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-14 w-20 sm:h-20 sm:w-30"
        >
          <path d="M110 18 C70 0, 20 20, 12 60" strokeDasharray="6 6" />
          <path d="M4 48l8 14" />
          <path d="M28 56l-16 6" />
        </svg>
        <span className="text-xs font-medium sm:text-sm">Click over here</span>
      </div>

      <Notch items={items} position="bottom" />
    </div>
  );
}
