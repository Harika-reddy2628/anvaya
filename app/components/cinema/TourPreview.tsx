"use client";
import { useState } from "react";

/** The live walkthrough, loaded into the page only when asked, so the Works page stays light. */
export function TourPreview({ src, title }: { src: string; title: string }) {
  const [live, setLive] = useState(false);
  return <div className={`tour-preview${live ? " is-live" : ""}`}>
    {live ? <iframe src={src} title={title} loading="lazy" allow="fullscreen; xr-spatial-tracking" allowFullScreen /> : <>
      <div className="tour-plan" aria-hidden="true">
        <svg viewBox="0 0 400 260" fill="none"><path d="M20 20H380V240H20Z M20 120H170 M170 20V170 M170 170H260V240 M260 120H380 M300 20V120" /><circle cx="95" cy="70" r="5" /><circle cx="240" cy="70" r="5" /><circle cx="330" cy="180" r="5" /><circle cx="95" cy="190" r="5" /><path className="tour-cone" d="M240 70L290 40A60 60 0 0 1 300 100Z" /></svg>
        <span>01 / 11</span>
      </div>
      <button type="button" className="action action-light" onClick={() => setLive(true)}><span>Walk through it here</span><span className="action-arrow" aria-hidden="true">↗</span></button>
    </>}
  </div>;
}
