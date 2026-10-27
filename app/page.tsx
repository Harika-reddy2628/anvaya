import Link from "next/link";
import { Hero } from "./components/cinema/Hero";
import { ServiceDial } from "./components/cinema/ServiceDial";
import { Action, Faq, FinalCTA, PricingPlans, ProofSection, StepList } from "./components/cinema/Shared";
import { processSteps } from "./lib/site";

// Every answer restates the owner's published copy; nothing here adds new commitments.
const questions = [
  ["Which practices can I start with today?", <p key="a">Digital Presence and Spatial Visuals are available for new projects. Digital Products and Intelligent Operations are coming soon.</p>],
  ["Do I need a complete brief?", <p key="a">No. Tell us what you are building, improving or trying to make clearer. You do not need to have every answer yet — a useful starting point is enough.</p>],
  ["Can one project cross more than one practice?", <p key="a">Yes. Choose one service, or bring us a problem that crosses all four. We shape the right combination around what needs to move.</p>],
  ["How many review rounds are included?", <p key="a">Two rounds of changes per stage. Further rounds are quoted before work begins, so nothing is billed by surprise. See <Link href="/#pricing">pricing</Link>.</p>],
  ["How do payments work?", <p key="a">50% to begin and 50% on final verified delivery, or an agreed, fully funded platform escrow. The full details are in the <Link href="/terms">project terms</Link>.</p>],
  ["What happens after I send an enquiry?", <p key="a">We read the context, find the right starting point and come back with a direction — a useful response, not a generic sales script.</p>],
  ["Where is the studio based?", <p key="a">Anvaya is a technology and design studio in India, working globally.</p>],
] as const;

export default function Home() {
  return <main id="main-content" tabIndex={-1}>
    <Hero />
    <section className="section build-section" id="what-we-build"><div className="wrap">
      <div className="section-heading"><h2>One idea. <em>Every capability it needs.</em></h2><p>From a first sketch to a working system, Anvaya brings together the right design, technology and visual talent to make your idea real.</p></div>
      <ServiceDial />
      <div className="cta-band"><p>Choose one service, or bring us a problem that crosses all four.</p><Action href="/project" light>Start a Project</Action></div>
    </div></section>
    <section className="section process-section" id="process"><div className="wrap">
      <div className="section-heading process-intro"><h2>Clear before <em>clever.</em></h2><p>Every project needs a different answer. The way we get there stays simple.</p></div>
      <StepList steps={processSteps} />
      <p className="process-closing">No unnecessary theatre. Just a clear way forward.</p>
    </div></section>
    <section className="section pricing-section" id="pricing"><div className="wrap">
      <div className="section-heading"><h2>Clear prices. <em>No surprises.</em></h2><p>Published ranges, fixed timelines and a set number of review rounds — agreed in writing before any work begins.</p></div>
      <PricingPlans />
    </div></section>
    <section className="section proof-section" id="reviews"><div className="wrap">
      <div className="section-heading"><h2>What clients <em>say.</em></h2><p>We publish only genuine reviews from completed projects. The first ones will appear here.</p></div>
      <ProofSection />
    </div></section>
    <section className="section faq-section" id="faq"><div className="wrap">
      <div className="faq-layout"><h2>Before you <em>start.</em></h2><Faq items={questions} /></div>
    </div></section>
    <FinalCTA body="Whether it is a new idea, a product that needs direction, a business process that needs to move better or a space that needs to be seen — start with the outcome." direct />
  </main>;
}
