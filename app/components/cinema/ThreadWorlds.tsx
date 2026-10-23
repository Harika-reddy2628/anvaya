"use client";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { practices } from "../../lib/site";
import { Action, ComingSoon } from "./Shared";

// Plan positions for the four worlds, echoing the tour's floor-plan minimap (percent of the plan frame).
const planPoints = [[24, 30], [70, 24], [30, 72], [74, 68]] as const;

/** One thread, four worlds: a walkthrough-style viewer. The room index is a real tablist. */
export function ThreadWorlds() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowDown" || event.key === "ArrowRight" ? (index + 1) % 4 : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (index + 3) % 4 : event.key === "Home" ? 0 : event.key === "End" ? 3 : null;
    if (next === null) return;
    event.preventDefault(); setActive(next); buttons.current[next]?.focus();
  }
  const current = practices[active];
  return <div className="viewer" data-world={active}>
    <div className="viewer-stage" aria-hidden="true">
      {practices.map((practice, index) => <div className={`viewer-shot${active === index ? " is-active" : ""}`} key={practice.id}><Image src={`/art/worlds/${practice.slug}-wide.webp`} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1280px) 92vw, 1200px" /></div>)}
      <span className="viewer-scrim" />
    </div>
    <p className="viewer-top" aria-hidden="true"><span><b>{current.number}</b> / 04 — World</span><span className="viewer-hint">Hover, tap or use arrow keys</span></p>
    <div className="world-tabs" role="tablist" aria-label="Four connected practices" aria-orientation="vertical">{practices.map((practice, index) => <button type="button" role="tab" id={`world-tab-${index}`} aria-controls={`world-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} key={practice.id} ref={node => { buttons.current[index] = node; }} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} onKeyDown={event => navigate(event, index)}><span className="world-number">{practice.number}</span><span><strong>{practice.name}{practice.comingSoon && <> <ComingSoon /></>}</strong><span>{practice.line}</span></span></button>)}</div>
    <div className="world-panels">{practices.map((practice, index) => <div role="tabpanel" id={`world-panel-${index}`} aria-labelledby={`world-tab-${index}`} hidden={active !== index} tabIndex={0} key={practice.id}>
      <p className="viewer-kicker"><b>{practice.number}</b><span aria-hidden="true">/</span><span>{practice.tags.split(" / ").slice(0, 2).join(" · ")}</span></p>
      <h3 className="viewer-title">{practice.name}</h3>
      <p className="viewer-line">{practice.summary}</p>
      <Action href={`/services/${practice.slug}`} light>{practice.comingSoon ? "Preview" : "Explore"} {practice.name}</Action>
    </div>)}</div>
    <div className="viewer-plan" aria-hidden="true">
      <p className="plan-head"><span>Plan</span><span>{current.name}</span></p>
      <div className="viewer-plan-frame"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M50 0V100M0 50H100" /><path className="plan-thread" d="M0 30H24V72H74V24H100" /></svg>{planPoints.map(([x, y], index) => <span key={index} className={`viewer-point${active === index ? " is-active" : ""}`} style={{ left: `${x}%`, top: `${y}%` }} />)}</div>
    </div>
    <span className="viewer-bar" aria-hidden="true"><i style={{ transform: `scaleX(${(active + 1) / 4})` }} /></span>
  </div>;
}
