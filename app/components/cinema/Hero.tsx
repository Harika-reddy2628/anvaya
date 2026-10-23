"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getImageProps } from "next/image";
import { practices } from "../../lib/site";
const Scene = dynamic(() => import("./HeroScene"), { ssr: false });
const desktopPoster = getImageProps({ src: "/art/anvaya-aperture-desktop.webp", alt: "", width: 1010, height: 1002, sizes: "70vw" }).props;
const mobilePoster = getImageProps({ src: "/art/anvaya-aperture-mobile.webp", alt: "", width: 490, height: 426, sizes: "125vw", loading: "eager" }).props;
// Practice points on the studio "plan", in the tour's floor-plan idiom (percent of the plan frame).
const planPoints = [[28, 30], [72, 26], [30, 74], [70, 70]] as const;

export function Hero() {
  const [live, setLive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const root = useRef<HTMLElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const thread = useRef<SVGPathElement>(null);
  const bar = useRef<HTMLElement>(null);
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
    const tween = gsap.to(progress, { value: 1, duration: 15, ease: "none", repeat: -1, onUpdate: () => {
      const pos = path.getPointAtLength(length * progress.value);
      point.setAttribute("cx", String(pos.x)); point.setAttribute("cy", String(pos.y));
      if (bar.current) bar.current.style.transform = `scaleX(${progress.value})`;
    } });
    let visible = false;
    const update = () => { if (visible && !document.hidden) tween.resume(); else tween.pause(); };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }); observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); tween.kill(); };
  }, [paused, reduced]);
  return <section className="hero" ref={root} id="top" data-rail="Make. Move. Matter." aria-labelledby="hero-title">
    <div className="hero-art" aria-hidden="true"><picture className="hero-poster"><source media="(min-width: 761px)" srcSet={desktopPoster.srcSet} sizes="70vw" /><img {...mobilePoster} alt="" fetchPriority="high" /></picture>{live && <Scene />}</div>
    <div className="scrim scrim-top" aria-hidden="true" /><div className="scrim scrim-bottom" aria-hidden="true" />
    <svg className="hero-thread" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true"><path ref={thread} d="M1440 520H1150C1050 520 1110 300 1000 300C895 300 950 600 860 600H790C730 600 745 700 665 700H120C70 700 40 760 40 900" /><circle ref={dot} cx="1440" cy="520" r="4" /></svg>
    <div className="wrap-full hero-content">
      <div className="hero-copy">
        <p className="kicker"><b>01</b><span className="slash" aria-hidden="true">/</span><span>08</span><span>Technology and design studio</span></p>
        <h1 id="hero-title"><span className="hero-line"><span>MAKE.</span></span><span className="hero-line"><span>MOVE.</span></span><span className="hero-line hero-line-accent"><span>MATTER.</span></span></h1>
        <div className="hero-description"><p>We turn ambitious ideas into clear digital experiences, useful products, intelligent operations and spatial visuals.</p>
          <div className="hero-actions"><Link className="action action-light" href="/project"><span>Start a Project</span><span className="action-arrow" aria-hidden="true">↗</span></Link><Link className="pill" href="#what-we-build">Explore what we build <span aria-hidden="true">↓</span></Link></div>
        </div>
        <div className="hero-bottom"><span>India / Working globally</span><p>Brand. Product. Systems. Space.</p>{!reduced && <button type="button" className="pill motion-control" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Resume thread" : "Pause thread"}<span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button>}</div>
        <span className="hero-bar" aria-hidden="true"><i ref={bar} /></span>
      </div>
      <nav className="practice-plan" aria-label="Practice map">
        <p className="plan-head"><span>Practice map</span><span>04 worlds</span></p>
        <div className="plan-frame-mini">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0V100M0 50H100" /><path className="plan-thread" d="M4 30H28V74H70V26H96" /></svg>
          {practices.map((practice, index) => <Link key={practice.id} href={`/services/${practice.slug}`} className="plan-point" style={{ left: `${planPoints[index][0]}%`, top: `${planPoints[index][1]}%` }}><span className="plan-core" aria-hidden="true" /><span className="plan-tag">{practice.name}<small aria-hidden="true">{practice.number}</small></span></Link>)}
        </div>
      </nav>
    </div>
  </section>;
}
