"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, svg, type JSAnimation } from "animejs";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Motion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const path = usePathname();

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      const drawings: JSAnimation[] = [];
      let disposed = false;
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const context = root.current;
        if (!context) return;
        const filament = context.querySelector(".connection-filament");
        if (filament)
          gsap.fromTo(
            filament,
            { y: 20, rotation: -14 },
            {
              y: -35,
              rotation: -8,
              ease: "none",
              scrollTrigger: {
                trigger: filament.closest("section"),
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        // The hero and intro have their own anime.js scopes. Do not double-animate them.
        context
          .querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((element) => {
            gsap.from(element, {
              y: 12,
              opacity: 0,
              duration: 0.45,
              ease: "power2.out",
              scrollTrigger: { trigger: element, start: "top 94%", once: true },
            });
          });

        const process = context.querySelector(".process-grid");
        const line = context.querySelector(".process-progress");
        if (process && line)
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: process,
                start: "top 85%",
                end: "bottom 50%",
                scrub: 0.5,
              },
            },
          );

        context
          .querySelectorAll<SVGPathElement>("[data-draw]")
          .forEach((line) => {
            ScrollTrigger.create({
              trigger: line.closest("section") ?? line,
              start: "top 90%",
              once: true,
              onEnter: () => {
                drawings.push(
                  animate(svg.createDrawable(line), {
                    draw: ["0 0", "0 1"],
                    duration: 650,
                    ease: "outCubic",
                  }),
                );
              },
            });
          });

        return () => {
          drawings.forEach((animation) => animation.revert());
        };
      });
      document.fonts.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
      return () => {
        disposed = true;
        media.revert();
      };
    },
    { scope: root, dependencies: [path], revertOnUpdate: true },
  );

  return <div ref={root}>{children}</div>;
}
