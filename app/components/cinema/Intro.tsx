"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { INTRO_DONE, INTRO_KEY, gsap, introWillPlay } from "../../lib/motion";
import { LogoMark, Wordmark } from "./Logo";

/* The opening, after the owner's reference film: on ink, "Ambitious ideas." writes itself in sans and italic serif;
   a blue light rises from below while "Built to last." resolves out of blur; the words collapse to a point and the
   arch mark draws itself before the screen lifts into the hero. Nominal 2.35s, hard limit 2.6s. */
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
    const root = document.documentElement;
    root.dataset.intro = "playing";
    overlay.hidden = false;
    underlying.inert = true;
    document.body.style.overflow = "hidden";
    overlay.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    const q = gsap.utils.selector(overlay);
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
    // Nominal 2.35s; the safeguard keeps the whole transition under three seconds.
    const timeout = setTimeout(finish, 2600);
    timeline
      .fromTo(q(".intro-row"), { autoAlpha: 0 }, { autoAlpha: 1, duration: .5, ease: "power2.out" }, 0)
      // Line one writes itself: a sans word, a pulsing point, an italic serif word chasing a caret.
      .fromTo(q(".intro-a"), { autoAlpha: 0, filter: "blur(8px)", y: 6 }, { autoAlpha: 1, filter: "blur(0px)", y: 0, duration: .45 }, .05)
      .fromTo(q(".intro-point"), { scale: 0 }, { scale: 1, duration: .3, ease: "back.out(3)" }, .32)
      .fromTo(q(".intro-b"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .4, ease: "power2.inOut" }, .4)
      .fromTo(q(".intro-caret"), { autoAlpha: 1, x: 0 }, { x: () => q(".intro-b")[0]?.getBoundingClientRect().width ?? 0, duration: .4, ease: "power2.inOut" }, .4)
      .to(q(".intro-caret"), { autoAlpha: 0, duration: .1 }, .86)
      .to(q(".intro-line-1"), { autoAlpha: 0, y: -10, filter: "blur(6px)", duration: .3, ease: "power2.in" }, .95)
      // The light rises; line two focuses out of it.
      .fromTo(q(".intro-glow"), { yPercent: 70, scaleX: .6, autoAlpha: 0 }, { yPercent: 0, scaleX: 1, autoAlpha: 1, duration: .75, ease: "power3.out" }, .95)
      .fromTo(q(".intro-line-2"), { autoAlpha: 0, filter: "blur(14px)", scale: 1.12 }, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: .7, ease: "power3.out" }, 1.05)
      .to(q(".intro-glow"), { yPercent: 35, autoAlpha: .55, duration: .4, ease: "power2.inOut" }, 1.6)
      // Collapse to a point, then the mark draws.
      .to(q(".intro-line-2"), { scaleX: .02, scaleY: .3, autoAlpha: 0, duration: .3, ease: "power3.in" }, 1.65)
      .fromTo(q(".intro-mark path"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .4, stagger: .05, ease: "power2.inOut" }, 1.82)
      .fromTo(q(".intro-mark"), { autoAlpha: 0, scale: .7 }, { autoAlpha: 1, scale: 1, duration: .3, ease: "back.out(2)" }, 1.82)
      .to(overlay, { clipPath: "inset(0% 0% 100% 0%)", duration: .4, ease: "power4.inOut", onComplete: finish }, 1.95);
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); if (event.key === "Tab") { event.preventDefault(); overlay.querySelector<HTMLButtonElement>("button")?.focus(); } };
    const changed = () => { if (preference.matches) finish(); };
    window.addEventListener("keydown", key);
    preference.addEventListener("change", changed);
    return () => { finish(); window.removeEventListener("keydown", key); preference.removeEventListener("change", changed); finishRef.current = () => {}; };
  }, [path]);
  return <><div ref={screen} className="intro-screen" hidden role="dialog" aria-modal="true" aria-label="Preparing the Anvaya experience">
    <div className="intro-row"><Wordmark /><button type="button" className="pill" onClick={() => finishRef.current()}>Skip intro ↗</button></div>
    <div className="intro-mid" aria-hidden="true">
      <p className="intro-line-1"><span className="intro-a">Ambitious</span><i className="intro-point" /><span className="intro-b-wrap"><em className="intro-b">ideas.</em><span className="intro-caret" /></span></p>
      <p className="intro-line-2">Built to <em>last.</em></p>
      <LogoMark className="intro-mark" />
    </div>
    <span className="intro-glow" aria-hidden="true" />
  </div><div ref={content}>{children}</div></>;
}
