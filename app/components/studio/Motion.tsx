"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Motion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const path = usePathname();

  useGSAP(
    () => {
      const media = gsap.matchMedia();
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
        // Text remains visible; GSAP owns only the progressive section movement.
        context
          .querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((element) => {
            gsap.from(element, {
              y: 12,
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
