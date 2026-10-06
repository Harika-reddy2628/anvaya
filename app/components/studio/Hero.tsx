"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import styles from "./Hero.module.css";

const HeroBackdrop = dynamic(() => import("./HeroBackdrop"), { ssr: false });

export function Hero() {
  const [backgroundPaused, setBackgroundPaused] = useState(false);

  return (
    <section
      className={styles.hero}
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
              <HeroBackdrop ready paused={backgroundPaused} />
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
            SOFTWARE · AI WORKFLOWS · SPATIAL 3D
          </span>
          <h1 id="hero-heading" className={styles.headline}>
            <span className={styles.line}>
              <span data-hero-word>Ambitious ideas.</span>
            </span>{" "}
            <span className={styles.line}>
              <span data-hero-word>Connected engineering.</span>
            </span>{" "}
            <span className={styles.line}>
              <span data-hero-word>Working products.</span>
            </span>
          </h1>
        </div>
        <div className={styles.lower}>
          <div className={styles.introduction} data-hero-detail>
            <p>
              We help founders and CTOs build software, AI workflows, and
              interactive spatial experiences.
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
