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
          Different problems.
          <br />
          Connected thinking<span className="accent">.</span>
        </h1>
        <p>
          Internal products, technical showcases, and an anonymous case study.
          <br />
          Explore the problem, the engineering, and what each project makes
          possible.
        </p>
      </div>
      <WorkGallery />
    </main>
  );
}
