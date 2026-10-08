"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getImageProps } from "next/image";
const Scene = dynamic(() => import("./HeroScene"), { ssr: false });
const desktopPoster = getImageProps({ src: "/art/anvaya-aperture-desktop.webp", alt: "", width: 951, height: 960, sizes: "66vw" }).props;
const mobilePoster = getImageProps({ src: "/art/anvaya-aperture-mobile.webp", alt: "", width: 429, height: 535, sizes: "110vw", loading: "eager" }).props;

export function Hero() {
  const [live, setLive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const root = useRef<HTMLElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const thread = useRef<SVGPathElement>(null);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReduced(preference.matches); setLive(!preference.matches); };
    update(); preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const element = root.current, point = dot.current, path = thread.current;
    if (!element || !point || !path || paused || reduced) return;
    const progress = { value: 0 };
    const length = path.getTotalLength();
    const tween = gsap.to(progress, { value: 1, duration: 15, ease: "none", repeat: -1, onUpdate: () => { const pos = path.getPointAtLength(length * progress.value); point.setAttribute("cx", String(pos.x)); point.setAttribute("cy", String(pos.y)); } });
    let visible = false;
    const update = () => { if (visible && !document.hidden) tween.resume(); else tween.pause(); };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }); observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); tween.kill(); };
  }, [paused, reduced]);
  return <section className="hero" ref={root} aria-labelledby="hero-title"><div className="hero-art" aria-hidden="true"><picture className="hero-poster"><source media="(min-width: 761px)" srcSet={desktopPoster.srcSet} sizes="66vw" /><img {...mobilePoster} alt="" fetchPriority="high" /></picture>{live && <Scene />}</div><div className="hero-shade" aria-hidden="true" /><div className="container hero-content"><div className="hero-topline"><span>TECHNOLOGY AND DESIGN STUDIO</span><span>INDIA / WORKING GLOBALLY</span></div><div className="hero-main"><div className="hero-heading-row"><span className="hero-index" aria-hidden="true">A—01</span><h1 id="hero-title">MAKE.<br />MOVE.<br /><span>MATTER.</span></h1></div><div className="hero-description"><p>We turn ambitious ideas into clear digital experiences, useful products, intelligent operations and spatial visuals.</p><Link className="action action-light" href="/project"><span>Start a Project</span><span aria-hidden="true">↗</span></Link></div></div><div className="hero-bottom"><Link href="#what-we-build">Explore what we build <span aria-hidden="true">↓</span></Link><p>Brand. Product. Systems. Space.</p>{!reduced && <button type="button" className="motion-control" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Resume thread" : "Pause thread"}<span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button>}</div></div><svg className="hero-thread" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true"><path ref={thread} d="M1440 550H1110C1010 550 1080 298 970 298C865 298 927 620 830 620H760C700 620 725 770 645 770H140C80 770 48 812 48 900" /><circle ref={dot} cx="1440" cy="550" r="4" /></svg></section>;
}
