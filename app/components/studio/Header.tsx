"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./Brand";

const MENU_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#studio", label: "Studio" },
  { href: "/project", label: "Start a project" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    // Save previous scroll and prevent background scroll
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header}>
      <div className="container header-inner">
        <Brand />

        {/* Desktop Quick Links */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {[
            ["/work", "Work"],
            ["/#services", "Services"],
            ["/#studio", "Studio"],
          ].map(([href, label]) => {
            const isActive = pathname === href;
            return (
              <Link
                href={href}
                key={href}
                className={`rolling-link ${isActive ? "active" : ""}`}
              >
                <span className="rolling-label">
                  <span>{label}</span>
                  <span aria-hidden="true">{label}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <Link
            className="button button-accent header-cta"
            href="/project"
            aria-label="Start a project"
          >
            <span className="header-cta-full">Start a project</span>
            <span className="header-cta-short" aria-hidden="true">
              Project
            </span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>

          <button
            ref={toggle}
            className={`menu-toggle-btn ${open ? "is-open" : ""}`}
            type="button"
            aria-expanded={open}
            aria-controls="fullscreen-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            <span className="menu-btn-text">{open ? "Close" : "Menu"}</span>
            <div className="menu-btn-dots" aria-hidden="true">
              <span className="menu-dot" />
              <span className="menu-dot" />
            </div>
          </button>
        </div>
      </div>

      {/* Full-Viewport Accessible Menu Overlay */}
      {open && (
        <div
          id="fullscreen-navigation"
          ref={menuRef}
          className="fullscreen-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="fullscreen-menu-container container">
            <div className="fullscreen-menu-header">
              <span className="font-mono text-xs uppercase tracking-widest text-[#555967]">
                Navigation // Anvaya Collective
              </span>
            </div>

            <nav className="fullscreen-menu-links" aria-label="Menu links">
              {MENU_LINKS.map(({ href, label }, idx) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`fullscreen-menu-link ${isActive ? "is-active" : ""}`}
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    <div className="fullscreen-link-inner">
                      <span className="fullscreen-link-number font-mono">
                        0{idx + 1}
                      </span>
                      <div className="fullscreen-link-rolling">
                        <span className="fullscreen-link-label">{label}</span>
                        <span aria-hidden="true" className="fullscreen-link-clone">
                          {label}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="fullscreen-link-arrow" size={28} />
                  </Link>
                );
              })}
            </nav>

            <div className="fullscreen-menu-footer">
              <div className="font-mono text-xs text-[#555967]">
                BENGALURU, INDIA · GLOBAL DELIVERY
              </div>
              <div className="font-mono text-xs text-[#555967]">
                14-DAY PRODUCT SPRINTS
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
