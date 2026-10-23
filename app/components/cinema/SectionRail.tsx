"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Entry = { id: string; label: string };

/** The tour's room index, applied to page sections: numbered anchors with the current section underlined. */
export function SectionRail() {
  const path = usePathname();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState("");
  const [shown, setShown] = useState(false);
  const [paper, setPaper] = useState(false);
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main [data-rail][id]")];
    // Section markup comes from the server; the rail mirrors it after each route change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(sections.map(section => ({ id: section.id, label: section.dataset.rail || "" })));
    if (!sections.length) return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(items => {
      items.forEach(item => visible.set(item.target.id, item.isIntersecting ? item.intersectionRatio : 0));
      const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
      if (best && best[1] > 0) { setActive(best[0]); setPaper(document.getElementById(best[0])?.dataset.tone === "paper"); }
    }, { rootMargin: "-35% 0px -45% 0px", threshold: [0, .01, .25, .5, 1] });
    sections.forEach(section => observer.observe(section));
    const first = sections[0], footer = document.querySelector(".site-footer");
    // Show once the opening section has passed, and step aside before the footer arrives.
    const reveal = () => setShown(first.getBoundingClientRect().bottom < innerHeight * .5 && (!footer || footer.getBoundingClientRect().top > innerHeight * .8));
    reveal(); window.addEventListener("scroll", reveal, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", reveal); };
  }, [path]);
  if (entries.length < 3) return null;
  return <nav className={`section-rail${shown ? " is-shown" : ""}${paper ? " is-paper" : ""}`} aria-label="Page sections">
    <ol>{entries.map((entry, index) => <li key={entry.id}><a href={`#${entry.id}`} aria-current={active === entry.id ? "location" : undefined}><span className="n">{String(index).padStart(2, "0")}</span><span className="t">{entry.label}</span></a></li>)}</ol>
  </nav>;
}
