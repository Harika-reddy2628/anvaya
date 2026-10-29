import type { Metadata } from "next";
import Link from "next/link";
import { practices } from "./lib/site";
import { Action } from "./components/cinema/Shared";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

// Shown for unknown URLs and for notFound() in service and work pages.
export default function NotFound() {
  return <main id="main-content" className="state-page" tabIndex={-1}>
    <div className="wrap state-wrap">
      <p className="state-code" aria-hidden="true">4<span className="state-thread"><i /></span>4</p>
      <h1>Page not found.</h1>
      <p className="state-lede">This link may have moved or no longer exists. Here are the most useful places to go next.</p>
      <div className="state-actions"><Action href="/" light>Go to the home page</Action><Action href="/project">Start a project</Action></div>
      <nav className="state-links" aria-label="Popular pages">
        <p>Popular pages</p>
        <ul>
          <li><Link href="/services">All services</Link></li>
          {practices.map(p => <li key={p.id}><Link href={`/services/${p.slug}`}>{p.name}</Link></li>)}
          <li><Link href="/pricing">Pricing</Link></li>
          <li><Link href="/work">Our work</Link></li>
        </ul>
      </nav>
    </div>
  </main>;
}
