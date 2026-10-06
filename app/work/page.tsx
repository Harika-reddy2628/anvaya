import type { Metadata } from "next";
import { WorkGallery } from "../components/studio/WorkGallery";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Explore Anvaya’s spatial web, agentic AI, developer tooling, and robotics work.",
};
export default function WorkPage() {
  return (
    <main id="main-content" className="container inner-page">
      <div className="page-heading" data-reveal>
        <span className="eyebrow section-kicker">
          <span>INDEX</span> OUR WORK
        </span>
        <h1>
          Products, tools, and systems we’ve built<span className="accent">.</span>
        </h1>
        <p>
          Public and internal products, technical showcases, and an anonymous
          case study. Explore the problem, our approach, and the evidence behind
          each project.
        </p>
      </div>
      <WorkGallery />
    </main>
  );
}
