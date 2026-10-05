"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "../../lib/studio";
import { ProjectVisual } from "./ProjectVisual";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function WorkStory({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      let disposed = false;
      media.add(
        "(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)",
        () => {
          root.current
            ?.querySelectorAll<HTMLElement>("[data-work-scene]")
            .forEach((scene) => {
              ScrollTrigger.create({
                trigger: scene,
                start: "top 76px",
                end: "+=360",
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
              });
            });
        },
      );
      document.fonts.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
      return () => {
        disposed = true;
        media.revert();
      };
    },
    { scope: root },
  );

  return (
    <div className="featured-work-grid work-story" ref={root}>
      {projects.map((project, index) => (
        <article
          className="work-card work-chapter"
          key={project.slug}
          data-work-chapter
        >
          <div className={`work-scene work-tone-${index}`} data-work-scene>
            <div className="work-scene-inner container">
              <div className={`work-preview preview-${project.visual}`}>
                <ProjectVisual
                  type={project.visual}
                  compact={project.slug !== "spatial-engine"}
                />
              </div>
              <div className="work-narrative">
                <span className="story-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="work-meta">
                  <span>{project.category}</span>
                  <span>{project.kind}</span>
                </div>
                <Link href={`/work/${project.slug}`} className="work-title">
                  <h3>{project.name}</h3>
                  <ArrowUpRight size={25} strokeWidth={1} aria-hidden="true" />
                </Link>
                <p className="work-story-statement">{project.title}</p>
                <p className="work-story-description">{project.intro}</p>
                <Link className="text-link" href={`/work/${project.slug}`}>
                  Explore the project{" "}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
              <span className="story-position" aria-hidden="true">
                0{index + 1} <span>/ 0{projects.length}</span>
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
