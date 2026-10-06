import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./Brand";
import { studio } from "../../lib/studio";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-invitation">
          <span className="eyebrow">THE NEXT CONNECTION</span>
          <Link href="/project">
            <span>Start with a project brief.</span>
            <ArrowUpRight size={58} strokeWidth={1} aria-hidden="true" />
          </Link>
          <p>Outline the idea. We’ll help define the engineering.</p>
        </div>
        <div className="footer-top">
          <Brand />
          <p className="footer-description">
            Software, AI workflows, and spatial experiences.
          </p>
          <div className="footer-links">
            <Link href="/work">Selected work</Link>
            <Link href="/#services">What we do</Link>
            <Link href="/project">
              Start a project <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            {studio.email && (
              <a href={`mailto:${studio.email}`}>{studio.email}</a>
            )}
          </div>
          <div className="footer-location">
            <span className="eyebrow">BASED IN BENGALURU</span>
            <p>
              Building across borders.
              <br />
              India · US · UK · UAE · Australia · Singapore
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Anvaya</span>
          <span className="footer-meaning">
            अन्वय · Connection. Continuity. Order.
          </span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Project terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
