import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../lib/studio";
import { ProjectVisual } from "./ProjectVisual";

export function WorkStory({ projects }: { projects: Project[] }) {
  return (
    <div className="featured-work-grid work-story">
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
