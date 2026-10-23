"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { INTRO_DONE, INTRO_KEY, gsap, introWillPlay } from "../../lib/motion";
import { Wordmark } from "./Logo";

const title = "Anvaya".split("");

export function Intro({ children }: { children: ReactNode }) {
  const path = usePathname();
  const screen = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const finishRef = useRef<() => void>(() => {});
  useEffect(() => {
    const overlay = screen.current;
    const underlying = content.current;
    if (!overlay || !underlying || !introWillPlay(path)) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let finished = false;
    const overflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const counter = { value: 0 };
    const root = document.documentElement;
    root.dataset.intro = "playing";
    overlay.hidden = false;
    underlying.inert = true;
    document.body.style.overflow = "hidden";
    overlay.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    const q = gsap.utils.selector(overlay);
    const output = overlay.querySelector("output");
    const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });
    function finish() {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      timeline.kill();
      const hadFocus = overlay!.contains(document.activeElement) || document.activeElement === document.body;
      overlay!.hidden = true;
      gsap.set(overlay, { clearProps: "all" });
      underlying!.inert = false;
      document.body.style.overflow = overflow;
      root.dataset.intro = "done";
      try { sessionStorage.setItem(INTRO_KEY, "1"); } catch { /* Storage is optional. */ }
      window.dispatchEvent(new Event(INTRO_DONE));
      if (hadFocus) {
        const target = previousFocus && previousFocus !== document.body ? previousFocus : underlying!.querySelector<HTMLElement>("main");
        target?.focus({ preventScroll: true });
        // WebKit may defer clearing inherited inert state until the next frame.
        requestAnimationFrame(() => { if (document.activeElement === document.body || overlay!.contains(document.activeElement)) target?.focus({ preventScroll: true }); });
      }
    }
    finishRef.current = finish;
    // Nominal 2.3s; the safeguard keeps the whole transition under three seconds.
    const timeout = setTimeout(finish, 2700);
    timeline
      .fromTo(q(".intro-char > span"), { yPercent: 105 }, { yPercent: 0, duration: 1.1, stagger: .055, ease: "power4.out" }, .1)
      .fromTo(q(".intro-row, .intro-kicker, .intro-indic"), { autoAlpha: 0 }, { autoAlpha: 1, duration: .6, stagger: .08, ease: "power2.out" }, 0)
      .fromTo(q(".intro-line i"), { scaleX: 0 }, { scaleX: 1, duration: 1.55, ease: "power1.inOut" }, .05)
      .to(counter, { value: 100, duration: 1.55, ease: "power1.inOut", onUpdate: () => { if (output) output.textContent = String(Math.round(counter.value)).padStart(3, "0"); } }, .05)
      .to(q(".intro-char > span"), { yPercent: -105, duration: .5, stagger: .03, ease: "power3.in" }, 1.62)
      .to(overlay, { clipPath: "inset(0% 0% 100% 0%)", duration: .62, ease: "power4.inOut", onComplete: finish }, 1.68);
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); if (event.key === "Tab") { event.preventDefault(); overlay.querySelector<HTMLButtonElement>("button")?.focus(); } };
    const changed = () => { if (preference.matches) finish(); };
    window.addEventListener("keydown", key);
    preference.addEventListener("change", changed);
    return () => { finish(); window.removeEventListener("keydown", key); preference.removeEventListener("change", changed); finishRef.current = () => {}; };
  }, [path]);
  return <><div ref={screen} className="intro-screen" hidden role="dialog" aria-modal="true" aria-label="Preparing the Anvaya experience">
    <div className="intro-row"><Wordmark /><button type="button" className="pill" onClick={() => finishRef.current()}>Skip intro ↗</button></div>
    <div className="intro-mid">
      <p className="intro-kicker"><b>00</b><span aria-hidden="true">/</span><span>Technology and design studio</span></p>
      <p className="intro-title" aria-hidden="true">{title.map((char, index) => <span className="intro-char" key={index}><span>{char}</span></span>)}</p>
      <span className="intro-indic" lang="hi" aria-hidden="true">अन्वय</span>
    </div>
    <div className="intro-foot">
      <div className="intro-row"><span>Building with intention</span><output aria-label="Transition progress">000</output></div>
      <span className="intro-line" aria-hidden="true"><i /></span>
    </div>
  </div><div ref={content}>{children}</div></>;
}
