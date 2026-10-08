import type { Metadata } from "next";
import { Action, FinalCTA, Label, PageHero, ServiceBlocks } from "../components/connected/Shared";

export const metadata: Metadata = { title: "Services", description: "Four connected practices: Digital Presence, Digital Products, Intelligent Operations and Spatial Visuals." };
export default function ServicesPage() {
  return <main id="main-content" tabIndex={-1}>
    <PageHero eyebrow="CAPABILITIES" title="The right work rarely sits in one box." action="Start a Project"><p>Anvaya is built around four connected practices. You can come to us for one focused service or for a broader problem that needs design, technology and operations to work together.</p></PageHero>
    <section className="section build-section" id="practices"><div className="container"><Label>01 — OUR PRACTICES</Label><div className="capabilities-heading"><h2>Four practices. One clear direction.</h2><p>Each practice can stand on its own. Together, they create work that is easier to understand, use and grow.</p></div><ServiceBlocks /></div></section>
    <section className="section connection-section"><div className="container"><Label>02 — HOW THE PRACTICES CONNECT</Label><div className="connection-grid"><h2>Bring one problem. We will find the right combination.</h2><div className="section-copy"><p>A new website may need a clearer brand system. A digital product may need a dashboard, automation and a customer journey. An architectural project may need a visual story before the space exists.</p><p>We do not begin with a fixed package. We begin with what needs to move.</p><Action href="/project" text>Tell us what needs to move</Action></div></div></div></section>
    <section className="section"><div className="container"><Label>03 — WORKING MODEL</Label><h2>Focused when needed.<br />Connected when it matters.</h2><div className="working-model"><div><h3>One practice</h3><p>For a clearly defined need.</p></div><div><h3>Connected project</h3><p>For work that crosses brand, product, systems or space.</p></div><div><h3>Ongoing partnership</h3><p>For teams that need design and technology support as they grow.</p></div></div></div></section>
    <FinalCTA />
  </main>;
}
