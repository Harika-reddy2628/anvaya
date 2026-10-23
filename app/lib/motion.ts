"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const INTRO_KEY = "anvaya-intention-intro";
export const INTRO_DONE = "anvaya:intro-done";
export const EASE_OUT = "expo.out";
export const EASE_IN_OUT = "power4.inOut";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The loading transition plays once per session on Home only, never for reduced motion or deep links. */
export function introWillPlay(path: string) {
  if (typeof window === "undefined" || path !== "/" || location.hash || prefersReducedMotion()) return false;
  try { return sessionStorage.getItem(INTRO_KEY) !== "1"; } catch { return true; }
}

/** Resolves once the Home transition has released the page, or immediately when it will not play. */
export function afterIntro(path: string, callback: () => void) {
  if (!introWillPlay(path) || document.documentElement.dataset.intro === "done") { callback(); return () => {}; }
  let called = false;
  const run = () => { if (called) return; called = true; clearTimeout(fallback); callback(); };
  const fallback = setTimeout(run, 3200);
  window.addEventListener(INTRO_DONE, run, { once: true });
  return () => { called = true; clearTimeout(fallback); window.removeEventListener(INTRO_DONE, run); };
}
