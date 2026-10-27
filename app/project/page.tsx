import type { Metadata } from "next";
import { contact } from "../lib/site";
import { Suspense } from "react";
import { ProjectForm, ProjectFormFromQuery } from "../components/cinema/ProjectForm";
import { PageHero, StepList } from "../components/cinema/Shared";
export const metadata: Metadata = { title: "Start a Project", description: "Tell Anvaya what you are building, improving or trying to make clearer. Start with a useful conversation." };
// The ?service= seed is read in the browser, so the page stays static (and exportable to static hosting).
export default function ProjectPage() {
  return <main id="main-content" tabIndex={-1}>
    <PageHero title="What are you trying to move?"><p>Tell us what you are building, improving or trying to make clearer. You do not need to have every answer yet — a useful starting point is enough.</p></PageHero>
    <section className="section enquiry-section" id="enquiry" data-rail="The conversation"><div className="wrap"><div className="form-layout"><aside className="form-aside"><h2>A useful starting point.</h2><p>Bring the idea, the bottleneck or the unfinished system. We will begin with the real outcome.</p><p>* Required fields. Everything else can begin with “not sure yet.”</p></aside><Suspense fallback={<ProjectForm />}><ProjectFormFromQuery /></Suspense></div></div></section>
    <section className="section direct-section" id="direct" data-rail="Direct note"><div className="wrap"><div className="connection-grid"><h2>Prefer a direct note?</h2><p>{contact.email ? <>Write to <a href={`mailto:${contact.email}`}>{contact.email}</a>{contact.whatsapp && <> or <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a></>}.</> : contact.whatsapp ? <>Message us on <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>.</> : <>Use the project form above to start the conversation.</>}</p></div></div></section>
    <section className="section next-section" id="next" data-rail="What happens next"><div className="wrap"><h2>A clear first conversation.</h2><StepList steps={[["We read the context", "We understand the idea, need or bottleneck."], ["We find the right starting point", "We identify the clearest scope and next move."], ["We come back with a direction", "You get a useful response, not a generic sales script."]]} /></div></section>
  </main>;
}
