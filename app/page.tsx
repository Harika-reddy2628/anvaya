import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { Hero } from "./components/studio/Hero";
import { WorkStory } from "./components/studio/WorkStory";
import { ConnectionStory } from "./components/studio/ConnectionStory";
import { ServiceExplorer } from "./components/studio/ServiceExplorer";
import { EngineeringExplorer } from "./components/studio/EngineeringExplorer";
import { BriefBuilder } from "./components/studio/BriefBuilder";
import { projects, packages, faqs } from "./lib/studio";

const selectedWork = [
  "spatial-engine",
  "guild",
  "oppy",
].map((slug) => projects.find((project) => project.slug === slug)!);
const engagements = [packages[1], packages[0], packages[2]];

const milestones = [
  {
    name: "Agree the scope.",
    phase: "BRIEF",
    description:
      "A clear problem. An achievable scope. Shared acceptance criteria.",
    detail:
      "We define the deliverables, architecture, integrations, access, review points, and price before kickoff.",
  },
  {
    name: "Make it work.",
    phase: "BUILD",
    description:
      "A working preview of the core experience, ready for your review.",
    detail:
      "The core flows take shape in a working environment so you can review behavior and direction.",
  },
  {
    name: "Connect the pieces.",
    phase: "REFINE",
    description:
      "Agreed workflows and integrations, tested together as a system.",
    detail:
      "We integrate the agreed tools and data, verify the product against the acceptance criteria, and address review feedback within scope.",
  },
  {
    name: "Put it in your hands.",
    phase: "LAUNCH",
    description: "Production delivery, documentation, and complete ownership.",
    detail:
      "On final verified delivery and payment, you receive source code, repositories, deployment configurations, and applicable master 3D assets. A 14-day technical defect warranty follows delivery.",
  },
];

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <ConnectionStory />
      <section className="work-section section" id="work">
        <div className="section-heading container" data-reveal>
          <div>
            <span className="eyebrow section-kicker">
              <span>01</span> SELECTED WORK
            </span>
            <h2>
              Products, tools, and systems we’ve built<span className="accent">.</span>
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>
              Explore the problem, our approach, and the evidence behind each
              project.
            </p>
            <Link className="text-link" href="/work">
              Explore all projects <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <WorkStory projects={selectedWork} />
      </section>
      <section className="services-section section" id="services">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <span className="eyebrow section-kicker">
                <span>02</span> WHAT WE DO
              </span>
              <h2>
                Four disciplines. One engineering team<span className="accent">.</span>
              </h2>
            </div>
            <div className="section-heading-aside">
              <p>
                Product engineering, AI workflows, spatial 3D, and interface
                design—scoped around what you need to build.
              </p>
            </div>
          </div>
          <ServiceExplorer />
        </div>
      </section>
      <section className="process-section section container" id="process">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow section-kicker">
              <span>03</span> HOW WE BUILD
            </span>
            <h2>
              From agreed scope to source handover<span className="accent">.</span>
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>
              Agree the deliverables, review working previews, and receive the
              source and documentation after final payment.
            </p>
          </div>
        </div>
        <div className="process-grid">
          {milestones.map((milestone, index) => (
            <article className="milestone" key={milestone.name} data-reveal>
              <details open={index === 0}>
                <summary>
                  <span className="milestone-top">
                    0{index + 1} / {milestone.phase}
                  </span>
                  <h3>{milestone.name}</h3>
                  <Plus size={14} aria-hidden="true" />
                </summary>
                <p className="milestone-description">{milestone.description}</p>
                <p>{milestone.detail}</p>
              </details>
            </article>
          ))}
        </div>
        <div className="process-note">
          <span className="small-square" />
          <p>
            MVPs & agentic pipelines: <strong>14 calendar days.</strong> Spatial
            assets: <strong>48 hours–5 business days.</strong> Scope and inputs
            agreed before kickoff.
          </p>
        </div>
      </section>
      <section className="engineering-section section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <span className="eyebrow section-kicker">
                <span>04</span> UNDER THE SURFACE
              </span>
              <h2>
                Inside the engineering<span className="accent">.</span>
              </h2>
            </div>
            <div className="section-heading-aside">
              <p>
                Explore how the interface, APIs, data, and deployment fit
                together.
              </p>
            </div>
          </div>
          <EngineeringExplorer />
        </div>
      </section>
      <section className="pricing-section section container" id="pricing">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow section-kicker">
              <span>05</span> WORKING TOGETHER
            </span>
            <h2>
              Choose how we work together<span className="accent">.</span>
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>
              A fixed-scope sprint, a spatial project, or an ongoing engineering
              partnership.
            </p>
          </div>
        </div>
        <div className="pricing-grid">
          {engagements.map((item, index) => (
            <article
              className={`price-card ${item.id === "product" ? "price-featured" : ""}`}
              key={item.label}
              data-reveal
            >
              <div className="price-overview">
                <div className="price-top">
                  <span className="eyebrow">
                    0{index + 1} /{" "}
                    {item.id === "product"
                      ? "FLAGSHIP OFFER"
                      : item.id === "spatial"
                        ? "PROJECT"
                        : "RETAINER"}
                  </span>
                  {item.id === "product" && (
                    <span className="price-pill">14-day delivery</span>
                  )}
                </div>
                <h3>{item.label}</h3>
                <p className="price-audience">{item.audience}</p>
              </div>
              <div className="price-investment">
                <div className="price-value">
                  {item.price}
                  <span>{item.unit}</span>
                </div>
                <span className="price-local">{item.local}</span>
                <div className="price-time">{item.timeline}</div>
              </div>
              <div className="price-details">
                <ul className="deliverables">
                  {item.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="price-note">{item.note}</p>
                <Link
                  className="text-link"
                  href={
                    index === 2
                      ? "/project?engagement=retainer"
                      : `/project?service=${item.id}`
                  }
                >
                  Scope this engagement{" "}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="pricing-terms">
          <span>
            50% upfront · 50% on verified delivery
            <br />
            Or fully funded, agreed platform escrow.
          </span>
          <span>
            100% ownership after final payment.
            <br />
            14-day technical defect warranty on projects.
          </span>
        </div>
      </section>
      <section className="studio-section section" id="studio">
        <div className="container studio-grid">
          <div data-reveal>
            <span className="eyebrow section-kicker">
              <span>06</span> THE COLLECTIVE
            </span>
            <div className="studio-sanskrit" lang="sa">
              अन्वय
            </div>
            <div className="studio-definition">
              anvaya / connection, continuity, systematic order
            </div>
          </div>
          <div data-reveal>
            <h2>
              An engineering collective in Bengaluru<span className="accent">.</span>
            </h2>
            <p>
              Our collective brings specialists in full-stack systems, AI
              infrastructure, spatial 3D, and robotics into the same project.
              We work remotely with founders and teams across the world.
            </p>
            <p>
              अन्वय means connection, continuity, and systematic order. It
              reflects how we bring the disciplines a project needs into a
              shared plan, from the first scope to the final handover.
            </p>
            <div className="studio-mantra">
              <span>Learn.</span>
              <ArrowRight size={16} aria-hidden="true" />
              <span>Build.</span>
              <ArrowRight size={16} aria-hidden="true" />
              <span>Ship.</span>
              <ArrowRight size={16} aria-hidden="true" />
              <span>Sell.</span>
            </div>
            <span className="eyebrow studio-global">
              BENGALURU, INDIA · WORKING GLOBALLY
            </span>
            <Link href="/project" className="studio-circle">
              Start a project{" "}
              <ArrowUpRight size={19} strokeWidth={1} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="faq-section section container" id="faq">
        <div className="faq-layout">
          <div data-reveal>
            <span className="eyebrow section-kicker">
              <span>07</span> GOOD QUESTIONS
            </span>
            <h2>
              Scope, payment, and handover<span className="accent">.</span>
            </h2>
            <p>
              The practical details of working with Anvaya.
            </p>
          </div>
          <div className="faq-list" data-reveal>
            {faqs.map((faq, index) => (
              <details className="faq-item" key={faq.question}>
                <summary>
                  <span className="faq-index">0{index + 1}</span>
                  <span>{faq.question}</span>
                  <Plus size={19} strokeWidth={1.5} aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="project-section section" id="project">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <span className="eyebrow section-kicker">
                <span>08</span> YOUR PROJECT
              </span>
              <h2>
                Prepare your project brief<span className="accent">.</span>
              </h2>
            </div>
            <div className="section-heading-aside">
              <p>
                Outline your project, budget, and timeline. Prepare a brief you
                can copy or download; nothing is sent from this site.
              </p>
            </div>
          </div>
          <BriefBuilder />
        </div>
      </section>
    </main>
  );
}
