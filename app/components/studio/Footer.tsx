import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { studio } from "../../lib/studio";

export function Footer() {
  return (
    <footer className="site-footer bg-[#101116] text-[#f5f6fa] border-t border-white/10">
      <div className="container py-16 md:py-24">
        {/* Top Invitation */}
        <div className="footer-invitation border-b border-white/10 pb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#b9becd]">
            THE NEXT CONNECTION
          </span>
          <Link
            href="/project"
            className="flex items-center justify-between gap-6 my-6 text-[#f5f6fa] hover:text-[#2454ff] transition-colors group"
          >
            <span className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
              Start with a project brief.
            </span>
            <ArrowUpRight
              size={56}
              strokeWidth={1}
              className="text-[#2454ff] transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 shrink-0"
              aria-hidden="true"
            />
          </Link>
          <p className="text-[#b9becd] text-lg max-w-xl">
            Outline the idea. We’ll help define the engineering, architecture, and timeline.
          </p>
        </div>

        {/* Middle Navigation & Provenance */}
        <div className="footer-top grid grid-cols-1 md:grid-cols-3 gap-12 py-16 border-b border-white/10">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-white">ANVAYA</span>
              <span className="text-base font-serif text-[#b9becd]">अन्वय</span>
            </div>
            <p className="text-[#b9becd] mt-4 max-w-sm text-sm leading-relaxed">
              Software engineering, autonomous AI workflows, and spatial 3D experiences.
            </p>
          </div>

          <div className="flex flex-col gap-3 font-medium text-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-[#b9becd] mb-1">
              Index
            </span>
            <Link href="/work" className="hover:text-[#2454ff] transition-colors">
              Selected work
            </Link>
            <Link href="/#services" className="hover:text-[#2454ff] transition-colors">
              What we do
            </Link>
            <Link
              href="/project"
              className="hover:text-[#2454ff] transition-colors inline-flex items-center gap-1 text-[#2454ff]"
            >
              Start a project <ArrowUpRight size={14} />
            </Link>
            {studio.email && (
              <a
                href={`mailto:${studio.email}`}
                className="hover:text-[#2454ff] transition-colors"
              >
                {studio.email}
              </a>
            )}
          </div>

          <div className="md:text-right">
            <span className="font-mono text-xs uppercase tracking-wider text-[#b9becd]">
              BASED IN BENGALURU
            </span>
            <p className="text-[#b9becd] mt-3 text-sm leading-relaxed">
              Building across borders.<br />
              India · US · UK · UAE · Australia · Singapore
            </p>
          </div>
        </div>

        {/* Large Solid ANVAYA Wordmark */}
        <div className="py-12 flex justify-center overflow-hidden select-none" aria-hidden="true">
          <span className="font-sans font-black text-[clamp(4.5rem,15vw,14rem)] leading-none tracking-[-0.04em] text-white/[0.06] text-center w-full block">
            ANVAYA
          </span>
        </div>

        {/* Bottom Legal & Indic Signature */}
        <div className="footer-bottom flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-[#b9becd] border-t border-white/10">
          <span>© {new Date().getFullYear()} Anvaya Engineering Collective</span>
          <span className="font-serif text-sm text-[#b9becd]/80">
            अन्वय · Connection. Continuity. Order.
          </span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Project terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
