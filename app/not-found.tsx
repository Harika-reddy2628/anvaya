import { Action, PageHero } from "./components/connected/Shared";
export default function NotFound() {
  return <main id="main-content" className="not-found-page" tabIndex={-1}><PageHero eyebrow="404" title="This page has not found its connection yet."><p>The link may have moved, changed or never existed. Let’s take you somewhere useful.</p><div className="not-found-actions"><Action href="/">Go Home</Action><Action href="/services" text>Explore Services</Action></div></PageHero></main>;
}
