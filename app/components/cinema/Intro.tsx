"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { INTRO_DONE, INTRO_KEY, gsap, introWillPlay } from "../../lib/motion";
import { ButterflyGlyph } from "./ButterflyGlyph";
import { Wordmark } from "./Logo";

/* The opening: on ink, "Step into" fades in and "Anvaya" writes itself while a blue light rises from below. A butterfly
   drops onto the "v" and sits there, slowly opening and closing its wings. It only flies when the reader tries to scroll
   (or the screen lifts), so the opening stays still. Nominal 2.3s, hard limit 2.7s. */
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
    // Nominal 2.3s; the safeguard keeps the whole transition under three seconds.
    const timeout = setTimeout(finish, 2700);
    const butterfly = q(".intro-butterfly")[0] as HTMLElement, wings = q(".bf-wings")[0] as Element;
    // The butterfly sits on top of the third letter of "Anvaya". Placed once the words are on screen.
    const place = () => {
      const letter = q(".intro-letter")[2] as HTMLElement, mid = q(".intro-mid")[0] as HTMLElement;
      if (!letter || !butterfly) return;
      const l = letter.getBoundingClientRect(), m = mid.getBoundingClientRect(), w = butterfly.offsetWidth, h = butterfly.offsetHeight;
      butterfly.style.left = `${l.left - m.left + l.width / 2 - w / 2}px`;
      butterfly.style.top = `${l.top - m.top - h * .24}px`;
    };
    // Fast wing beats while it travels, slowing to a lazy open-and-close once it has landed.
    const flap = gsap.fromTo(wings, { scaleX: 1 }, { scaleX: .3, svgOrigin: "60 54", duration: .1, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true });
    timeline
      .fromTo(q(".intro-row"), { autoAlpha: 0 }, { autoAlpha: 1, duration: .5, ease: "power2.out" }, 0)
      .fromTo(q(".intro-a"), { autoAlpha: 0, filter: "blur(8px)", y: 8 }, { autoAlpha: 1, filter: "blur(0px)", y: 0, duration: .5 }, .05)
      // "Anvaya" writes itself, chased by a caret.
      .fromTo(q(".intro-b"), { clipPath: "inset(-10% 100% -40% -5%)" }, { clipPath: "inset(-10% -8% -40% -5%)", duration: .55, ease: "power2.inOut" }, .3)
      .fromTo(q(".intro-caret"), { autoAlpha: 1, x: 0 }, { x: () => q(".intro-b")[0]?.getBoundingClientRect().width ?? 0, duration: .55, ease: "power2.inOut" }, .3)
      .to(q(".intro-caret"), { autoAlpha: 0, duration: .1 }, .85)
      .fromTo(q(".intro-glow"), { yPercent: 70, scaleX: .6, autoAlpha: 0 }, { yPercent: 10, scaleX: 1, autoAlpha: .9, duration: 1.1, ease: "power3.out" }, .35)
      // The butterfly drops in from above and lands on the "v".
      .add(place, .8)
      .add(() => { flap.timeScale(1).play(); }, .85)
      .fromTo(butterfly, { autoAlpha: 0, x: 90, y: -150, rotation: 24, scale: 1.3 }, { autoAlpha: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: .55, ease: "power3.out" }, .85)
      .to(flap, { timeScale: .09, duration: .5, ease: "power2.out" }, 1.25)
      // Then it rests until the screen lifts (or the reader scrolls).
      .addLabel("fly", 1.8)
      .add(() => { flap.timeScale(1); }, "fly")
      .to(butterfly, { x: 220, y: -240, rotation: 26, scale: .55, autoAlpha: 0, duration: .45, ease: "power2.in" }, "fly")
      .to(overlay, { clipPath: "inset(0% 0% 100% 0%)", duration: .4, ease: "power4.inOut", onComplete: finish }, "fly+=.1");
    // Trying to scroll sends it off at once and lets the screen lift.
    let leaving = false;
    const leave = () => {
      if (leaving || finished || timeline.time() >= timeline.labels.fly) return;
      leaving = true;
      timeline.tweenTo("fly", { duration: .25, ease: "none" });
    };
    const intent = (event: KeyboardEvent) => { if (["ArrowDown", "PageDown", " ", "End"].includes(event.key)) leave(); };
    window.addEventListener("wheel", leave, { passive: true });
    window.addEventListener("touchmove", leave, { passive: true });
    window.addEventListener("keydown", intent);
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); if (event.key === "Tab") { event.preventDefault(); overlay.querySelector<HTMLButtonElement>("button")?.focus(); } };
    const changed = () => { if (preference.matches) finish(); };
    window.addEventListener("keydown", key);
    preference.addEventListener("change", changed);
    return () => { finish(); flap.kill(); window.removeEventListener("wheel", leave); window.removeEventListener("touchmove", leave); window.removeEventListener("keydown", intent); window.removeEventListener("keydown", key); preference.removeEventListener("change", changed); finishRef.current = () => {}; };
  }, [path]);
  return <><div ref={screen} className="intro-screen" hidden role="dialog" aria-modal="true" aria-label="Preparing the Anvaya experience">
    <div className="intro-row"><Wordmark /><button type="button" className="pill" onClick={() => finishRef.current()}>Skip intro ↗</button></div>
    <div className="intro-mid" aria-hidden="true">
      <p className="intro-line-1"><span className="intro-a">Step into</span><span className="intro-b-wrap"><em className="intro-b">{[..."Anvaya"].map((letter, i) => <span className="intro-letter" key={i}>{letter}</span>)}</em><span className="intro-caret" /></span></p>
      <span className="intro-butterfly"><ButterflyGlyph /></span>
    </div>
    <span className="intro-glow" aria-hidden="true" />
  </div><div ref={content}>{children}</div></>;
}
