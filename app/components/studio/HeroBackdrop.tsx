"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroBackdrop.module.css";

gsap.registerPlugin(ScrollTrigger);

/** All motion is progressive: the original picture always remains underneath. */
export default function HeroBackdrop({
  ready,
  paused,
}: {
  ready: boolean;
  paused: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready || paused || !host.current) return;
    const hero = host.current.closest<HTMLElement>("[data-cinematic-hero]");
    const scene = hero?.querySelector<HTMLElement>("[data-hero-scene]");
    const drift = hero?.querySelector<HTMLElement>("[data-hero-drift]");
    const surface = hero?.querySelector<HTMLElement>("[data-hero-surface]");
    const picture = hero?.querySelector<HTMLElement>("[data-hero-poster]");
    const image = picture?.querySelector("img");
    const container = host.current;
    const cursor = container.querySelector<HTMLElement>("[data-water-cursor]");
    if (!hero || !scene || !drift || !surface || !image || !cursor) return;

    // GSAP owns image, ambient drift, pointer and scroll transforms.
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const entrance = gsap.fromTo(image, { y: 14, scale: 1.025 }, {
        y: 0, scale: 1, duration: 1.8, ease: "power2.out",
      });
      const float = gsap.fromTo(
        drift,
        { x: -5, y: -3, scale: 1.025 },
        {
          x: 5,
          y: 3,
          scale: 1.045,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
      );
      let inView = true;
      const visibility = () => {
        if (!inView || document.hidden) {
          float.pause();
          entrance.pause();
        } else {
          float.resume();
          entrance.resume();
        }
      };
      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        visibility();
      });
      observer.observe(hero);
      document.addEventListener("visibilitychange", visibility);
      visibility();
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", visibility);
      };
    });
    media.add(
      "(min-width: 681px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.to(scene, {
          y: 18,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      },
    );
    media.add(
      "(min-width: 681px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        let disposed = false;
        let disposeWater: (() => void) | undefined;
        const pointerX = gsap.quickTo(surface, "x", {
          duration: 1.1,
          ease: "power2.out",
        });
        const pointerY = gsap.quickTo(surface, "y", {
          duration: 1.1,
          ease: "power2.out",
        });
        const cursorX = gsap.quickTo(cursor, "x", {
          duration: 0.18,
          ease: "power2.out",
        });
        const cursorY = gsap.quickTo(cursor, "y", {
          duration: 0.18,
          ease: "power2.out",
        });
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const rect = container.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          pointerX((x / rect.width - 0.5) * -14);
          pointerY((y / rect.height - 0.5) * -10);
          if (cursor.dataset.active !== "true") gsap.set(cursor, { x, y });
          cursor.dataset.active = "true";
          cursorX(x);
          cursorY(y);
        };
        const leave = () => {
          cursor.dataset.active = "false";
          pointerX(0);
          pointerY(0);
        };
        hero.addEventListener("pointermove", move, { passive: true });
        hero.addEventListener("pointerleave", leave);
        import("./hero-water")
          .then(({ startWater }) => {
            if (!disposed) disposeWater = startWater(container, image, hero);
          })
          .catch(() => {
            container.dataset.state = "poster";
          });
        return () => {
          disposed = true;
          disposeWater?.();
          container.dataset.state = "poster";
          cursor.dataset.active = "false";
          hero.removeEventListener("pointermove", move);
          hero.removeEventListener("pointerleave", leave);
        };
      },
    );

    return () => {
      media.revert();
    };
  }, [ready, paused]);

  return (
    <div
      ref={host}
      className={styles.motion}
      data-hero-motion
      data-state="poster"
      data-motion={paused ? "paused" : "running"}
      aria-hidden="true"
    >
      <div className={styles.water} data-water-surface />
      <span className={styles.cursor} data-water-cursor data-active="false" />
    </div>
  );
}
