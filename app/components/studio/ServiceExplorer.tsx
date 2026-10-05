"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { services } from "../../lib/studio";
import { useProject } from "./ProjectContext";
import { animate, createScope } from "animejs";

export function ServiceExplorer() {
  const { selected, select } = useProject();
  const id = useId();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const panel = useRef<HTMLDivElement>(null);
  const service = services.find((item) => item.id === selected)!;
  const initials = ["P", "A", "S", "I"];

  useEffect(() => {
    const scope = createScope({
      root: panel.current!,
      mediaQueries: { reduce: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      if (!self || self.matches.reduce) return;
      animate("[data-service-copy]", {
        opacity: [0, 1],
        y: [10, 0],
        duration: 550,
        ease: "outCubic",
      });
    });
    return () => scope.revert();
  }, [selected]);

  return (
    <div className="service-explorer" data-reveal>
      <div
        className="service-tabs"
        role="tablist"
        aria-label="Choose your project goal"
        aria-orientation="horizontal"
      >
        {services.map((item, index) => (
          <button
            ref={(element) => {
              tabs.current[index] = element;
            }}
            key={item.id}
            id={`${id}-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={selected === item.id}
            aria-controls={`${id}-panel`}
            aria-label={`${item.number} ${item.title}`}
            tabIndex={selected === item.id ? 0 : -1}
            onClick={() => select(item.id)}
            onKeyDown={(event) => {
              const keys = [
                "ArrowDown",
                "ArrowUp",
                "ArrowLeft",
                "ArrowRight",
                "Home",
                "End",
              ];
              if (!keys.includes(event.key)) return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? services.length - 1
                    : (index +
                        (event.key === "ArrowDown" || event.key === "ArrowRight"
                          ? 1
                          : -1) +
                        services.length) %
                      services.length;
              select(services[next].id);
              tabs.current[next]?.focus();
            }}
          >
            <span className="service-preview-initial" aria-hidden="true">
              {initials[index]}
            </span>
            <span className="service-number">{item.number}</span>
            <span>{item.title}</span>
            <ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div
        ref={panel}
        className="service-panel"
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${service.id}`}
        tabIndex={0}
      >
        <span className="service-initial" aria-hidden="true">
          {initials[services.findIndex((item) => item.id === selected)]}
        </span>
        <div className="service-copy" data-service-copy>
          <span className="eyebrow">{service.name}</span>
          <h3>{service.title}</h3>
          <p className="service-description">{service.description}</p>
          <ul className="deliverables">
            {service.deliverables.map((item) => (
              <li key={item}>
                <Check size={15} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="service-bottom">
            <span className="service-price">
              {service.estimate}
              <small>{service.timeline}</small>
            </span>
            <Link
              className="button button-accent magnetic"
              href={`/project?service=${service.id}`}
            >
              Plan this project <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <Link className="text-link" href={`/services/${service.id}`}>
            Scope, deliverables & related work{" "}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
