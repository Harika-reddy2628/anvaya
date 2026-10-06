import type { Metadata } from "next";
import { BriefBuilder } from "../components/studio/BriefBuilder";
import { services } from "../lib/studio";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Create a project brief for software, agentic AI, spatial 3D, or interface engineering with Anvaya.",
};
export default async function ProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; engagement?: string }>;
}) {
  const query = await searchParams;
  const service = services.find((item) => item.id === query.service)?.id;
  return (
    <main id="main-content" className="container inner-page project-page">
      <div className="page-heading" data-reveal>
        <span className="eyebrow section-kicker">
          <span>BRIEF</span> LET’S MAKE IT REAL
        </span>
        <h1>
          Prepare your project brief<span className="accent">.</span>
        </h1>
        <p>
          Outline your project, budget, and timeline. Prepare a brief you can
          copy or download; nothing is sent from this site.
        </p>
      </div>
      <BriefBuilder
        key={`${service ?? "selected"}-${query.engagement ?? "project"}`}
        initialService={service}
        retainer={query.engagement === "retainer"}
      />
    </main>
  );
}
