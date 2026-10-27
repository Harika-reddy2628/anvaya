import { notFound } from "next/navigation";
import { projects } from "../../lib/studio";

// Only these historical slugs resolve (to the not-found page); anything else 404s too. Static so it can be exported.
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(p => ({ slug: p.slug })); }
// Historical project data remains in source; these pages are not launch evidence.
export default function WorkDetailPage() { notFound(); }
