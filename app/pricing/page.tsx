import type { Metadata } from "next";
import Link from "next/link";
import { EngagementCards, FinalCTA, Label, PageHero } from "../components/cinema/Shared";
import { budgetOptions } from "../lib/site";

export const metadata: Metadata = { title: "Pricing", description: "How Anvaya engagements are shaped and scoped, with INR enquiry ranges to start the conversation." };

// Enquiry ranges are the owner's confirmed INR bands from the project form. They are not fixed prices or packages.
export default function PricingPage() {
  const ranges = budgetOptions.filter(option => option !== "Need guidance");
  return <main id="main-content" tabIndex={-1}>
    <PageHero eyebrow="PRICING" title="Scoped to the outcome, not a package."><p>Every project is shaped around what needs to move. We agree the scope, deliverables and timeline before work begins, then quote against it.</p></PageHero>
    <section className="section engagement-section" id="models"><div className="wrap">
      <Label>01 — WAYS TO WORK TOGETHER</Label>
      <div className="section-heading"><h2>Focused when needed. <em>Connected when it matters.</em></h2><p>We do not begin with a fixed package. We begin with what needs to move.</p></div>
      <EngagementCards />
    </div></section>
    <section className="section pricing-ranges" id="ranges"><div className="wrap">
      <Label>02 — ENQUIRY RANGES</Label>
      <div className="section-heading"><h2>Start with a <em>range.</em></h2><p>Choose the band closest to your budget when you enquire, or ask for guidance. These are ranges to begin the conversation, not prices.</p></div>
      <ol className="range-list">{ranges.map((range, i) => <li key={range}><span className="range-number">{String(i + 1).padStart(2, "0")}</span><span className="range-value">{range}</span><Link className="range-link" href="/project">Enquire <span aria-hidden="true">↗</span></Link></li>)}</ol>
      <p className="range-note">Not sure yet? Choose “Need guidance” on the <Link href="/project">project form</Link>. Payment, ownership and warranty terms are set out in the <Link href="/terms">project terms</Link>.</p>
    </div></section>
    <FinalCTA />
  </main>;
}
