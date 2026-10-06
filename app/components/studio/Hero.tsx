"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import styles from "./Hero.module.css";

// Dynamic import with ssr: false for client-only interactive motion stage
const KineticConnectorStage = dynamic(
  () =>
    import("./KineticConnectorStage").then((mod) => mod.KineticConnectorStage),
  { ssr: false },
);

export function Hero() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-heading"
      data-cinematic-hero
    >
      <div className={`${styles.content} container`}>
        {/* Top Text Layer: Expansive Typography */}
        <div className={styles.statement}>
          <span className={styles.overline}>
            SOFTWARE · AI WORKFLOWS · SPATIAL 3D
          </span>
          <h1 id="hero-heading" className={styles.headline}>
            <span className={styles.line}>Ambitious ideas.</span>{" "}
            <span className={styles.line}>Connected engineering.</span>{" "}
            <span className={styles.line}>Working products.</span>
          </h1>
        </div>

        {/* Supporting Copy & Immediate Actions */}
        <div className={styles.middleRow}>
          <p className={styles.introduction}>
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

        {/* Inset Rounded Kinetic Stage (Desktop ~16:10, Mobile ~4:5) */}
        <div className={styles.stageWrapper}>
          <div className={styles.stage}>
            {/* Live GSAP + Anime.js Kinetic Connector Stage */}
            <div className={styles.canvasContainer}>
              <KineticConnectorStage paused={isPaused} />
            </div>

            {/* Motion Control Toggle */}
            <button
              type="button"
              className={styles.motionControl}
              aria-pressed={isPaused}
              aria-label={
                isPaused
                  ? "Resume kinetic motion"
                  : "Pause kinetic motion"
              }
              onClick={() => setIsPaused((prev) => !prev)}
            >
              {isPaused ? (
                <Play size={12} aria-hidden="true" />
              ) : (
                <Pause size={12} aria-hidden="true" />
              )}
              <span>{isPaused ? "Resume motion" : "Pause motion"}</span>
            </button>
          </div>
        </div>

        {/* Bottom Metadata & Provenance Row */}
        <div className={styles.bottomRow}>
          <Link href="#pricing" className={styles.bottomLink}>
            14-day delivery sprints{" "}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <span className={styles.provenance}>
            BENGALURU, INDIA · WORKING GLOBALLY
          </span>
          <Link href="#work" className={styles.scrollLink}>
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
