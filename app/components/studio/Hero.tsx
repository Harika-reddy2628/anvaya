"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { createScope, createTimeline, stagger } from "animejs";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { useIntroReady } from "./StudioIntro";
import styles from "./Hero.module.css";

const HeroBackdrop = dynamic(() => import("./HeroBackdrop"), { ssr: false });

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const ready = useIntroReady();
  const [backgroundPaused, setBackgroundPaused] = useState(false);

  useEffect(() => {
    if (!ready || !root.current) return;
    const scope = createScope({
      root: root.current,
      mediaQueries: { reduce: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      if (!self || self.matches.reduce) return;
      createTimeline({ defaults: { ease: "outCubic" } })
        .add(
          "[data-hero-word]",
          {
            opacity: [0, 1],
            y: ["105%", "0%"],
            duration: 1200,
            delay: stagger(130),
          },
          0,
        )
        .add(
          "[data-hero-detail]",
          {
            opacity: [0, 1],
            y: [8, 0],
            duration: 700,
            delay: stagger(60),
          },
          250,
        );
    });
    return () => scope.revert();
  }, [ready]);

  return (
    <section
      className={styles.hero}
      ref={root}
      aria-labelledby="hero-heading"
      data-cinematic-hero
    >
      <div className={styles.artwork} aria-hidden="true" data-hero-artwork>
        <div className={styles.scene} data-hero-scene>
          <div className={styles.drift} data-hero-drift>
            <div className={styles.surface} data-hero-surface>
              <picture className={styles.poster} data-hero-poster>
                <source
                  media="(max-width: 680px)"
                  srcSet="/art/dreamy-lotus-mobile.webp"
                />
                {/* The original glass-lotus artwork stays visible without JavaScript. */}
                <img
                  src="/art/dreamy-lotus-desktop.webp"
                  alt=""
                  width="1672"
                  height="941"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
              <HeroBackdrop ready={ready} paused={backgroundPaused} />
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={styles.motionControl}
        data-hero-motion-toggle
        aria-pressed={backgroundPaused}
        aria-label={
          backgroundPaused
            ? "Resume background motion"
            : "Pause background motion"
        }
        onClick={() => setBackgroundPaused((value) => !value)}
      >
        {backgroundPaused ? (
          <Play size={12} aria-hidden="true" />
        ) : (
          <Pause size={12} aria-hidden="true" />
        )}
        <span>{backgroundPaused ? "Resume motion" : "Pause motion"}</span>
      </button>
      <div className={`${styles.content} container`}>
        <div className={styles.statement}>
          <span className={styles.overline} data-hero-detail>
            SOFTWARE · AUTONOMOUS AI · SPATIAL EXPERIENCES
          </span>
          <h1 id="hero-heading" className={styles.headline}>
            <span className={styles.line}>
              <span data-hero-word>Ambitious ideas.</span>
            </span>{" "}
            <span className={styles.line}>
              <span data-hero-word>Considered engineering.</span>
            </span>{" "}
            <span className={styles.line}>
              <span data-hero-word>Real, working</span>
            </span>{" "}
            <span className={styles.line}>
              <span data-hero-word>products.</span>
            </span>
          </h1>
        </div>
        <div className={styles.lower}>
          <div className={styles.introduction} data-hero-detail>
            <p>
              We help founders and CTOs ship production-ready software,
              autonomous AI workflows, and interactive spatial experiences.
            </p>
            <div className={styles.actions}>
              <Link href="/project" className={styles.primary}>
                Start a project <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link href="#work" className={styles.secondary}>
                Explore our work <ArrowDown size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className={styles.signature} data-hero-detail>
            <span>Connection, by design.</span>
            <small>AN ORIGINAL GLASS LOTUS STUDY / ANVAYA</small>
          </div>
        </div>
        <div className={styles.bottom} data-hero-detail>
          <Link href="#pricing">
            14-day delivery sprints{" "}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <span>BENGALURU, INDIA · WORKING GLOBALLY</span>
          <Link href="#work" aria-label="Scroll to selected work">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
