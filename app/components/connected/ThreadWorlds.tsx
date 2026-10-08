"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { practices } from "../../lib/site";
import { Action, WorldArt } from "./Shared";

export function ThreadWorlds() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowDown" || event.key === "ArrowRight" ? (index + 1) % 4 : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (index + 3) % 4 : event.key === "Home" ? 0 : event.key === "End" ? 3 : null;
    if (next === null) return;
    event.preventDefault(); setActive(next); buttons.current[next]?.focus();
  }
  return <div className="worlds-layout"><div className="world-tabs" role="tablist" aria-label="Four connected practices" aria-orientation="vertical">{practices.map((practice, index) => <button type="button" role="tab" id={`world-tab-${index}`} aria-controls={`world-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} key={practice.id} ref={node => { buttons.current[index] = node; }} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} onKeyDown={event => navigate(event, index)}><span className="world-number">{practice.number}</span><span><strong>{practice.name}</strong><span>{practice.line}</span></span><span className="world-arrow" aria-hidden="true">↗</span></button>)}</div><div className="world-panels">{practices.map((practice, index) => <div role="tabpanel" id={`world-panel-${index}`} aria-labelledby={`world-tab-${index}`} hidden={active !== index} tabIndex={0} key={practice.id}><WorldArt index={index} large /><Action text href={`/services/${practice.slug}`}>Explore {practice.name}</Action></div>)}</div></div>;
}
