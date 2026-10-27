import type { Metadata } from "next";
import { Action, FinalCTA, PageHero } from "../components/cinema/Shared";

export const metadata: Metadata = { title: "Blog", description: "Notes from the Anvaya studio on design, technology and space." };

// No articles are published yet; this page says so rather than showing placeholder posts.
export default function BlogPage() {
  return <main id="main-content" tabIndex={-1}>
    <PageHero eyebrow="BLOG" title="Notes from the studio."><p>Writing on design, technology, intelligent operations and space is on its way. The first articles are being prepared.</p><div className="not-found-actions"><Action href="/work">See our work</Action><Action href="/studio" text>About the studio</Action></div></PageHero>
    <FinalCTA />
  </main>;
}
