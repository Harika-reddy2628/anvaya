"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

/** The site's smooth-scroll instance, owned by MotionLayer; null without motion. Read it when needed, not at mount. */
let smoothScroll: Lenis | null = null;
export const setSmoothScroll = (lenis: Lenis | null) => { smoothScroll = lenis; };
export const getSmoothScroll = () => smoothScroll;

export const INTRO_KEY = "anvaya-intention-intro";
export const INTRO_DONE = "anvaya:intro-done";
export const EASE_OUT = "expo.out";
export const EASE_IN_OUT = "power4.inOut";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
/** Is this the home page? Accepts the router's path ("/") and the browser's, which carries the static host's base path. */
const isHome = (path: string) => (BASE && path.startsWith(BASE) ? path.slice(BASE.length) : path).replace(/\/+$/, "") === "";
/** In memory only, so it resets on every page load: the opening plays each time the site is opened, but not again when
    the reader navigates back to Home inside the same load. */
let introPlayed = false;
export const markIntroPlayed = () => { introPlayed = true; };

/** The loading transition plays every time the site is opened on Home, never for reduced motion or deep links. The
    session key is no longer written; it stays readable only so tests and previews can switch the opening off. */
export function introWillPlay(path: string) {
  if (typeof window === "undefined" || !isHome(path) || location.hash || prefersReducedMotion() || introPlayed) return false;
  try { return sessionStorage.getItem(INTRO_KEY) !== "1"; } catch { return true; }
}

/** Resolves once the Home transition has released the page, or immediately when it will not play. */
export function afterIntro(path: string, callback: () => void) {
  if (!introWillPlay(path) || document.documentElement.dataset.intro === "done") { callback(); return () => {}; }
  let called = false;
  const run = () => { if (called) return; called = true; clearTimeout(fallback); callback(); };
  const fallback = setTimeout(run, 4800);
  window.addEventListener(INTRO_DONE, run, { once: true });
  return () => { called = true; clearTimeout(fallback); window.removeEventListener(INTRO_DONE, run); };
}
