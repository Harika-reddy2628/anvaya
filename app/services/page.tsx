import type { Metadata } from "next";
import { Action, FinalCTA, PageHero, ServiceBlocks } from "../components/cinema/Shared";

export const metadata: Metadata = { title: "Services", description: "Websites & Branding, Apps & Software, AI & Automation, and 3D Renders & Walkthroughs." };
export default function ServicesPage() {
  return <main id="main-content" tabIndex={-1}>
    <PageHero title="Our services." action="Start a Project"><p>Four services under one roof. Come to us for one, or for a bigger project that needs design, technology and automation together.</p></PageHero>
    <section className="section build-section" id="practices" data-rail="Our practices"><div className="wrap"><div className="capabilities-heading"><h2>Four services. One team.</h2><p>Each service works on its own. Together, they cover everything from your first website to running your operations.</p></div><ServiceBlocks /></div></section>
    <section className="section connection-section" id="connect" data-rail="How they connect"><div className="wrap"><div className="connection-grid"><h2>Not sure what you need? Tell us the problem.</h2><div className="section-copy"><p>A new website may also need a logo. An app may need a dashboard and WhatsApp updates. A building project may need 3D renders before construction starts.</p><p>We do not sell fixed packages. We start from what you need.</p><Action href="/project" text>Tell us what you need</Action></div></div></div></section>
    <section className="section working-section" id="working-model" data-rail="Working model"><div className="wrap"><h2>Three ways <em>to work with us.</em></h2><div className="working-model"><div><span aria-hidden="true">01</span><h3>One service</h3><p>For a single, clear need — like a new website.</p></div><div><span aria-hidden="true">02</span><h3>Combined project</h3><p>For work that needs more than one service.</p></div><div><span aria-hidden="true">03</span><h3>Monthly support</h3><p>For businesses that want an ongoing design and tech team.</p></div></div></div></section>
    <FinalCTA />
  </main>;
}
