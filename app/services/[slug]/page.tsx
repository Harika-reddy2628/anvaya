import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { practices } from "../../lib/site";
import { Action, FinalCTA, PageHero, StepList } from "../../components/cinema/Shared";
import { TourPreview } from "../../components/cinema/TourPreview";

const TOUR = "https://anvaya-westroad-tour.vercel.app/";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return practices.flatMap(p => [{ slug: p.slug }, { slug: p.id }]); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = practices.find(p => p.slug === slug || p.id === slug);
  return { title: p ? `${p.name}${p.comingSoon ? " — Coming soon" : ""}` : "Service not found", description: p ? `${p.comingSoon ? "Coming soon. " : ""}${p.intro}` : undefined };
}
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const legacy = practices.find(p => p.id === slug);
  if (legacy) permanentRedirect(`/services/${legacy.slug}`);
  const practice = practices.find(p => p.slug === slug);
  if (!practice) notFound();
  const index = practices.findIndex(p => p.id === practice.id);
  const href = practice.comingSoon ? "/services#practices" : `/project?service=${practice.id}`;
  return <main id="main-content" tabIndex={-1}>
    <PageHero title={practice.line} action={practice.comingSoon ? "See available services" : practice.action} href={href} practice={index} comingSoon={practice.comingSoon}><p>{practice.intro}</p>{practice.comingSoon && <p>This service is coming soon. Websites & Branding and 3D Renders & Walkthroughs are open for new projects.</p>}</PageHero>
    <section className="section create-section" id="create" data-rail="What we create"><div className="wrap"><h2>{practice.createHeading}</h2><div className="detail-capabilities">{practice.capabilities.map(([title, body], i) => <article key={title}><span>{String(i + 1).padStart(2, "0")} /</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <section className="section connection-section" id="solve" data-rail={practice.id === "automation" ? "The principle" : "What we solve"}><div className="wrap"><div className="connection-grid"><h2>{practice.problemHeading}</h2><div className="section-copy">{practice.problem.map(p => <p key={p}>{p}</p>)}<Action href={href} text>{practice.comingSoon ? "See available services" : "Tell us what you need"}</Action></div></div></div></section>
    <section className="section detail-approach" id="approach" data-rail="Approach"><div className="wrap"><div className="section-heading"><h2>{practice.approachHeading}</h2><p>From the first call to the finished work.</p></div><StepList steps={practice.steps} /></div></section>
    {practice.id === "spatial" && <section className="section work-section" id="selected-work"><div className="wrap">
      <article className="work-feature">
        <div className="work-feature-copy">
          <p className="work-meta"><span>Virtual walkthrough</span><span>11 views</span></p>
          <h2>West Road <em>Residence.</em></h2>
          <p>An interactive walkthrough of a residence: eleven views at a standing eye height of 1.5 m, a live floor plan that tracks where you are and which way you face, and a guided tour from room to room.</p>
          <div className="work-actions"><a className="action" href={TOUR} target="_blank" rel="noopener noreferrer"><span>Open the full walkthrough</span><span className="action-arrow" aria-hidden="true">↗</span></a><Action href="/work#west-road" text>Project details</Action></div>
        </div>
        <TourPreview src={TOUR} title="West Road residence — virtual walkthrough" />
      </article>
    </div></section>}
    {practice.comingSoon ? <FinalCTA heading="This service is coming soon." body="For projects today, see Websites & Branding and 3D Renders & Walkthroughs." action="See available services" href={href} /> : <FinalCTA heading={practice.finalHeading} action={practice.finalAction} href={href} />}
  </main>;
}
