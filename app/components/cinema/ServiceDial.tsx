"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { practices } from "../../lib/site";
import { ScrollTrigger, gsap } from "../../lib/motion";
import { ComingSoon } from "./Shared";

const GlassStar = dynamic(() => import("./GlassStar"), { ssr: false });
const STEP = 24; // Degrees between numbers on the dial.

/* What we do, after the owner's reference: the dial stage pins while a dial of service numbers turns down the left edge;
   the active service's title, line and tags change beside it and a glass star turns on the right. Without motion,
   or below 1100px, it is a plain list of the four services. */
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
      const turn = { value: 0 };
      const trigger = ScrollTrigger.create({
        trigger: element, start: "top top", pin: element, pinSpacing: true, end: () => `+=${innerHeight * (practices.length - .4)}`, scrub: .6,
        onUpdate: self => {
          const value = self.progress * (practices.length - 1);
          gsap.to(turn, { value, duration: .5, ease: "power3.out", overwrite: true, onUpdate: () => element.style.setProperty("--turn", `${-turn.value * STEP}deg`) });
          setActive(Math.min(practices.length - 1, Math.round(value)));
        },
      });
      return () => { trigger.kill(); element.classList.remove("is-dial"); setDial(false); setActive(0); element.style.removeProperty("--turn"); };
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
