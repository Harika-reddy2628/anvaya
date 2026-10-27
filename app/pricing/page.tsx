import type { Metadata } from "next";
import Link from "next/link";
import { FinalCTA, PageHero, PricingPlans } from "../components/cinema/Shared";
import { budgetOptions } from "../lib/site";

export const metadata: Metadata = { title: "Pricing", description: "Anvaya pricing: published ranges, timelines, review rounds, payment terms and warranty." };

// Enquiry ranges are the owner's confirmed INR bands from the project form. They are not fixed prices or packages.
export default function PricingPage() {
  const ranges = budgetOptions.filter(option => option !== "Need guidance");
  return <main id="main-content" tabIndex={-1}>
    <PageHero title="Practical pricing, agreed up front."><p>Every plan states its price range, timeline and review rounds. We agree the exact scope and quote before work begins.</p></PageHero>
    <section className="section pricing-section" id="plans"><div className="wrap">
      <div className="section-heading"><h2>Clear prices. <em>No surprises.</em></h2><p>Published ranges, fixed timelines and a set number of review rounds — agreed in writing before any work begins.</p></div>
      <PricingPlans />
    </div></section>
    <section className="section pricing-ranges" id="ranges"><div className="wrap">
      <div className="section-heading"><h2>Start with a <em>range.</em></h2><p>Choose the band closest to your budget when you enquire, or ask for guidance. These are ranges to begin the conversation, not prices.</p></div>
      <ol className="range-list">{ranges.map((range, i) => <li key={range}><span className="range-number">{String(i + 1).padStart(2, "0")}</span><span className="range-value">{range}</span><Link className="range-link" href="/project">Enquire <span aria-hidden="true">↗</span></Link></li>)}</ol>
      <p className="range-note">Not sure yet? Choose “Need guidance” on the <Link href="/project">project form</Link>. Payment, ownership and warranty terms are set out in the <Link href="/terms">project terms</Link>.</p>
    </div></section>
    <FinalCTA />
  </main>;
}
