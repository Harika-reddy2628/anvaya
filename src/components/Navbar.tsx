"use client";

import React, { useState, useEffect, useRef, useCallback, useId } from "react";
import Link from "next/link";
import { LayoutGroup, motion } from "framer-motion";
import {
  Layers,
  Sparkles,
  ChevronDown,
  ArrowUpRight,
  Check,
  Cpu,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NotchLeftWing,
  NotchRightWing,
  NotchCornerLeftWing,
  NotchCornerRightWing,
} from "@/components/ui/adaptive-notch-navigation-bar";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "sprints", label: "Work", href: "#sprints", icon: Layers, badge: "14 Days" },
  { id: "proof", label: "Craft", href: "#proof", icon: Cpu },
  { id: "calculator", label: "Services", href: "#calculator", icon: Sparkles },
  { id: "faq", label: "Info", href: "#faq", icon: HelpCircle },
  { id: "intake", label: "Hello", href: "#intake", icon: MessageSquare },
];

export const Navbar: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("sprints");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const layoutGroupId = useId();

  // Handle smooth anchor scroll
  const handleSelect = useCallback((id: string, href: string) => {
    setActiveId(id);
    setIsDropdownOpen(false);

    if (href.startsWith("#")) {
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }, 50);
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const activeItem = NAV_ITEMS.find((item) => item.id === activeId) || NAV_ITEMS[0];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none font-sans">
      {/* ========================================================================= */}
      {/* 1. DESKTOP ADAPTIVE NOTCH TRIPARTITE LAYOUT (>= 1280px)                   */}
      {/* ========================================================================= */}

      {/* Desktop Left Logo Notch */}
      <aside
        aria-label="Brand logo notch"
        className={cn(
          "hidden xl:flex absolute left-0 top-0 z-50 h-11 px-5 items-center bg-black text-white border-b border-r border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
          "rounded-br-[24px] pointer-events-auto"
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2 text-white hover:opacity-95 transition-opacity"
        >
          <svg
            className="w-3.5 h-3.5 fill-white transition-transform duration-300 group-hover:rotate-90 shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 0C12 7.5 12 12 4.5 12C12 12 12 16.5 12 24C12 16.5 12 12 19.5 12C12 12 12 7.5 12 0Z" />
          </svg>
          <span className="font-semibold text-sm tracking-[-0.02em] text-white">anvaya</span>
          <span className="text-[10px] font-medium tracking-wider text-zinc-400 uppercase">studio</span>
        </Link>

        {/* Outer Fillet Wings */}
        <NotchRightWing position="top" className="text-black" />
        <NotchCornerLeftWing position="top" className="text-black" />
      </aside>

      {/* Desktop Center Navigation Notch */}
      <header
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          "hidden xl:flex absolute left-1/2 -translate-x-1/2 top-0 z-50 h-11 px-3.5 items-center bg-black text-white border-b border-x border-white/10 shadow-[0_10px_32px_rgba(0,0,0,0.35)]",
          "rounded-b-[24px] pointer-events-auto"
        )}
      >
        <NotchLeftWing position="top" className="text-black" />
        <NotchRightWing position="top" className="text-black" />

        <LayoutGroup id={layoutGroupId}>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeId;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelect(item.id, item.href)}
                  className={cn(
                    "relative flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[13px] font-medium tracking-[-0.01em] transition-colors outline-none",
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06]"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="notch-active-pill"
                      className="absolute inset-0 rounded-full bg-zinc-800/90 border border-white/15 shadow-xs"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className={cn("size-3.5", isActive ? "text-white" : "text-zinc-500")} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-white/10 border border-white/10 px-1.5 py-0.2 text-[9px] font-medium text-zinc-300 tracking-tight uppercase">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </header>

      {/* Desktop Right Action Notch */}
      <aside
        aria-label="User actions notch"
        className={cn(
          "hidden xl:flex absolute right-0 top-0 z-50 h-11 px-4 items-center gap-2.5 bg-black text-white border-b border-l border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
          "rounded-bl-[24px] pointer-events-auto"
        )}
      >
        <NotchLeftWing position="top" className="text-black" />
        <NotchCornerRightWing position="top" className="text-black" />

        <button
          onClick={() => handleSelect("intake", "#intake")}
          className="group flex h-7.5 items-center gap-1.5 rounded-full bg-white text-zinc-950 px-3.5 text-xs font-semibold tracking-[-0.01em] shadow-sm hover:bg-zinc-100 transition-all cursor-pointer"
        >
          <span>Say Hello</span>
          <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </aside>

      {/* ========================================================================= */}
      {/* 2. TABLET & MOBILE VIEW (< 1280px): COMPACT NOTCH ISLAND                  */}
      {/* ========================================================================= */}
      <div
        ref={containerRef}
        className={cn(
          "xl:hidden absolute top-0 left-1/2 -translate-x-1/2 z-50 flex flex-col bg-black text-white border-b border-x border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.4)]",
          "w-auto max-w-[94vw] px-3.5 rounded-b-[24px] pointer-events-auto"
        )}
      >
        <NotchLeftWing position="top" className="text-black" />
        <NotchRightWing position="top" className="text-black" />

        {/* Compact Bar */}
        <div className="flex h-10 items-center justify-between gap-3 sm:gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 font-semibold text-xs tracking-[-0.02em] text-white shrink-0"
          >
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
              <path d="M12 0C12 7.5 12 12 4.5 12C12 12 12 16.5 12 24C12 16.5 12 12 19.5 12C12 12 12 7.5 12 0Z" />
            </svg>
            <span>anvaya</span>
          </Link>

          {/* Trigger Dropdown Button */}
          <button
            type="button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex h-7.5 items-center gap-1.5 rounded-full bg-zinc-900/90 px-3 text-xs font-medium text-zinc-200 hover:bg-zinc-850 transition-colors border border-white/10"
          >
            {activeItem?.icon && <activeItem.icon className="size-3 text-zinc-300" />}
            <span>{activeItem?.label}</span>
            <ChevronDown
              className={cn(
                "size-3 text-zinc-400 transition-transform duration-200",
                isDropdownOpen && "rotate-180"
              )}
            />
          </button>

          {/* CTA */}
          <button
            onClick={() => handleSelect("intake", "#intake")}
            className="flex h-7 items-center gap-1 rounded-full bg-white text-zinc-950 px-2.5 text-[11px] font-semibold shadow-xs hover:bg-zinc-100 transition-colors shrink-0"
          >
            <span>Talk</span>
            <ArrowUpRight className="size-2.5" />
          </button>
        </div>

        {/* Expandable Dropdown Drawer */}
        <div
          role="listbox"
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-200 ease-out w-full",
            isDropdownOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0 pointer-events-none"
          )}
        >
          <div className="overflow-hidden">
            <div className="flex w-full flex-col gap-1 pt-1.5 pb-2.5 border-t border-white/10 mt-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isSelected = item.id === activeId;

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(item.id, item.href)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors",
                      isSelected
                        ? "bg-zinc-800 text-white font-semibold border border-white/10"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={cn("size-3.5", isSelected ? "text-white" : "text-zinc-400")} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="rounded bg-white/10 px-1 py-0.2 text-[9px] text-zinc-300 font-mono">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="size-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
