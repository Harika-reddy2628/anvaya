import Image from "next/image";
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
      <nav aria-label="Footer navigation"><Link href="/services">Services</Link><Link href="/studio">Studio</Link><Link href="/project">Start a Project ↗</Link></nav>
      <div className="footer-contact">{contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}{contact.socials.map(([name, url]) => <a href={url} key={name} target="_blank" rel="noopener noreferrer">{name} ↗</a>)}</div>
    </div>
    <Link href="/" className="footer-wordmark" aria-label="Anvaya home"><Wordmark className="footer-word" /></Link>
    <div className="footer-bottom"><p>© 2026 Anvaya Digital Studio. All rights reserved.</p><span lang="hi" className="indic">अन्वय</span><Link href="/privacy">Privacy</Link></div>
  </div></footer>;
}
export function PageHero({ eyebrow, title, children, action, href, practice, comingSoon = false }: { eyebrow: string; title: string; children: ReactNode; action?: string; href?: string; practice?: number; comingSoon?: boolean }) {
  return <section className={`page-hero${practice !== undefined ? " page-hero-art" : ""}`} id="intro" data-rail={eyebrow.charAt(0) + eyebrow.slice(1).toLowerCase()}><div className="wrap-full page-hero-grid">
    <div className="page-hero-copy">
      <Label>{eyebrow}</Label>
      <h1>{title}</h1>{comingSoon && <ComingSoon />}
      <div className="page-intro">{children}</div>
      {action && <Action href={href} light>{action}</Action>}
    </div>
    {practice !== undefined && <figure className="plan-frame"><figcaption className="plan-head"><span>Practice {practices[practice].number} / 04</span><span>{practices[practice].name}</span></figcaption><WorldArt index={practice} large /></figure>}
  </div><div className="wrap-full page-hero-meta" aria-hidden="true"><span>Anvaya / {eyebrow}</span><span>India / Working globally</span><span className="meta-bar"><i /></span></div></section>;
}
export function WorldArt({ index, large = false }: { index: number; large?: boolean }) {
  const name = practices[index].name;
  return <div className={`world-art world-art-${index}${large ? " world-art-large" : ""}`} aria-hidden="true"><svg viewBox="0 0 600 440" fill="none"><path d="M0 367H600M0 368L300 220L600 368M75 440L300 220L525 440M225 440L300 220L375 440" stroke="currentColor" opacity=".14" />{index === 0 && <g><path d="M120 290V100H458V290Z" fill="var(--art-face)" stroke="currentColor" strokeWidth="1.5" /><path d="M120 100L150 77H487L458 100M458 290L487 266V77" stroke="currentColor" opacity=".45" /><path d="M120 132H458M151 170H271M151 184H232M151 239H210" stroke="currentColor" strokeWidth="2" opacity=".5" /><rect x="310" y="162" width="114" height="94" fill="var(--art-block)" /><circle cx="140" cy="116" r="3" fill="var(--accent)" /><path d="M0 322H94Q115 322 115 301V259Q115 239 138 239H151M210 239H245Q269 239 269 265V306Q269 329 292 329H600" className="art-thread" /></g>}{index === 1 && <g><path d="M119 297V126L344 79V250Z" fill="var(--art-face)" stroke="currentColor" /><path d="M119 126L139 140L364 93L344 79M364 93V264L139 312L119 297M139 140V312" stroke="currentColor" opacity=".5" /><path d="M291 331V161L468 122V292Z" fill="var(--art-block)" stroke="currentColor" /><path d="M312 185L441 156M312 210L364 198M312 258L342 252L342 228L365 223L365 246L387 241L387 205L411 200L411 236L440 230" stroke="currentColor" opacity=".5" /><path d="M0 351H78Q100 351 100 331V290Q100 270 122 265L185 251Q207 246 207 266V343Q207 368 233 368H600" className="art-thread" /></g>}{index === 2 && <g><path d="M132 163L208 122L281 164L207 207Z" fill="var(--art-face)" stroke="currentColor" /><path d="M207 207V256L132 214V163M207 256L281 215V164" stroke="currentColor" opacity=".45" /><path d="M320 249L396 207L469 249L395 292Z" fill="var(--art-block)" stroke="currentColor" /><path d="M395 292V341L320 299V249M395 341L469 300V249" stroke="currentColor" opacity=".45" /><path d="M0 323H71Q100 323 100 294V245Q100 219 126 205L164 184M248 184L283 204Q302 215 283 226L252 243Q232 254 252 267L309 300M469 274L509 297Q530 310 550 310H600" className="art-thread" /><circle cx="297" cy="220" r="6" fill="var(--accent)" /><circle cx="104" cy="237" r="5" fill="var(--accent)" /></g>}{index === 3 && <g><path d="M167 344V162C167 58 391 58 391 162V344H344V165C344 103 215 103 215 165V344Z" fill="var(--art-face)" stroke="currentColor" /><path d="M167 344L199 322M391 344L423 322V144C423 63 267 33 202 101M391 162L423 144M344 344L376 323V164C376 130 336 111 306 112" stroke="currentColor" opacity=".4" /><path d="M215 344H344M230 344L262 294H317L344 344" stroke="currentColor" opacity=".15" /><path d="M0 368H238Q276 368 276 329V232Q276 211 296 211Q315 211 315 231V301Q315 320 338 320H600" className="art-thread" /></g>}</svg><span className="art-caption">{String(index + 1).padStart(2, "0")} / {name}</span><span className="art-corner">↗</span></div>;
}
/** What we build: full-frame practice cards that stack as the reader scrolls (CSS sticky; GSAP dims the covered card). */
export function ServiceBlocks() {
  return <div className="service-stack">{practices.map((p, index) => <article className="service-block" key={p.id} style={{ "--i": index } as CSSProperties}>
    <div className="service-body">
      <div className="service-head"><span className="service-index" aria-hidden="true">{p.number}</span><span className="mini-label">{p.number} / 04 — Practice</span></div>
      <div className="service-description"><h3>{p.name}{p.comingSoon && <> <ComingSoon /></>}</h3><p>{p.summary}</p><p className="service-tags">{p.tags}</p><Action href={`/services/${p.slug}`} text>{p.comingSoon ? "Preview" : "Explore"} {p.name}</Action></div>
    </div>
    <Link className="service-art-link" href={`/services/${p.slug}`} aria-label={`${p.comingSoon ? "Preview" : "Explore"} ${p.name}${p.comingSoon ? " — Coming soon" : ""}`}><Image src={`/art/worlds/${p.slug}-frame.webp`} alt="" fill sizes="(max-width: 760px) 100vw, 58vw" /><span className="art-caption" aria-hidden="true">{p.number} / {p.name}</span><span className="art-corner" aria-hidden="true">↗</span></Link>
    <span className="service-shade" aria-hidden="true" />
  </article>)}</div>;
}
export function StepList({ steps }: { steps: readonly (readonly [string, string])[] }) {
  return <ol className="step-list">{steps.map(([title, body], index) => <li key={title}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>;
}
export function Marquee({ rows }: { rows: readonly (readonly string[])[] }) {
  return <div className="marquee" aria-hidden="true">{rows.map((words, row) => <div className="marquee-track" key={row}>{[0, 1].map(copy => <span key={copy}>{words.map((word, index) => <span className="marquee-item" key={index}>{word}<i className="marquee-bindu" /></span>)}</span>)}</div>)}</div>;
}
