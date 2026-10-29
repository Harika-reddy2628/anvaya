import Link from "next/link";
import { Hero } from "./components/cinema/Hero";
import { ServiceDial } from "./components/cinema/ServiceDial";
import { Action, Faq, FinalCTA, PricingPlans, ProofSection, StepList } from "./components/cinema/Shared";
import { processSteps } from "./lib/site";

// Every answer restates the owner's published copy; nothing here adds new commitments.
const questions = [
  ["Which services are available now?", <p key="a">Websites & Branding and 3D Renders & Walkthroughs are open for new projects. Apps & Software and AI & Automation are coming soon.</p>],
  ["Do I need a detailed brief?", <p key="a">No. A few lines about what you need is enough. We will ask the right questions after that.</p>],
  ["Can I get more than one service?", <p key="a">Yes. Pick one service, or several — for example a website plus 3D renders. One team handles it all.</p>],
  ["How many review rounds are included?", <p key="a">Two rounds of changes per stage. Extra rounds are quoted before we start, so there are no surprise charges. See <Link href="/#pricing">pricing</Link>.</p>],
  ["How do payments work?", <p key="a">50% to start and 50% when the final work is delivered and checked, or through an agreed escrow service. The full details are in the <Link href="/terms">project terms</Link>.</p>],
  ["What happens after I send an enquiry?", <p key="a">We read your message, then reply with a clear next step — questions, a suggested plan or a price range. No generic sales script.</p>],
  ["Where is the studio based?", <p key="a">Anvaya is based in India and works with clients in India and around the world.</p>],
] as const;

export default function Home() {
  return <main id="main-content" tabIndex={-1}>
    <Hero />
    <section className="section build-section" id="what-we-build"><div className="wrap">
      <div className="section-heading"><h2>What we <em>do.</em></h2><p>Four services, one team. Pick what you need — from a new website to a 3D walkthrough of your next project.</p></div>
      <ServiceDial />
      <div className="cta-band"><p>Need more than one? We can combine them into a single project.</p><Action href="/project" light>Start a Project</Action></div>
    </div></section>
    <section className="section process-section" id="process"><div className="wrap">
      <div className="section-heading process-intro"><h2>How we <em>work.</em></h2><p>Every project is different. Our process stays simple and clear.</p></div>
      <StepList steps={processSteps} />
      <p className="process-closing">No jargon. No surprises. Just steady progress you can see.</p>
    </div></section>
    <section className="section pricing-section" id="pricing"><div className="wrap">
      <div className="section-heading"><h2>Clear prices. <em>No surprises.</em></h2><p>Published price ranges, clear timelines and a set number of changes — agreed in writing before we start.</p></div>
      <PricingPlans />
    </div></section>
    <section className="section proof-section" id="reviews"><div className="wrap">
      <div className="section-heading"><h2>What clients <em>say.</em></h2><p>We publish only genuine reviews from completed projects. The first ones will appear here.</p></div>
      <ProofSection />
    </div></section>
    <section className="section faq-section" id="faq"><div className="wrap">
      <div className="faq-layout"><h2>Before you <em>start.</em></h2><Faq items={questions} /></div>
    </div></section>
    <FinalCTA body="A new website, an app idea, a task to automate or a building to visualise — tell us what you need and we will reply with a clear next step." direct />
  </main>;
}
