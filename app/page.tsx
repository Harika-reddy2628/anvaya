import Link from "next/link";
import { Hero } from "./components/cinema/Hero";
import { ServiceDial } from "./components/cinema/ServiceDial";
import { Action, EngagementCards, Faq, FinalCTA, Label, Marquee, StepList } from "./components/cinema/Shared";
import { processSteps } from "./lib/site";

// Every answer restates the owner's published copy; nothing here adds new commitments.
const questions = [
  ["Which practices can I start with today?", <p key="a">Digital Presence and Spatial Visuals are available for new projects. Digital Products and Intelligent Operations are coming soon.</p>],
  ["Do I need a complete brief?", <p key="a">No. Tell us what you are building, improving or trying to make clearer. You do not need to have every answer yet — a useful starting point is enough.</p>],
  ["Can one project cross more than one practice?", <p key="a">Yes. Choose one service, or bring us a problem that crosses all four. We shape the right combination around what needs to move.</p>],
  ["How do budgets work?", <p key="a">The <Link href="/project">project form</Link> offers INR ranges, or “Need guidance” if you are unsure. They are enquiry ranges, not fixed prices.</p>],
  ["What happens after I send an enquiry?", <p key="a">We read the context, find the right starting point and come back with a direction — a useful response, not a generic sales script.</p>],
  ["Where is the studio based?", <p key="a">Anvaya is a technology and design studio in India, working globally.</p>],
] as const;

export default function Home() {
  return <main id="main-content" tabIndex={-1}>
    <Hero />
    <section className="section build-section" id="what-we-build"><div className="wrap">
      <Label>01 — WHAT WE DO</Label>
      <div className="section-heading"><h2>One idea. <em>Every capability it needs.</em></h2><p>From a first sketch to a working system, Anvaya brings together the right design, technology and visual talent to make your idea real.</p></div>
      <ServiceDial />
      <div className="cta-band"><p>Choose one service, or bring us a problem that crosses all four.</p><Action href="/project" light>Start a Project</Action></div>
    </div></section>
    <Marquee rows={[["Brand", "Product", "Systems", "Space", "Brand", "Product", "Systems", "Space"]]} />
    <section className="section point-section" id="point"><div className="wrap">
      <Label>02 — THE POINT OF ANVAYA</Label>
      <div className="point-grid">
        <div className="point-title"><span className="mini-label">Connection, with intent.</span><h2>Good work is never just <em>one thing.</em></h2></div>
        <div className="section-copy"><p>A brand needs more than a beautiful website. A product needs more than a polished interface. Automation needs more than a clever tool.</p><p>The parts need to agree: the idea, the experience, the system behind it and the people using it. That is where Anvaya begins.</p><p className="closing-line">We build connected work that makes the next move clearer.</p></div>
      </div>
    </div></section>
    <section className="section why-section" id="connected-studio"><div className="wrap">
      <Label>03 — WHY ANVAYA</Label>
      <div className="section-heading"><h2>Not four separate teams. <em>One shared direction.</em></h2><div className="section-copy"><p>The best digital work does not stop at the screen. A website affects a brand. A product affects how a team works. An automation affects the customer experience. A visual affects how a space is understood.</p><p>We connect these decisions early, so the finished work feels more deliberate, more useful and easier to carry forward.</p></div></div>
      <div className="principles"><article><span aria-hidden="true">01</span><h3>Clarity before noise</h3><p>We make the purpose clear before adding more.</p></article><article><span aria-hidden="true">02</span><h3>Systems, not just surfaces</h3><p>We consider what happens behind the interface as carefully as what appears on it.</p></article><article><span aria-hidden="true">03</span><h3>Useful over showy</h3><p>The work should move people and business forward, not just look impressive for a moment.</p></article></div>
      <Action href="/studio">Meet the studio</Action>
    </div></section>
    <section className="section process-section" id="process"><div className="wrap">
      <Label>04 — HOW WE WORK</Label>
      <div className="section-heading process-intro"><h2>Clear before <em>clever.</em></h2><p>Every project needs a different answer. The way we get there stays simple.</p></div>
      <StepList steps={processSteps} />
      <p className="process-closing">No unnecessary theatre. Just a clear way forward.</p>
    </div></section>
    <section className="section engagement-section" id="engagement"><div className="wrap">
      <Label>05 — WAYS TO WORK TOGETHER</Label>
      <div className="section-heading"><h2>Focused when needed. <em>Connected when it matters.</em></h2><p>We do not begin with a fixed package. We begin with what needs to move.</p></div>
      <EngagementCards />
    </div></section>
    <section className="section studio-note" id="studio"><div className="wrap">
      <Label>06 — THE STUDIO</Label>
      <div className="studio-note-grid">
        <div className="studio-note-visual" aria-hidden="true"><span className="mini-label">A continuous thread</span><span className="indic" lang="hi">अन्वय</span></div>
        <div><h2>Built for ideas that need to <em>become real.</em></h2><div className="section-copy"><p>Anvaya is a technology and design studio for founders, teams and businesses with something meaningful to build or improve.</p><p>We work across digital presence, products, intelligent operations and spatial visuals — with one aim: to make the next move matter.</p></div><span className="mini-label location">India / Working globally</span><Action href="/studio" text>About Anvaya</Action></div>
      </div>
    </div></section>
    <section className="section faq-section" id="faq"><div className="wrap">
      <Label>07 — QUESTIONS</Label>
      <div className="faq-layout"><h2>Before you <em>start.</em></h2><Faq items={questions} /></div>
    </div></section>
    <FinalCTA number="08" body="Whether it is a new idea, a product that needs direction, a business process that needs to move better or a space that needs to be seen — start with the outcome." direct />
  </main>;
}
