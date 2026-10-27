import type { Metadata } from "next";
import Link from "next/link";
import { Action, FinalCTA, PageHero } from "../components/cinema/Shared";
import { TourPreview } from "../components/cinema/TourPreview";

const TOUR = "https://anvaya-westroad-tour.vercel.app/";
export const metadata: Metadata = { title: "Works", description: "Selected Anvaya work, beginning with the West Road residence virtual walkthrough." };

// Only documented, published work appears here. Historical project data stays in source and is not launch evidence.
export default function WorkPage() {
  return <main id="main-content" tabIndex={-1}>
    <PageHero title="Work you can walk through."><p>Selected projects from the studio. Each one is shown as it was delivered, so you can explore it yourself.</p></PageHero>
    <section className="section work-section" id="west-road"><div className="wrap">
      <article className="work-feature">
        <div className="work-feature-copy">
          <p className="work-meta"><Link href="/services/spatial-visuals">Spatial Visuals</Link><span>Virtual walkthrough</span></p>
          <h2>West Road <em>Residence.</em></h2>
          <p>An interactive walkthrough of a residence. Visitors move through eleven views at a standing eye height of 1.5 m, with a live floor plan that tracks where they are and which way they face, and a guided tour that leads the way room to room.</p>
          <ul className="work-facts" aria-label="Walkthrough features">
            <li><b>11</b><span>views</span></li>
            <li><b>1.5 m</b><span>eye level</span></li>
            <li><b>Plan</b><span>live floor plan with compass</span></li>
            <li><b>Tour</b><span>guided route</span></li>
          </ul>
          <ul className="tag-list" aria-label="Work type"><li>architectural visualisation</li><li>interior visuals</li><li>walkthroughs</li></ul>
          <div className="work-actions"><a className="action" href={TOUR} target="_blank" rel="noopener noreferrer"><span>Open the full walkthrough</span><span className="action-arrow" aria-hidden="true">↗</span></a></div>
        </div>
        <TourPreview src={TOUR} title="West Road residence — virtual walkthrough" />
      </article>
      <p className="work-note">More case studies are being documented. <Action href="/services/spatial-visuals" text>Explore Spatial Visuals</Action></p>
    </div></section>
    <FinalCTA heading="Have a space that needs to be seen clearly?" action="Start a spatial visuals project" href="/project?service=spatial" />
  </main>;
}
