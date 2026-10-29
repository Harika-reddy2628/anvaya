import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { contact, plans, practices, proof, socialIcons, terms } from "../../lib/site";
import { StudioClock } from "./Hero";

export function Action({ href = "/project", children = "Start a Project", light = false, text = false }: { href?: string; children?: ReactNode; light?: boolean; text?: boolean }) {
  return <Link href={href} className={`action${light ? " action-light" : ""}${text ? " action-text" : ""}`}><span>{children}</span><span className="action-arrow" aria-hidden="true">↗</span></Link>;
}

export function ComingSoon() {
  return <span className="practice-status">Coming soon</span>;
}
export function FinalCTA({ heading = "Ready to start your project?", body = "Tell us what you need in a few lines. We will reply with a clear next step.", action = "Start a Project", href = "/project", direct = false }: { heading?: string; body?: string; action?: string; href?: string; direct?: boolean }) {
  return <section className="final-cta section" id="next-move" data-rail="The next move"><div className="wrap">
    <h2>{heading}</h2>
    <div className="cta-foot"><p>{body}</p><div><Action href={href} light>{action}</Action>{direct && contact.email && <p className="direct-line">Prefer a direct note? Write to <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>}</div></div>
  </div></section>;
}
/** Simple 24px social glyphs, drawn in currentColor. */
const glyphs: Record<string, ReactNode> = {
  LinkedIn: <><rect x="3" y="9" width="4" height="12" /><circle cx="5" cy="4.5" r="2" /><path d="M10 9h3.8v1.7c.6-1 1.9-2 3.9-2 3.4 0 4.3 2.2 4.3 5.3V21h-4v-6.3c0-1.5-.3-2.8-1.9-2.8s-2.1 1.2-2.1 2.8V21h-4z" /></>,
  Instagram: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.3" cy="6.7" r="1.2" /></>,
  X: <path d="M4 3h4.6l4.1 5.8L17.6 3H20l-6.2 7.4L21 21h-4.6l-4.5-6.3L6.4 21H4l6.8-8z" />,
  Behance: <path d="M3 6h5.2c2.2 0 3.6 1 3.6 2.9 0 1.2-.7 2-1.6 2.4 1.3.3 2.2 1.3 2.2 2.8 0 2.2-1.7 3.4-4 3.4H3zm2.6 2.1v2.6h2.3c.9 0 1.4-.5 1.4-1.3s-.5-1.3-1.4-1.3zm0 4.6v3h2.5c1.1 0 1.7-.6 1.7-1.5s-.6-1.5-1.7-1.5zM14.5 7h5.6v1.4h-5.6zm2.9 2.8c2.6 0 4 1.8 4 4.4v.6h-5.9c.1 1.3.9 2 2 2 .9 0 1.4-.4 1.7-1h2c-.5 1.9-1.9 2.8-3.8 2.8-2.5 0-4.1-1.7-4.1-4.4 0-2.5 1.6-4.4 4.1-4.4zm-1.9 3.6h3.8c-.1-1.1-.8-1.8-1.9-1.8s-1.7.7-1.9 1.8z" />,
  Dribbble: <><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M5 7.5c4 1 8.3.5 12.5-2.2M3.4 13.5c5.2-2.6 11-2.4 17.2.3M8.5 20c1.2-5.4 4-10 7-15.6" fill="none" stroke="currentColor" strokeWidth="1.6" /></>,
  GitHub: <path d="M12 2.5a9.7 9.7 0 0 0-3 18.9c.5.1.7-.2.7-.5v-1.7c-2.7.6-3.3-1.2-3.3-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.2-4.4-1.1-4.4-4.8 0-1.1.4-1.9 1-2.6-.1-.3-.4-1.2.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.3.1 2.6.6.7 1 1.5 1 2.6 0 3.7-2.3 4.6-4.4 4.8.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.7 9.7 0 0 0 12 2.5z" />,
};
function SocialIcon({ name, href }: { name: string; href: string }) {
  const svg = <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{glyphs[name]}</svg>;
  // Until a profile URL is configured the icon is shown but is not a link, so nothing points nowhere.
  return href
    ? <a className="social-icon" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Anvaya on ${name}`}>{svg}<span>{name}</span></a>
    : <span className="social-icon is-pending" title={`${name} — link coming soon`}>{svg}<span>{name}</span><span className="sr-only"> (coming soon)</span></span>;
}
export function Footer() {
  return <footer className="site-footer"><div className="wrap-full">
    <div className="footer-panel">
      {/* Soft diagonal beams of blue light drifting across the panel, over the name and under the text. */}
      <div className="footer-beams" aria-hidden="true" />
      <div className="footer-grid">
        <div className="footer-intro">
          <p className="footer-heading">© 2026 Anvaya Digital Studio</p>
          <div className="social-row">{socialIcons.map(s => <SocialIcon key={s.name} name={s.name} href={s.href} />)}</div>
          <p className="footer-note">A technology and design studio. <b>Ambitious ideas, built to last.</b></p>
          <address className="footer-note"><b>India</b> · Working globally · <StudioClock className="footer-clock" /></address>
          <p className="footer-note"><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/project">Start a Project</Link></p>
        </div>
        <nav aria-label="Footer navigation"><p className="footer-heading">Explore</p><Link href="/work">Works</Link><Link href="/services">Services</Link><Link href="/pricing">Pricing</Link><Link href="/blog">Blog</Link><Link href="/studio">Studio</Link></nav>
        <nav aria-label="Footer services"><p className="footer-heading">Services</p>{practices.map(p => <Link key={p.id} href={`/services/${p.slug}`}>{p.name}</Link>)}</nav>
      </div>
      {/* The name, huge and blue, fading into the dark and cut by the panel's bottom edge. */}
      <Link href="/" className="footer-wordmark" aria-label="Anvaya home" tabIndex={-1}><span className="footer-word">Anvaya</span></Link>
    </div>
  </div></footer>;
}
/** Practical pricing: three published offers, each with range, timeline and review rounds, then the shared terms. */
export function PricingPlans() {
  return <>
    <div className="plan-grid">{plans.map(plan => <article className={`plan-card${plan.available ? "" : " is-soon"}`} key={plan.id}>
      <p className="plan-practice">{plan.practice}{!plan.available && <> <ComingSoon /></>}</p>
      <h3>{plan.name}</h3>
      <p className="plan-price"><b>{plan.price}</b><span>{plan.unit} · {plan.alt}</span></p>
      <dl className="plan-facts"><div><dt>Timeline</dt><dd>{plan.timeline}</dd></div><div><dt>Reviews</dt><dd>{plan.rounds}</dd></div><div><dt>Warranty</dt><dd>14-day defect fixes</dd></div></dl>
      <ul className="plan-includes">{plan.includes.map(item => <li key={item}>{item}</li>)}</ul>
      {plan.available ? <Action href={`/project?service=${plan.id === "spatial" ? "spatial" : "unsure"}`}>Enquire about this</Action> : <Action href="/services" text>See available services</Action>}
    </article>)}</div>
    <dl className="terms-grid">{terms.map(([term, detail]) => <div key={term}><dt>{term}</dt><dd>{detail}</dd></div>)}</dl>
    <p className="terms-note">Ranges are indicative and tied to the described scope. Exact deliverables, dates and price are fixed in your agreed project scope. Full details in the <Link href="/terms">project terms</Link>.</p>
  </>;
}
/** Reviews and testimonials, held at zero until genuine ones are collected. */
export function ProofSection() {
  return <>
    <dl className="proof-stats">
      <div><dt>Client reviews</dt><dd>{proof.reviews}</dd></div>
      <div><dt>Average rating</dt><dd>{proof.rating.toFixed(1)}<small>/ 5</small></dd></div>
      <div><dt>Testimonials</dt><dd>{proof.testimonials}</dd></div>
      <div><dt>Published case studies</dt><dd>{proof.caseStudies}</dd></div>
    </dl>
    <ul className="testimonial-slots" aria-label="Testimonials">{[1, 2, 3].map(n => <li key={n}><span className="slot-mark" aria-hidden="true">“</span><p>Reserved for a client testimonial.</p><span className="slot-meta">Name · Role · Company</span></li>)}</ul>
  </>;
}
export function PageHero({ title, children, action, href, practice, comingSoon = false }: { title: string; children: ReactNode; action?: string; href?: string; practice?: number; comingSoon?: boolean }) {
  return <section className={`page-hero${practice !== undefined ? " page-hero-art" : ""}`} id="intro"><div className="wrap-full page-hero-grid">
    <div className="page-hero-copy">
      <h1>{title}</h1>{comingSoon && <ComingSoon />}
      <div className="page-intro">{children}</div>
      {action && <Action href={href} light>{action}</Action>}
    </div>
    {practice !== undefined && <p className="page-hero-number" aria-hidden="true"><span>Service</span>{practices[practice].number}<small>/ 04</small></p>}
  </div></section>;
}
/** Services: full-frame practice cards that stack as the reader scrolls (CSS sticky; GSAP dims the covered card). */
export function ServiceBlocks() {
  return <div className="service-stack">{practices.map((p, index) => <article className="service-block" key={p.id} style={{ "--i": index } as CSSProperties}>
    <div className="service-body">
      <div className="service-head"><span className="service-index" aria-hidden="true">{p.number}</span></div>
      <div className="service-description"><h3>{p.name}{p.comingSoon && <> <ComingSoon /></>}</h3><p>{p.summary}</p><p className="service-tags">{p.tags}</p><Action href={`/services/${p.slug}`} text>{p.comingSoon ? "Preview" : "Explore"} {p.name}</Action></div>
    </div>
    <div className="service-mark" aria-hidden="true"><span>{p.number}</span><p>{p.line}</p></div>
    <span className="service-shade" aria-hidden="true" />
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
