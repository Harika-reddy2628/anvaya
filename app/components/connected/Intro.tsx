"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function Intro({ children }: { children: ReactNode }) {
  const path = usePathname();
  const screen = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const finishRef = useRef<() => void>(() => {});
  useEffect(() => {
    const overlay = screen.current;
    const underlying = content.current;
    if (!overlay || !underlying || path !== "/") return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let seen = false;
    try { seen = sessionStorage.getItem("anvaya-intention-intro") === "1"; } catch { /* Storage is optional. */ }
    if (seen || preference.matches || location.hash) return;
    let finished = false;
    const overflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const counter = { value: 0 };
    overlay.hidden = false;
    underlying.inert = true;
    document.body.style.overflow = "hidden";
    overlay.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    const timeline = gsap.timeline();
    function finish() {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      timeline.kill();
      const hadFocus = overlay!.contains(document.activeElement) || document.activeElement === document.body;
      overlay!.hidden = true;
      underlying!.inert = false;
      document.body.style.overflow = overflow;
      try { sessionStorage.setItem("anvaya-intention-intro", "1"); } catch { /* Storage is optional. */ }
      if (hadFocus) {
        const target = previousFocus && previousFocus !== document.body ? previousFocus : underlying!.querySelector<HTMLElement>("main");
        target?.focus({ preventScroll: true });
        // WebKit may defer clearing inherited inert state until the next frame.
        requestAnimationFrame(() => { if (document.activeElement === document.body || overlay!.contains(document.activeElement)) target?.focus({ preventScroll: true }); });
      }
    }
    finishRef.current = finish;
    const timeout = setTimeout(finish, 2700);
    timeline.fromTo(overlay.querySelector("path"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.7, ease: "power2.inOut" }, 0);
    timeline.to(counter, { value: 100, duration: 1.7, ease: "none", onUpdate: () => { const output = overlay.querySelector("output"); if (output) output.textContent = `${Math.round(counter.value)}%`; } }, 0);
    timeline.to(overlay, { opacity: 0, duration: .35, onComplete: finish }, 1.85);
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); if (event.key === "Tab") { event.preventDefault(); overlay.querySelector<HTMLButtonElement>("button")?.focus(); } };
    const changed = () => { if (preference.matches) finish(); };
    window.addEventListener("keydown", key);
    preference.addEventListener("change", changed);
    return () => { finish(); window.removeEventListener("keydown", key); preference.removeEventListener("change", changed); finishRef.current = () => {}; };
  }, [path]);
  return <><div ref={screen} className="intro-screen" hidden role="dialog" aria-modal="true" aria-label="Preparing the Anvaya experience"><div className="intro-top"><span>ANVAYA</span><button type="button" onClick={() => finishRef.current()}>Skip intro ↗</button></div><div className="intro-center"><svg viewBox="0 0 500 180" aria-hidden="true"><path d="M250 90H500" pathLength="1" strokeDasharray="1" strokeDashoffset="1" /><circle cx="250" cy="90" r="5" /></svg><p>BUILDING WITH INTENTION</p></div><div className="intro-bottom"><span>PREPARING THE EXPERIENCE</span><output aria-label="Transition progress">0%</output></div></div><div ref={content}>{children}</div></>;
}
