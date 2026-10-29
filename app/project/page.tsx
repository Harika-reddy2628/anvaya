import type { Metadata } from "next";
import { contact } from "../lib/site";
import { Suspense } from "react";
import { ProjectForm, ProjectFormFromQuery } from "../components/cinema/ProjectForm";
import { PageHero, StepList } from "../components/cinema/Shared";
export const metadata: Metadata = { title: "Start a Project", description: "Tell Anvaya about your project. Three short steps, about two minutes." };
// The ?service= seed is read in the browser, so the page stays static (and exportable to static hosting).
export default function ProjectPage() {
  return <main id="main-content" tabIndex={-1}>
    <PageHero title="Tell us about your project."><p>Three short steps, about two minutes. You do not need every answer yet — a rough idea is enough.</p></PageHero>
    <section className="section enquiry-section" id="enquiry" data-rail="The conversation"><div className="wrap"><div className="form-layout"><aside className="form-aside"><h2>A rough idea is enough.</h2><p>Tell us what you need and we will ask the right questions after.</p><p>* Required. Everything else can be “not sure yet.”</p></aside><Suspense fallback={<ProjectForm />}><ProjectFormFromQuery /></Suspense></div></div></section>
    <section className="section direct-section" id="direct" data-rail="Direct note"><div className="wrap"><div className="connection-grid"><h2>Prefer a direct note?</h2><p>{contact.email ? <>Write to <a href={`mailto:${contact.email}`}>{contact.email}</a>{contact.whatsapp && <> or <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a></>}.</> : contact.whatsapp ? <>Message us on <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>.</> : <>Use the project form above to start the conversation.</>}</p></div></div></section>
    <section className="section next-section" id="next" data-rail="What happens next"><div className="wrap"><h2>What happens next.</h2><StepList steps={[["We read your message", "We go through what you need and any links you shared."], ["We plan the first step", "We work out the right scope and a price range."], ["We reply to you", "You get a clear, useful answer — not a generic sales script."]]} /></div></section>
  </main>;
}
