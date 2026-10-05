import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project terms",
  description:
    "Anvaya’s published scope, payment, ownership, and technical warranty terms.",
};
export default function TermsPage() {
  return (
    <main id="main-content" className="container inner-page policy-page">
      <div className="page-heading">
        <span className="eyebrow">WORKING WITH ANVAYA</span>
        <h1>
          Project terms<span className="accent">.</span>
        </h1>
        <p>The practical foundations of an Anvaya engagement.</p>
      </div>
      <div className="policy-content">
        <section>
          <h2>Scope and timelines</h2>
          <p>
            Project deliverables, acceptance criteria, required inputs, reviews,
            and integrations are agreed before kickoff. The flagship sprint
            delivers an agreed production-ready MVP or agentic pipeline in 14
            calendar days. Spatial visualizers and walkthroughs typically take
            48 hours to 5 business days, depending on source materials and
            complexity.
          </p>
          <p>
            Changes to scope are reviewed together, with their effect on timing
            and price agreed before the additional work begins.
          </p>
        </section>
        <section>
          <h2>Pricing and payment</h2>
          <p>
            Published ranges are indicative and tied to the described scope.
            Spatial projects range from $500–$1,500 per asset or space.
            Fixed-scope MVP and agentic pipeline sprints range from
            $1,500–$3,500. Dedicated engineering retainers range from
            $2,500–$4,500 per month.
          </p>
          <p>
            Projects use a 50% mobilization deposit and 50% payment on final
            verified delivery, or a fully funded, agreed platform escrow.
            Third-party subscriptions and usage costs are addressed during
            scoping.
          </p>
        </section>
        <section>
          <h2>Ownership and handover</h2>
          <p>
            Clients receive 100% ownership of delivered source code, Git
            repositories, deployment configurations, and applicable packed
            master 3D assets after final payment. Spatial handover includes
            applicable .blend and .glb assets.
          </p>
        </section>
        <section>
          <h2>Technical defect warranty</h2>
          <p>
            Every project includes a 14-day technical defect warranty. Bugs,
            rendering glitches, and API defects in the delivered scope are fixed
            at no additional cost. Further development can be scoped separately
            or through an engineering retainer.
          </p>
        </section>
        <section>
          <h2>Your engagement agreement</h2>
          <p>
            This page summarizes the studio’s published offer. Exact
            deliverables, support arrangements, dates, and any
            engagement-specific terms are recorded in the agreed project scope.
          </p>
        </section>
        <Link className="text-link" href="/project">
          Create a project brief ↗
        </Link>
      </div>
    </main>
  );
}
