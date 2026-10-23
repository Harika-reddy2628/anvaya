import type { Metadata } from "next";
import { FinalCTA, Label, PageHero } from "../components/cinema/Shared";

export const metadata: Metadata = { title: "Studio", description: "Connection, with intent. Meet Anvaya, a technology and design studio in India, working globally." };
export default function StudioPage() {
  return <main id="main-content" tabIndex={-1}>
    <PageHero eyebrow="THE STUDIO" title="Connection, with intent."><p>Anvaya is a technology and design studio for founders, teams and businesses with something meaningful to build or improve.</p><p>We connect the decisions that shape how a business is seen, used and experienced — across brand, product, intelligent operations and space.</p></PageHero>
    <section className="section studio-name" id="name" data-rail="The name"><div className="wrap"><Label>01 — THE NAME</Label><div className="connection-grid"><div><h2>Anvaya means connection, relationship and continuity.</h2><div lang="hi" className="name-mark" aria-hidden="true">अन्वय</div></div><div className="section-copy"><p>The name reflects how we work. We look for the thread between the idea and the outcome, between design and technology, and between a business and the people it serves.</p></div></div></div></section>
    <section className="section belief-section" id="belief" data-rail="The belief" data-tone="paper"><div className="wrap"><Label>02 — THE BELIEF</Label><h2>Make. Move. <em>Matter.</em></h2><div className="belief-grid"><article><span>01 / BEGIN</span><h3>MAKE</h3><p>Begin with what is worth creating.</p></article><article><span>02 / CONNECT</span><h3>MOVE</h3><p>Build a connected system that helps the idea go somewhere.</p></article><article><span>03 / LEAVE IT STRONGER</span><h3>MATTER</h3><p>Leave the business, product or experience stronger than it was before.</p></article></div></div></section>
    <section className="section collaboration" id="collaborate" data-rail="Collaboration"><div className="wrap"><Label>03 — HOW WE COLLABORATE</Label><div className="connection-grid"><h2>Close enough to understand. Clear enough to move.</h2><div className="section-copy"><p>We work with people who care about what they are building. We ask direct questions, make decisions visible and keep the process focused on the outcome instead of unnecessary noise.</p><span className="mini-label location">INDIA / WORKING GLOBALLY</span></div></div></div></section>
    <FinalCTA heading="Let’s make the next move count." action="Start a conversation" />
  </main>;
}
