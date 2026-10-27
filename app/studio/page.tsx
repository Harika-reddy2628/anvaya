import type { Metadata } from "next";
import { FinalCTA, PageHero } from "../components/cinema/Shared";

export const metadata: Metadata = { title: "Studio", description: "Connection, with intent. Meet Anvaya, a technology and design studio in India, working globally." };
export default function StudioPage() {
  return <main id="main-content" tabIndex={-1}>
    <PageHero title="About Anvaya."><p>Anvaya is a design and technology studio for founders and businesses with something to build or improve.</p><p>We handle websites, branding, apps, AI automation and 3D visuals — so you work with one team instead of four.</p></PageHero>
    <section className="section studio-name" id="name" data-rail="The name"><div className="wrap"><div className="connection-grid"><div><h2>Anvaya means connection, relationship and continuity.</h2><div lang="hi" className="name-mark" aria-hidden="true">अन्वय</div></div><div className="section-copy"><p>It is a Sanskrit word, and it describes how we work: connecting your idea to the result, design to technology, and your business to its customers.</p></div></div></div></section>
    <section className="section belief-section" id="belief" data-rail="The belief" data-tone="paper"><div className="wrap"><h2>Make. Move. <em>Matter.</em></h2><div className="belief-grid"><article><span>01 / BEGIN</span><h3>MAKE</h3><p>Begin with what is worth creating.</p></article><article><span>02 / CONNECT</span><h3>MOVE</h3><p>Build a connected system that helps the idea go somewhere.</p></article><article><span>03 / LEAVE IT STRONGER</span><h3>MATTER</h3><p>Leave the business, product or experience stronger than it was before.</p></article></div></div></section>
    <section className="section collaboration" id="collaborate" data-rail="Collaboration"><div className="wrap"><div className="connection-grid"><h2>We work closely with you.</h2><div className="section-copy"><p>We ask direct questions, share progress openly and keep every decision visible. You always know what is done, what is next and what it costs.</p><span className="mini-label location">INDIA / WORKING GLOBALLY</span></div></div></div></section>
    <FinalCTA heading="Let’s build something together." action="Start a conversation" />
  </main>;
}
