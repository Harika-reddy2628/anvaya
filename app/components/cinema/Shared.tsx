import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { contact, practices } from "../../lib/site";
import { Wordmark } from "./Logo";

export function Action({ href = "/project", children = "Start a Project", light = false, text = false }: { href?: string; children?: ReactNode; light?: boolean; text?: boolean }) {
  return <Link href={href} className={`action${light ? " action-light" : ""}${text ? " action-text" : ""}`}><span>{children}</span><span className="action-arrow" aria-hidden="true">↗</span></Link>;
}

/** Kicker in the tour's format: the accent number, then the label. "01 — LABEL" splits into both parts. */
export function Label({ children }: { children: ReactNode }) {
  const match = typeof children === "string" ? /^(\d{2}) — (.+)$/.exec(children) : null;
  return <p className="section-label">{match ? <><b>{match[1]}</b><span className="slash" aria-hidden="true">/</span><span>{match[2]}</span></> : <><span className="bindu" aria-hidden="true" /><span>{children}</span></>}</p>;
}
export function ComingSoon() {
  return <span className="practice-status">Coming soon</span>;
}
export function FinalCTA({ heading = "Have something worth building?", body = "Bring us the idea, the bottleneck or the unfinished system. We will begin with the real outcome.", action = "Start a Project", href = "/project", number, direct = false }: { heading?: string; body?: string; action?: string; href?: string; number?: string; direct?: boolean }) {
  return <section className="final-cta section" id="next-move" data-rail="The next move"><div className="wrap">
    <Label>{number ? `${number} — THE NEXT MOVE` : "THE NEXT MOVE"}</Label>
    <h2>{heading}</h2>
    <div className="cta-foot"><p>{body}</p><div><Action href={href} light>{action}</Action>{direct && contact.email && <p className="direct-line">Prefer a direct note? Write to <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>}</div></div>
  </div></section>;
}
export function Footer() {
  return <footer className="site-footer"><div className="wrap-full">
    <div className="footer-top">
      <p className="footer-statement">Technology and design studio.<br />Make / Move / Matter.<br /><span>India, working globally.</span></p>
      <nav aria-label="Footer navigation"><Link href="/work">Works</Link><Link href="/services">Services</Link><Link href="/studio">Studio</Link><Link href="/pricing">Pricing</Link><Link href="/blog">Blog</Link><Link href="/project">Start a Project ↗</Link></nav>
      <div className="footer-contact">{contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}{contact.socials.map(([name, url]) => <a href={url} key={name} target="_blank" rel="noopener noreferrer">{name} ↗</a>)}</div>
    </div>
    <Link href="/" className="footer-wordmark" aria-label="Anvaya home"><Wordmark className="footer-word" /></Link>
    <div className="footer-bottom"><p>© 2026 Anvaya Digital Studio. All rights reserved.</p><span lang="hi" className="indic">अन्वय</span><Link href="/privacy">Privacy</Link></div>
  </div></footer>;
}
export function PageHero({ eyebrow, title, children, action, href, practice, comingSoon = false }: { eyebrow: string; title: string; children: ReactNode; action?: string; href?: string; practice?: number; comingSoon?: boolean }) {
  return <section className={`page-hero${practice !== undefined ? " page-hero-art" : ""}`} id="intro"><div className="wrap-full page-hero-grid">
    <div className="page-hero-copy">
      <Label>{eyebrow}</Label>
      <h1>{title}</h1>{comingSoon && <ComingSoon />}
      <div className="page-intro">{children}</div>
      {action && <Action href={href} light>{action}</Action>}
    </div>
    {practice !== undefined && <p className="page-hero-number" aria-hidden="true"><span>Practice</span>{practices[practice].number}<small>/ 04</small></p>}
  </div><div className="wrap-full page-hero-meta" aria-hidden="true"><span>Anvaya / {eyebrow}</span><span>India / Working globally</span><span className="meta-bar"><i /></span></div></section>;
}
/** Services: full-frame practice cards that stack as the reader scrolls (CSS sticky; GSAP dims the covered card). */
export function ServiceBlocks() {
  return <div className="service-stack">{practices.map((p, index) => <article className="service-block" key={p.id} style={{ "--i": index } as CSSProperties}>
    <div className="service-body">
      <div className="service-head"><span className="service-index" aria-hidden="true">{p.number}</span><span className="mini-label">{p.number} / 04 — Practice</span></div>
      <div className="service-description"><h3>{p.name}{p.comingSoon && <> <ComingSoon /></>}</h3><p>{p.summary}</p><p className="service-tags">{p.tags}</p><Action href={`/services/${p.slug}`} text>{p.comingSoon ? "Preview" : "Explore"} {p.name}</Action></div>
    </div>
    <div className="service-mark" aria-hidden="true"><span>{p.number}</span><p>{p.line}</p></div>
    <span className="service-shade" aria-hidden="true" />
  </article>)}</div>;
}
/** Ways to engage, from the owner's working model. Enquiry ranges live on the form, never as prices here. */
export function EngagementCards() {
  const models = [
    ["01", "One practice", "For a clearly defined need.", "/project"],
    ["02", "Connected project", "For work that crosses brand, product, systems or space.", "/project"],
    ["03", "Ongoing partnership", "For teams that need design and technology support as they grow.", "/project"],
  ] as const;
  return <div className="engagement-grid">{models.map(([n, title, body, href], index) => <article className={`engagement-card${index === 1 ? " is-featured" : ""}`} key={n}>
    <span className="engagement-number">{n}</span><h3>{title}</h3><p>{body}</p>
    <Action href={href} light={index === 1}>Enquire about {title.toLowerCase()}</Action>
  </article>)}</div>;
}
export function Faq({ items }: { items: readonly (readonly [string, ReactNode])[] }) {
  return <div className="faq-list">{items.map(([question, answer], index) => <details className="faq-item" key={question}><summary><span className="faq-number">{String(index + 1).padStart(2, "0")}</span><span className="faq-question">{question}</span><span className="faq-icon" aria-hidden="true" /></summary><div className="faq-answer">{answer}</div></details>)}</div>;
}
export function StepList({ steps }: { steps: readonly (readonly [string, string])[] }) {
  return <ol className="step-list">{steps.map(([title, body], index) => <li key={title}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>;
}
export function Marquee({ rows }: { rows: readonly (readonly string[])[] }) {
  return <div className="marquee" aria-hidden="true">{rows.map((words, row) => <div className="marquee-track" key={row}>{[0, 1].map(copy => <span key={copy}>{words.map((word, index) => <span className="marquee-item" key={index}>{word}<i className="marquee-bindu" /></span>)}</span>)}</div>)}</div>;
}
