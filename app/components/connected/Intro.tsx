"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { EASE_IN_OUT, INTRO_DONE, INTRO_KEY, gsap, introWillPlay } from "../../lib/motion";
import { LogoMark } from "./Logo";

const letters = "ANVAYA".split("");

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
    // Nominal 2.25s; the safeguard keeps the whole transition under three seconds.
    const timeout = setTimeout(finish, 2700);
    timeline
      .fromTo(q(".logo-arch"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut" }, 0)
      .fromTo(q(".logo-inner"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .8, ease: "power2.inOut" }, .25)
      .fromTo(q(".logo-thread"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .55, ease: "power3.inOut" }, .7)
      .fromTo(q(".logo-bindu"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: .5, ease: "back.out(3)" }, 1.12)
      .fromTo(q(".intro-letter"), { yPercent: 115 }, { yPercent: 0, duration: .8, stagger: .045 }, .45)
      .fromTo(q(".intro-indic, .intro-tagline"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .6, stagger: .1 }, .9)
      .fromTo(q(".intro-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "none" }, 0)
      .to(counter, { value: 100, duration: 1.6, ease: "power1.inOut", onUpdate: () => { if (output) output.textContent = String(Math.round(counter.value)).padStart(3, "0"); } }, 0)
      .to(q(".intro-center, .intro-top, .intro-bottom"), { y: -40, autoAlpha: 0, duration: .45, ease: "power3.in" }, 1.68)
      .to(overlay, { clipPath: "inset(0% 0% 100% 0%)", duration: .6, ease: EASE_IN_OUT, onComplete: finish }, 1.75);
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); if (event.key === "Tab") { event.preventDefault(); overlay.querySelector<HTMLButtonElement>("button")?.focus(); } };
    const changed = () => { if (preference.matches) finish(); };
    window.addEventListener("keydown", key);
    preference.addEventListener("change", changed);
    return () => { finish(); window.removeEventListener("keydown", key); preference.removeEventListener("change", changed); finishRef.current = () => {}; };
  }, [path]);
  return <><div ref={screen} className="intro-screen" hidden role="dialog" aria-modal="true" aria-label="Preparing the Anvaya experience">
    <div className="intro-top"><span>TECHNOLOGY AND DESIGN STUDIO</span><button type="button" onClick={() => finishRef.current()}>Skip intro ↗</button></div>
    <div className="intro-center">
      <LogoMark className="intro-mark" />
      <p className="intro-word" aria-hidden="true">{letters.map((letter, index) => <span className="intro-letter-mask" key={index}><span className="intro-letter">{letter}</span></span>)}</p>
      <span className="intro-indic" lang="hi" aria-hidden="true">अन्वय</span>
      <p className="intro-tagline">BUILDING WITH INTENTION</p>
    </div>
    <div className="intro-bottom"><span>PREPARING THE EXPERIENCE</span><span className="intro-rule" aria-hidden="true" /><output aria-label="Transition progress">000</output></div>
  </div><div ref={content}>{children}</div></>;
}
