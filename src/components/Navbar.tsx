"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Layers, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const SPRINT_ITEMS = [
  {
    title: "14-Day Launchpad",
    subtitle: "Full-Stack Production MVP",
    icon: Layers,
    href: "#sprints",
  },
  {
    title: "AI & Vector Core",
    subtitle: "pgvector Hybrid & RAG",
    icon: Sparkles,
    href: "#sprints",
  },
  {
    title: "Interface Sprint",
    subtitle: "Swiss Polish & WebGL",
    icon: Zap,
    href: "#sprints",
  },
];

export const Navbar: React.FC = () => {
  const [sprintsOpen, setSprintsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll depth with passive listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // When reaching near the end of the page, relax back to normal wide pill state
      const isAtBottom = windowHeight + scrollY >= documentHeight - 350;
      setIsScrolled(scrollY > 50 && !isAtBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setSprintsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSprintsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setSprintsOpen(false);
    if (href.startsWith("#")) {
      e.preventDefault();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }, 50);
    }
  };

  return (
    <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <div ref={navContainerRef} className="relative pointer-events-auto flex flex-col items-center">
        {/* Main Floating Capsule: Always a clean rounded-full pill */}
        <motion.div
          layout
          transition={{
            type: "spring",
            bounce: 0.08,
            duration: 0.35,
          }}
          className={cn(
            "rounded-full bg-white/95 backdrop-blur-2xl border flex items-center justify-between transition-colors",
            isScrolled
              ? "w-[min(580px,92vw)] py-1 pl-4 pr-2 border-slate-300/90 shadow-[0_10px_32px_rgba(10,13,23,0.08),0_2px_6px_rgba(10,13,23,0.03)]"
              : "w-[min(760px,94vw)] py-1.5 pl-5 pr-2.5 border-slate-200/90 shadow-[0_4px_20px_rgba(10,13,23,0.05),0_1px_3px_rgba(10,13,23,0.02)]"
          )}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 font-extrabold text-[16px] sm:text-[17px] tracking-tight text-[#0A0D17] hover:opacity-90 transition-opacity shrink-0"
            onClick={() => setSprintsOpen(false)}
          >
            <svg
              className="w-4 h-4 fill-[#0A0D17] transition-transform duration-300 group-hover:rotate-90 shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0C12 7.5 12 12 4.5 12C12 12 12 16.5 12 24C12 16.5 12 12 19.5 12C12 12 12 7.5 12 0Z" />
            </svg>
            <span>anvaya</span>
          </Link>

          {/* Notch Hyperlinks */}
          <div
            className={cn(
              "flex items-center shrink-0 relative",
              isScrolled ? "gap-1 sm:gap-1.5" : "gap-1 sm:gap-2.5"
            )}
          >
            {/* First Hyperlink: 14-Day Sprints with Simple Floating Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSprintsOpen(!sprintsOpen);
                }}
                className={cn(
                  "flex items-center gap-1 font-semibold rounded-full transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0",
                  isScrolled
                    ? "text-[12px] px-2.5 py-1"
                    : "text-xs sm:text-[13px] px-3 py-1.5",
                  sprintsOpen
                    ? "bg-slate-100 text-[#0A0D17]"
                    : "text-slate-600 hover:text-[#0A0D17] hover:bg-black/[0.04]"
                )}
              >
                <span>14-Day Sprints</span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 text-slate-500 transition-transform duration-200 ml-0.5",
                    sprintsOpen && "rotate-180 text-[#0A0D17]"
                  )}
                />
              </button>

              {/* Simple, Non-Bloated Floating Popover */}
              <AnimatePresence>
                {sprintsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full mt-2.5 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 w-64 sm:w-72 bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-1.5 shadow-[0_16px_40px_rgba(10,13,23,0.12),0_2px_8px_rgba(10,13,23,0.04)] z-50 overflow-hidden select-none"
                  >
                    <div className="flex flex-col gap-0.5">
                      {SPRINT_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.title}
                            href={item.href}
                            onClick={(e) => handleAnchorClick(e, item.href)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100/90 transition-colors group cursor-pointer text-left"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200/70 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-slate-300 transition-colors">
                                <Icon className="w-3.5 h-3.5 text-slate-700 group-hover:text-black" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-[#0A0D17] leading-tight truncate">
                                  {item.title}
                                </div>
                                <div className="text-[10.5px] text-slate-500 font-medium truncate mt-0.5">
                                  {item.subtitle}
                                </div>
                              </div>
                            </div>
                            <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-[#0A0D17] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Architecture Link */}
            <a
              href="#architecture"
              onClick={(e) => handleAnchorClick(e, "#architecture")}
              className={cn(
                "hidden sm:inline-flex font-semibold text-slate-600 hover:text-[#0A0D17] hover:bg-black/[0.04] rounded-full transition-colors duration-150 whitespace-nowrap",
                isScrolled
                  ? "text-[12px] px-2.5 py-1"
                  : "text-xs sm:text-[13px] px-3 py-1.5"
              )}
            >
              Architecture
            </a>

            {/* Proof of Work Link */}
            <a
              href="#proof"
              onClick={(e) => handleAnchorClick(e, "#proof")}
              className={cn(
                "hidden md:inline-flex font-semibold text-slate-600 hover:text-[#0A0D17] hover:bg-black/[0.04] rounded-full transition-colors duration-150 whitespace-nowrap",
                isScrolled
                  ? "text-[12px] px-2.5 py-1"
                  : "text-xs sm:text-[13px] px-3 py-1.5"
              )}
            >
              Proof of Work
            </a>
          </div>

          {/* Sculpted CTA Button with Bottom Light Shade (Replacing StarBorder) */}
          <div className="shrink-0 flex items-center">
            <a
              href="#intake"
              onClick={(e) => handleAnchorClick(e, "#intake")}
              className="group relative inline-flex items-center gap-2 rounded-full py-1.5 pl-4 pr-2 text-xs font-bold text-white cursor-pointer select-none
                transform-gpu [backface-visibility:hidden]
                transition-[transform,box-shadow,border-color,background-color] duration-150 ease-out
                hover:-translate-y-0.5 active:translate-y-0
                bg-[linear-gradient(180deg,#090D16_0%,#162032_45%,#455675_100%)]
                border border-white/15 border-b-white/50
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_3px_rgba(255,255,255,0.32),0_3px_10px_rgba(10,13,23,0.18)]
                hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),inset_0_-1px_3px_rgba(255,255,255,0.48),0_6px_20px_rgba(10,13,23,0.28)]"
            >
              <span className="tracking-tight text-white/95 font-semibold">Book Sprint</span>
              <span className="w-4.5 h-4.5 rounded-full bg-white/15 flex items-center justify-center text-[10px] group-hover:bg-white/25 transition-colors shrink-0">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </header>
  );
};
