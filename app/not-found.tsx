import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="container inner-page not-found-page">
      <span className="eyebrow">404 / A MISSING CONNECTION</span>
      <h1>
        This page hasn’t
        <br />
        come together<span className="accent">.</span>
      </h1>
      <p>Let’s get you back to something we’ve built.</p>
      <Link href="/" className="button button-accent">
        Back to Anvaya <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </main>
  );
}
