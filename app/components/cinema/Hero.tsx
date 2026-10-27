"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { contact } from "../../lib/site";
import { afterIntro } from "../../lib/motion";
const Scene = dynamic(() => import("./PetalScene"), { ssr: false });
const clock = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });

/** Studio time in India; server-rendered as a placeholder so hydration never mismatches. */
function StudioClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(clock.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <p className="hero-clock">IST <time>{time || "--:--"}</time></p>;
}

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { location.href = `mailto:${email}`; }
  }
  return <button type="button" className="hero-corner-link" onClick={copy}>{email}<span aria-live="polite">{copied ? " — copied" : ""}</span></button>;
}

export function Hero() {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setLive(!preference.matches);
    // The glass scene waits for the opening to release the page and for an idle moment, so its WebGL setup never
    // competes with the intro or the headline entrance. The CSS fan holds the stage and crossfades to it.
    let idle = 0;
    const stop = afterIntro(location.pathname, () => {
      const begin = () => { update(); preference.addEventListener("change", update); };
      idle = "requestIdleCallback" in window ? requestIdleCallback(begin, { timeout: 1500 }) : -setTimeout(begin, 600);
    });
    return () => {
      stop(); preference.removeEventListener("change", update);
      if (idle > 0) cancelIdleCallback(idle); else clearTimeout(-idle);
    };
  }, []);
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-stage" aria-hidden="true">
      <div className="hero-fallback">{Array.from({ length: 11 }, (_, i) => <i key={i} style={{ "--i": i - 5 } as CSSProperties} />)}</div>
      {live && <Scene />}
    </div>
    <div className="hero-center">
      <h1 id="hero-title"><span className="hero-line"><span>Ambitious ideas.</span></span> <span className="hero-line hero-mark"><i className="hero-mark-box" aria-hidden="true" /><span>Built to last.</span></span></h1>
      <p className="hero-lede-top">We build websites, apps, AI automation and 3D renders for businesses in India and around the world.</p>
      <div className="hero-actions"><Link className="action action-light" href="/project"><span>Start a Project</span><span className="action-arrow" aria-hidden="true">↗</span></Link><Link className="action" href="#what-we-build"><span>Explore what we build</span><span aria-hidden="true">↓</span></Link></div>
    </div>
    <span className="hero-horizon" aria-hidden="true" />
    <span className="hero-scroll" aria-hidden="true" />
    <div className="hero-foot">
      <StudioClock />
      {contact.email ? <CopyEmail email={contact.email} /> : <p className="hero-corner-link">India / Working globally</p>}
    </div>
  </section>;
}
