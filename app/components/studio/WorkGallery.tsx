"use client";

import { useState } from "react";
import { projects } from "../../lib/studio";
import { WorkCard } from "./WorkCard";

export function WorkGallery() {
  const [category, setCategory] = useState("All work");
  const categories = [
    "All work",
    ...new Set(projects.map((project) => project.category)),
  ];
  const visible =
    category === "All work"
      ? projects
      : projects.filter((project) => project.category === category);
  return (
    <>
      <div className="filter-list" aria-label="Filter projects">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>
      <div className="work-grid index-work-grid">
        {visible.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
