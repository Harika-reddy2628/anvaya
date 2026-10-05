import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { projects, services } from "../../lib/studio";
import { WorkCard } from "../../components/studio/WorkCard";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.id === slug);
  return {
    title: service?.name ?? "Service not found",
    description: service?.description,
  };
}
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.id === slug);
  if (!service) notFound();
  const project = projects.find((item) => item.slug === service.related)!;
  return (
    <main id="main-content" className="container inner-page">
      <Link className="text-link" href="/#services">
        <ArrowLeft size={15} aria-hidden="true" /> All services
      </Link>
      <div className="page-heading" data-reveal>
        <span className="eyebrow">
          {service.number} / {service.name}
        </span>
        <h1>{service.title}</h1>
        <p>{service.description}</p>
      </div>
      <div className="service-detail-grid">
        <div>
          <section className="service-detail-section" data-reveal>
            <span className="eyebrow">WHAT WE DELIVER</span>
            <ul className="deliverables large-deliverables">
              {service.deliverables.map((item) => (
                <li key={item}>
                  <Check size={19} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="service-detail-section" data-reveal>
            <span className="eyebrow">SCOPE & BOUNDARIES</span>
            <p>{service.scope}</p>
            <div className="tag-list">
              {service.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
          <section className="service-detail-section" data-reveal>
            <span className="eyebrow">INVESTMENT & HANDOVER</span>
            <h2>{service.estimate}</h2>
            <p>
              {service.timeline}. Final quote follows an agreed scope. Ownership
              of delivered source and applicable master assets transfers after
              final payment. Projects include a 14-day technical defect
              warranty.
            </p>
            <Link
              href={`/project?service=${service.id}`}
              className="button button-accent magnetic"
            >
              Plan your project <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </section>
        </div>
        <aside>
          <span className="eyebrow related-label">RELATED WORK</span>
          <WorkCard project={project} />
        </aside>
      </div>
    </main>
  );
}
