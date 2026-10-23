"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Logo";

// The ticker reads page depth like the tour's compass reads bearing: a tick every 2.5%, labelled every 10%.
const ticks = Array.from({ length: 41 }, (_, index) => index);

export function Header() {
  const pathname = usePathname();
  return <header className={`site-header${pathname === "/" ? " header-home" : ""}`}>
    <div className="header-inner">
      <Link className="brand" href="/" aria-label="Anvaya home"><Wordmark /><span className="brand-indic indic" lang="hi">अन्वय</span></Link>
      <div className="ticker" aria-hidden="true"><div className="ticker-strip">{ticks.map(tick => <span className={`tick${tick % 4 === 0 ? " major" : ""}`} key={tick}>{tick % 4 === 0 && <span>{String(tick * 2.5).padStart(2, "0")}</span>}</span>)}</div></div>
      <nav aria-label="Main navigation">
        <Link className="pill" href="/services" aria-current={pathname.startsWith("/services") ? "page" : undefined}>Services</Link>
        <Link className="pill" href="/studio" aria-current={pathname === "/studio" ? "page" : undefined}>Studio</Link>
      </nav>
      <Link href="/project" className="pill pill-solid header-project" aria-current={pathname === "/project" ? "page" : undefined}><span>Start a Project</span><span aria-hidden="true">↗</span></Link>
    </div>
  </header>;
}
