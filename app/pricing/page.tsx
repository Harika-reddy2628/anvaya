import type { Metadata } from "next";
import Link from "next/link";
import { FinalCTA, PageHero, PricingAddOns, PricingPlans, QuotedServices } from "../components/cinema/Shared";
import { budgetOptions } from "../lib/site";

export const metadata: Metadata = { title: "Pricing", description: "Anvaya pricing for builders: interior renders, 360° tours and launch packages per unit type, with add-ons, timelines and terms." };

// Enquiry ranges match the package prices so a builder can place any package in one band.
export default function PricingPage() {
  const ranges = budgetOptions.filter(option => option !== "Need guidance");
  return <main id="main-content" tabIndex={-1}>
    <PageHero title="Simple, upfront pricing."><p>Fixed prices per unit type for interior renders and 360° tours. Your buyers see the finished flat before the slab is cast.</p></PageHero>
    <section className="section pricing-section" id="plans"><div className="wrap">
      <div className="section-heading"><h2>Clear prices. <em>No surprises.</em></h2><p>One price per floorplan, a set delivery time and two rounds of changes. Try one room free before you order: one sample per builder, with a watermark.</p></div>
      <PricingPlans />
    </div></section>
    <section className="section pricing-section" id="add-ons"><div className="wrap">
      <div className="section-heading"><h2>Add <em>what you need.</em></h2><p>Extras that work with any package.</p></div>
      <PricingAddOns />
    </div></section>
    <section className="section pricing-section" id="quoted"><div className="wrap">
      <div className="section-heading"><h2>For your <em>launch.</em></h2><p>Quoted after a short call, one project at a time. Prices below are starting points.</p></div>
      <QuotedServices />
    </div></section>
    <section className="section pricing-ranges" id="ranges"><div className="wrap">
      <div className="section-heading"><h2>What is your <em>budget?</em></h2><p>Pick the range closest to your budget when you enquire, or ask us for guidance. These help us suggest the right plan; they are not fixed prices.</p></div>
      <ol className="range-list">{ranges.map((range, i) => <li key={range}><span className="range-number">{String(i + 1).padStart(2, "0")}</span><span className="range-value">{range}</span><Link className="range-link" href="/project">Enquire <span aria-hidden="true">↗</span></Link></li>)}</ol>
      <p className="range-note">Not sure yet? Choose “Need guidance” on the <Link href="/project">project form</Link>. Payment, ownership and warranty terms are set out in the <Link href="/terms">project terms</Link>.</p>
    </div></section>
    <FinalCTA />
  </main>;
}
