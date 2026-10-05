"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./Brand";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header}>
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {[
            ["/work", "Work"],
            ["/#services", "Services"],
            ["/#studio", "Studio"],
          ].map(([href, label]) => (
            <Link href={href} key={href} className="rolling-link">
              <span className="rolling-label">
                <span>{label}</span>
                <span aria-hidden="true">{label}</span>
              </span>
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="button button-ink header-cta" href="/project">
            Start a project <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button
            ref={toggle}
            className="mobile-toggle icon-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            <span>{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav container"
          aria-label="Mobile navigation"
        >
          {[
            ["/work", "Work"],
            ["/#services", "Services"],
            ["/#process", "Our process"],
            ["/#studio", "The studio"],
            ["/project", "Start a project"],
          ].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
