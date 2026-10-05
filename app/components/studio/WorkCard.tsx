import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../lib/studio";
import { ProjectVisual } from "./ProjectVisual";

export function WorkCard({
  project,
  interactive = false,
}: {
  project: Project;
  interactive?: boolean;
}) {
  return (
    <article className="work-card" data-reveal>
      <div className={`work-preview preview-${project.visual}`}>
        <ProjectVisual type={project.visual} compact={!interactive} />
      </div>
      <div className="work-meta">
        <span>{project.category}</span>
        <span>{project.kind}</span>
      </div>
      <Link href={`/work/${project.slug}`} className="work-title">
        <h3>{project.name}</h3>
        <span className="work-arrow">
          <ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" />
        </span>
      </Link>
      <p>{project.intro}</p>
      <Link className="text-link" href={`/work/${project.slug}`}>
        Explore the project <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </article>
  );
}
