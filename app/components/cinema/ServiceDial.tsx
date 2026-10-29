"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { practices } from "../../lib/site";
import { ScrollTrigger, gsap, getSmoothScroll } from "../../lib/motion";
import { ComingSoon } from "./Shared";

const GlassStar = dynamic(() => import("./GlassStar"), { ssr: false });
const STEP = 24; // Degrees between numbers on the dial.
// One trackpad swipe moves one step. Its inertia tail keeps firing with shrinking deltas, so a new gesture needs a
// short pause plus a clearly stronger delta, or a long pause. Deltas, not gaps alone, survive frame jank.
const GESTURE_GAP = 180;
const GESTURE_RESET = 450;
const GESTURE_RISE = 1.2;
const SWIPE = 40; // px of touch travel that counts as a swipe.
const NEXT_KEYS = ["ArrowDown", "PageDown", " "];
const PREV_KEYS = ["ArrowUp", "PageUp"];

/* What we do, after the owner's reference: the dial stage pins while a dial of service numbers turns down the left edge;
   the active service's title, line and tags change beside it and a glass star turns on the right.
   Stepped: while pinned, one wheel gesture, swipe or arrow key moves exactly one service; past the first or last
   service, scrolling carries on through the page. Without motion, or below 1100px, it is a plain list. */
