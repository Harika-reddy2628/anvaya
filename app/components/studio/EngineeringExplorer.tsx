"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, Braces, Database, Layers3, Rocket } from "lucide-react";
import Link from "next/link";

const nodes = [
  {
    title: "Interface",
    icon: Layers3,
    label: "Where people meet your product.",
    text: "We translate the core task into clear flows, responsive screens, and components that your team can extend.",
    project: "spatial-engine",
    tags: ["Usable flows", "Responsive layouts", "Reusable components"],
  },
  {
    title: "API",
    icon: Braces,
    label: "Where your systems work together.",
    text: "Well-defined interfaces connect your frontend, business logic, and external tools. Error handling and agreed contracts make those connections predictable.",
    project: "guild",
    tags: ["Defined contracts", "Integration boundaries", "Error handling"],
  },
  {
    title: "Data",
    icon: Database,
    label: "Where information becomes useful.",
    text: "We shape storage, retrieval, and permissions around the product. From business records to document search, data supports an actual workflow.",
    project: "oppy",
    tags: ["Structured storage", "Useful retrieval", "Access boundaries"],
  },
  {
    title: "Deployment",
    icon: Rocket,
    label: "Where a build becomes a product.",
    text: "A delivery includes an agreed deployment, configurations, and documentation. After final payment, the source and project assets are yours to take forward.",
    project: "quality-harness",
    tags: ["Production handover", "Documentation", "Client ownership"],
  },
];

export function EngineeringExplorer() {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const node = nodes[active];
  return (
    <div className="engineering-explorer" data-reveal>
      <div
        className="engineering-nodes"
        role="tablist"
        aria-label="Explore our engineering approach"
      >
        {nodes.map((item, index) => (
          <button
            ref={(element) => {
              refs.current[index] = element;
            }}
            key={item.title}
            type="button"
            role="tab"
            id={`${id}-node-${index}`}
            aria-controls={`${id}-details`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (
                !["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)
              )
                return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? nodes.length - 1
                    : (index +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        nodes.length) %
                      nodes.length;
              setActive(next);
              refs.current[next]?.focus();
            }}
          >
            <span className="engineering-icon">
              <item.icon size={23} strokeWidth={1.3} aria-hidden="true" />
            </span>
            <span>{item.title}</span>
            <span className="engineering-index" aria-hidden="true">
              0{index + 1}
            </span>
          </button>
        ))}
      </div>
      <div
        className="engineering-detail"
        role="tabpanel"
        id={`${id}-details`}
        aria-labelledby={`${id}-node-${active}`}
        tabIndex={0}
      >
        <div>
          <span className="eyebrow">THE SYSTEM / 0{active + 1}</span>
          <h3>{node.label}</h3>
          <p>{node.text}</p>
        </div>
        <div>
          <div className="tag-list">
            {node.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <Link href={`/work/${node.project}`} className="text-link">
            Explore related work <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
