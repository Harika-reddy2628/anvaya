"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { INTRO_DONE, gsap, introWillPlay, markIntroPlayed } from "../../lib/motion";
import { letterInkTop } from "../../lib/perch";
import { ButterflyGlyph } from "./ButterflyGlyph";
import { Wordmark } from "./Logo";

/* The opening: on ink, "Step into" fades in and "Anvaya" writes itself while a blue light rises from below. A butterfly
   lands on the point of the "A" and sits there, slowly opening and closing its wings. It only flies when the reader tries to scroll
   (or the screen lifts), so the opening stays still. Nominal 3.5s, hard limit 4.3s: unhurried, so the words can be read. It plays every time the site is opened. */
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
    const timeline = gsap.timeline({ defaults: { ease: "expo.out" } }).timeScale(.65);
    // A real finish (skip, scroll, the screen lifting or the safeguard) counts as played; React unmounting it does not.
    function finish(played = true) {
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
      if (played) markIntroPlayed();
      window.dispatchEvent(new Event(INTRO_DONE));
      if (hadFocus) {
        const target = previousFocus && previousFocus !== document.body ? previousFocus : underlying!.querySelector<HTMLElement>("main");
        target?.focus({ preventScroll: true });
        // WebKit may defer clearing inherited inert state until the next frame.
        requestAnimationFrame(() => { if (document.activeElement === document.body || overlay!.contains(document.activeElement)) target?.focus({ preventScroll: true }); });
      }
    }
    finishRef.current = finish;
    // Played at 0.65x speed: nominal 3.5s; the safeguard keeps the whole transition under 4.3s.
    const timeout = setTimeout(finish, 4300);
    const butterfly = q(".intro-butterfly")[0] as HTMLElement, wings = q(".bf-wings")[0] as Element;
    // The butterfly sits on the point of the "A" that starts "Anvaya", its feet on the very top of the letter.
    const place = () => {
      const letter = q(".intro-letter")[0] as HTMLElement, mid = q(".intro-mid")[0] as HTMLElement, text = letter?.firstChild;
      if (!text || !butterfly) return;
      const range = document.createRange(); range.selectNodeContents(text);
      const l = range.getBoundingClientRect(), m = mid.getBoundingClientRect(), w = butterfly.offsetWidth, h = butterfly.offsetHeight;
      butterfly.style.left = `${l.left - m.left + l.width * .72 - w * .55}px`;
      // The glyph's four feet end 88% of the way down its box, so they land on the very top of the letter.
      butterfly.style.top = `${letterInkTop(range, "A", letter) - m.top - h * .85}px`;
    };
    // Fast wing beats while it travels; once perched the wings stay raised and only open and close a little.
    gsap.set(wings, { svgOrigin: "46 62" });
    let wingTween: gsap.core.Tween | undefined;
    const flapFast = () => { wingTween?.kill(); wingTween = gsap.fromTo(wings, { rotation: 8 }, { rotation: -60, duration: .13, ease: "sine.inOut", yoyo: true, repeat: -1 }); };
    const fold = () => {
      wingTween?.kill();
      wingTween = gsap.to(wings, { rotation: 4, duration: .3, ease: "power2.out", onComplete: () => { wingTween = gsap.to(wings, { rotation: 15, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1 }); } });
    };
    timeline
      .fromTo(q(".intro-row"), { autoAlpha: 0 }, { autoAlpha: 1, duration: .5, ease: "power2.out" }, 0)
      .fromTo(q(".intro-a"), { autoAlpha: 0, filter: "blur(8px)", y: 8 }, { autoAlpha: 1, filter: "blur(0px)", y: 0, duration: .5 }, .05)
      // "Anvaya" writes itself, chased by a caret.
      .fromTo(q(".intro-b"), { clipPath: "inset(-10% 100% -40% -5%)" }, { clipPath: "inset(-10% -8% -40% -5%)", duration: .55, ease: "power2.inOut" }, .3)
      .fromTo(q(".intro-caret"), { autoAlpha: 1, x: 0 }, { x: () => q(".intro-b")[0]?.getBoundingClientRect().width ?? 0, duration: .55, ease: "power2.inOut" }, .3)
      .to(q(".intro-caret"), { autoAlpha: 0, duration: .1 }, .85)
      .fromTo(q(".intro-glow"), { yPercent: 70, scaleX: .6, autoAlpha: 0 }, { yPercent: 10, scaleX: 1, autoAlpha: .9, duration: 1.1, ease: "power3.out" }, .35)
      // The butterfly drops in from above and lands on the point of the "A".
      .add(place, .8)
      .add(flapFast, .85)
      .fromTo(butterfly, { autoAlpha: 0, x: 90, y: -150, rotation: 14, scale: 1.3 }, { autoAlpha: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: .55, ease: "power3.out" }, .85)
      .add(fold, 1.4)
      // Then it rests until the screen lifts (or the reader scrolls).
      .addLabel("fly", 1.8)
      .add(flapFast, "fly")
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
    return () => { finish(false); wingTween?.kill(); window.removeEventListener("wheel", leave); window.removeEventListener("touchmove", leave); window.removeEventListener("keydown", intent); window.removeEventListener("keydown", key); preference.removeEventListener("change", changed); finishRef.current = () => {}; };
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