export function ServiceDial() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [dial, setDial] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1100px)", () => {
      // The layout class goes on synchronously, so the pin measures the stage at its final 100svh height.
      element.classList.add("is-dial"); setDial(true);
      const last = practices.length - 1;
      const turn = { value: 0 };
      let index = 0, captured = false, moving = false, lastWheel = 0, lastDelta = 0, touchY = 0;
      // Declared ahead because callbacks can fire while ScrollTrigger.create is still running.
      // eslint-disable-next-line prefer-const
      let trigger: ScrollTrigger | undefined;

      const turnTo = (i: number, duration: number) => {
        index = i; setActive(i);
        gsap.to(turn, { value: i, duration, ease: "power3.inOut", overwrite: true, onUpdate: () => element.style.setProperty("--turn", `${-turn.value * STEP}deg`) });
      };
      // Each service has its own scroll position inside the pin, so the page progress line still moves per step.
      const positionOf = (i: number) => trigger ? trigger.start + (trigger.end - trigger.start) * (i / last) : scrollY;

      const step = (dir: 1 | -1) => {
        if (moving) return;
        const next = index + dir;
        if (next < 0 || next > last) { release(dir); return; }
        moving = true;
        turnTo(next, .9);
        getSmoothScroll()?.scrollTo(positionOf(next), { duration: .9, force: true, lock: true });
        gsap.delayedCall(.9, () => { moving = false; });
      };

      const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        const now = performance.now(), gap = now - lastWheel, delta = Math.abs(event.deltaY);
        const fresh = gap > GESTURE_RESET || (gap > GESTURE_GAP && delta > lastDelta * GESTURE_RISE);
        lastWheel = now; lastDelta = delta;
        if (fresh && delta > 2) step(event.deltaY > 0 ? 1 : -1);
      };
      const onTouchStart = (event: TouchEvent) => { touchY = event.touches[0].clientY; };
      const onTouchMove = (event: TouchEvent) => event.preventDefault();
      const onTouchEnd = (event: TouchEvent) => {
        const dy = touchY - event.changedTouches[0].clientY;
        if (Math.abs(dy) > SWIPE) step(dy > 0 ? 1 : -1);
      };
      const onKey = (event: KeyboardEvent) => {
        if ((event.target as HTMLElement).closest("input, textarea, select, [contenteditable]")) return;
        const dir = NEXT_KEYS.includes(event.key) && !event.shiftKey ? 1 : PREV_KEYS.includes(event.key) || (event.key === " " && event.shiftKey) ? -1 : 0;
        if (!dir) return;
        event.preventDefault(); step(dir);
      };

      const listen = (on: boolean) => {
        const method = on ? "addEventListener" : "removeEventListener";
        window[method]("wheel", onWheel as EventListener, { passive: false } as AddEventListenerOptions);
        window[method]("touchstart", onTouchStart as EventListener, { passive: true } as AddEventListenerOptions);
        window[method]("touchmove", onTouchMove as EventListener, { passive: false } as AddEventListenerOptions);
        window[method]("touchend", onTouchEnd as EventListener);
        window[method]("keydown", onKey as EventListener);
        document[method]("focusin", onFocus as EventListener);
      };
      // Tabbing out of the dial (to the header, or past the section) hands scrolling back where focus went;
      // otherwise the wheel would keep turning a dial the reader has already left.
      const onFocus = (event: FocusEvent) => {
        if (!captured || element.contains(event.target as Node)) return;
        captured = false; listen(false);
        getSmoothScroll()?.start();
      };
      // Entering the pin takes over scrolling and settles on the first (or, from below, the last) service.
      const capture = (i: number) => {
        const lenis = getSmoothScroll();
        if (!lenis || !trigger || captured) return;
        captured = true; moving = false; lastWheel = performance.now();
        lenis.stop();
        lenis.scrollTo(positionOf(i), { immediate: true, force: true });
        turnTo(i, .6);
        listen(true);
      };
      // Leaving hands scrolling back just outside the pin; the pinned stage does not move, so the jump is invisible.
      const release = (dir: 1 | -1) => {
        if (!captured || !trigger) return;
        captured = false; listen(false);
        const lenis = getSmoothScroll();
        lenis?.start();
        lenis?.scrollTo(dir > 0 ? trigger.end + 2 : trigger.start - 2, { immediate: true, force: true });
      };

      trigger = ScrollTrigger.create({
        trigger: element, start: "top top", pin: element, pinSpacing: true, end: () => `+=${innerHeight * last * .7}`,
        onEnter: () => capture(0),
        onEnterBack: () => capture(last),
        onUpdate: self => {
          if (captured) return;
          const nearest = Math.round(self.progress * last);
          // Landing inside the pin at reading speed (e.g. after a reload) takes over; a fast jump past it only syncs.
          if (self.isActive && Math.abs(self.getVelocity()) < 2500) capture(nearest);
          else if (nearest !== index) turnTo(nearest, .5);
        },
      });
      return () => {
        if (captured) { listen(false); getSmoothScroll()?.start(); }
        trigger.kill(); element.classList.remove("is-dial"); setDial(false); setActive(0); element.style.removeProperty("--turn");
      };
    });
    return () => mm.revert();
  }, []);
  return <div className="service-dial" ref={root} data-active={active}>
    <div className="dial-ring" aria-hidden="true">
      <span className="dial-arc" />
      {practices.map((p, i) => <span key={p.id} className={`dial-number${i === active ? " is-active" : ""}`} style={{ "--a": `${i * STEP}deg` } as CSSProperties}><span>{p.number}</span></span>)}
    </div>
    <ol className="service-rows">{practices.map((p, i) => <li key={p.id} className={i === active ? "is-active" : undefined} aria-current={dial && i === active ? "step" : undefined}>
      <span className="service-row-number" aria-hidden="true">{p.number}</span>
      <div className="service-row-title"><h3>{p.name}</h3>{p.comingSoon && <ComingSoon />}</div>
      <p className="service-row-offer">{p.offer}</p>
      <ul className="tag-list" aria-label={`${p.name} capabilities`}>{p.tags.split(" / ").map(tag => <li key={tag}>{tag.toLowerCase()}</li>)}</ul>
      <Link className="service-row-link" href={`/services/${p.slug}`} aria-label={`${p.comingSoon ? "Preview" : "Explore"} ${p.name}${p.comingSoon ? " — Coming soon" : ""}`}><span>{p.comingSoon ? "Preview" : "Explore"}</span><span aria-hidden="true">↗</span></Link>
    </li>)}</ol>
    {dial && <GlassStar active={active} />}
  </div>;
}
