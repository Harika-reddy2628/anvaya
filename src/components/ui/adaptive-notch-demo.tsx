"use client";

import { useState } from "react";

import {
  Activity,
  ArrowDownUp,
  BarChart2,
  Command,
  Eye,
  EyeOff,
  Layers,
  LogOut,
  Sparkles,
  User,
  Users,
} from "lucide-react";

import type {
  NotchItemData,
  NotchPosition,
} from "@/components/ui/adaptive-notch-navigation-bar";

import { NotchNav } from "@/components/ui/adaptive-notch-navigation-bar";

const NAV_ITEMS: NotchItemData[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart2 },
  { id: "profiles", label: "Profiles", icon: Users },
  { id: "funnels", label: "Funnels", icon: Layers },
  { id: "performance", label: "Performance", icon: Activity },
  { id: "realtime", label: "Realtime", icon: Sparkles, badge: "Live" },
];

export default function NotchNavDemo() {
  const [activeId, setActiveId] = useState<string>("dashboard");

  const [position, setPosition] = useState<NotchPosition>("top");

  const [showLogo, setShowLogo] = useState<boolean>(true);

  const [showRightContent, setShowRightContent] = useState<boolean>(true);

  const handleActiveChange = (id: string) => {
    setActiveId(id);
  };

  const handleTogglePosition = () => {
    setPosition((prev) => (prev === "top" ? "bottom" : "top"));
  };

  const handleToggleLogo = () => {
    setShowLogo((prev) => !prev);
  };

  const handleToggleRightContent = () => {
    setShowRightContent((prev) => !prev);
  };

  const handleSignOut = () => {
    console.log("Sign out triggered");
  };

  const LogoSlot = (
    <div className="flex items-center gap-1.5 sm:gap-2 h-8.5">
      <div className="flex size-7 items-center justify-center rounded-lg bg-zinc-800 dark:bg-zinc-300">
        <Command className="size-4 text-zinc-50 dark:text-zinc-950" />
      </div>

      <span className="hidden sm:inline text-xs sm:text-sm font-bold tracking-tight">
        Acme
      </span>
    </div>
  );

  const RightContentSlot = (
    <div className="flex items-center gap-1.5 sm:gap-2 h-8.5">
      <div className="hidden sm:flex size-7 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 dark:bg-zinc-300 dark:text-zinc-800">
        <User className="size-4" />
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        aria-label="Sign out"
        className="cursor-pointer items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 flex dark:text-zinc-600 dark:hover:text-zinc-900 outline-none"
      >
        <span className="hidden sm:inline">Sign out</span>

        <LogOut className="size-4 sm:size-3.5" />
      </button>
    </div>
  );

  return (
    <NotchNav
      items={NAV_ITEMS}
      activeId={activeId}
      position={position}
      logo={LogoSlot}
      rightContent={RightContentSlot}
      showLogo={showLogo}
      showRightContent={showRightContent}
      onActiveChange={handleActiveChange}
    >
      <div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-2xl border border-border bg-card p-5 text-center shadow-xs">
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-muted-foreground">
            Active Tab
          </span>

          <p className="text-lg font-bold text-foreground capitalize">
            {activeId}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <button
            type="button"
            onClick={handleTogglePosition}
            className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground shadow-xs transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring outline-none"
          >
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <ArrowDownUp className="size-3.5" />
              Position
            </span>

            <span className="font-bold text-foreground capitalize">
              {position}
            </span>
          </button>

          <div className="mt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleLogo}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2 text-[11px] font-semibold text-foreground shadow-xs transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring outline-none"
            >
              {showLogo ? (
                <Eye className="size-3 text-emerald-500" />
              ) : (
                <EyeOff className="size-3 text-muted-foreground" />
              )}
              Logo Notch
            </button>

            <button
              type="button"
              onClick={handleToggleRightContent}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2 text-[11px] font-semibold text-foreground shadow-xs transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring outline-none"
            >
              {showRightContent ? (
                <Eye className="size-3 text-emerald-500" />
              ) : (
                <EyeOff className="size-3 text-muted-foreground" />
              )}
              Action Notch
            </button>
          </div>
        </div>
      </div>
    </NotchNav>
  );
}
