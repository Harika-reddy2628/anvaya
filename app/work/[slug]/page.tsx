import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "../../lib/studio";
import { ProjectVisual } from "../../components/studio/ProjectVisual";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return {
    title: project?.name ?? "Project not found",
    description: project?.intro,
  };
}
export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <main id="main-content" className="container inner-page case-page">
      <Link href="/work" className="text-link">
        <ArrowLeft size={15} aria-hidden="true" /> All work
      </Link>
      <div className="page-heading" data-reveal>
        <span className="eyebrow">
          {project.category} / {project.kind}
        </span>
        <h1>{project.title}</h1>
        <p>{project.intro}</p>
      </div>
      <div className={`case-visual preview-${project.visual}`}>
        <ProjectVisual type={project.visual} />
      </div>
      <div className="case-description">
        <div className="case-sidebar">
          <span className="eyebrow">{project.name}</span>
          <div className="case-role">
            <span className="eyebrow">ANVAYA’S ROLE</span>
            <p>
              {project.kind === "Public product"
                ? "Product design and CLI engineering."
                : project.kind === "Anonymous case study"
                  ? "Test automation and engineering verification. Client identity withheld."
                  : project.category === "Agentic AI"
                    ? "Agent orchestration and workflow engineering."
                    : project.category === "Robotics"
                      ? "Control systems and simulation engineering."
                      : "Spatial engineering and interactive visualization."}
            </p>
          </div>
          <span className="eyebrow case-deliverables-label">
            DELIVERABLES & CAPABILITIES
          </span>
          <div className="tag-list">
            {project.details.map((detail) => (
              <span key={detail}>{detail}</span>
            ))}
          </div>
          {project.external && (
            <a
              className="button button-outline"
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
            >
              View public package <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
        <div className="case-narrative">
          {[
            ["01 / THE PROBLEM", project.problem],
            ["02 / THE APPROACH", project.solution],
            ["03 / THE PRACTICAL OUTCOME", project.outcome],
          ].map(([label, text]) => (
            <section key={label} data-reveal>
              <span className="eyebrow">{label}</span>
              <h2>{text}</h2>
            </section>
          ))}
          <div className="evidence-note">
            <span className="eyebrow">ABOUT THE PREVIEW & EVIDENCE</span>
            <p>{project.evidence}</p>
          </div>
          <div className="connection-motif">
            <span>Brief</span>
            <ArrowRight size={28} aria-hidden="true" />
            <span>Build</span>
            <ArrowRight size={28} aria-hidden="true" />
            <span>Launch</span>
          </div>
        </div>
      </div>
      <div className="case-next">
        <div>
          <span className="eyebrow">NEXT PROJECT</span>
          <Link href={`/work/${next.slug}`}>
            <h2>{next.name}</h2>
            <ArrowUpRight size={35} strokeWidth={1} aria-hidden="true" />
          </Link>
        </div>
        <Link className="button button-accent magnetic" href="/project">
          Build something with us <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
