"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { EASE_IN_OUT, gsap, prefersReducedMotion } from "../../lib/motion";
import { practices } from "../../lib/site";
import { Action, ComingSoon, WorldArt } from "./Shared";

export function ThreadWorlds() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const art = panels.current?.querySelector(`#world-panel-${active} .world-art`);
    if (!art || prefersReducedMotion()) return;
    const tween = gsap.timeline()
      .fromTo(art, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .9, ease: EASE_IN_OUT })
      .from(art.querySelector("svg"), { scale: 1.12, xPercent: -6, duration: 1.2, ease: "expo.out" }, 0);
    return () => { tween.progress(1).kill(); };
  }, [active]);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowDown" || event.key === "ArrowRight" ? (index + 1) % 4 : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (index + 3) % 4 : event.key === "Home" ? 0 : event.key === "End" ? 3 : null;
    if (next === null) return;
    event.preventDefault(); setActive(next); buttons.current[next]?.focus();
  }
  return <div className="worlds-layout"><div className="world-tabs" role="tablist" aria-label="Four connected practices" aria-orientation="vertical">{practices.map((practice, index) => <button type="button" role="tab" id={`world-tab-${index}`} aria-controls={`world-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} key={practice.id} ref={node => { buttons.current[index] = node; }} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} onKeyDown={event => navigate(event, index)}><span className="world-number">{practice.number}</span><span><strong>{practice.name}{practice.comingSoon && <> <ComingSoon /></>}</strong><span>{practice.line}</span></span><span className="world-arrow" aria-hidden="true">↗</span></button>)}</div><div className="world-panels" ref={panels}>{practices.map((practice, index) => <div role="tabpanel" id={`world-panel-${index}`} aria-labelledby={`world-tab-${index}`} hidden={active !== index} tabIndex={0} key={practice.id}><p className="plan-head" aria-hidden="true"><span>World {practice.number} / 04</span><span>{practice.name}</span></p><WorldArt index={index} large /><Action text href={`/services/${practice.slug}`}>{practice.comingSoon ? "Preview" : "Explore"} {practice.name}</Action></div>)}</div></div>;
}
