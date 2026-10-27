"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { practices } from "../../lib/site";
import { LogoMark, Wordmark } from "./Logo";

const links = [
  { href: "/work", label: "Works", current: (path: string) => path.startsWith("/work") },
  { href: "/studio", label: "About", current: (path: string) => path === "/studio" },
  { href: "/pricing", label: "Pricing", current: (path: string) => path === "/pricing" },
  { href: "/services", label: "Services", current: (path: string) => path.startsWith("/services") },
  { href: "/blog", label: "Blog", current: (path: string) => path === "/blog" },
];
// Every published page, for the Pages menu.
const pages = [
  ["Home", "/"], ["Works", "/work"], ["About the studio", "/studio"], ["Services", "/services"],
  ...practices.map(p => [p.name, `/services/${p.slug}`]),
  ["Pricing", "/pricing"], ["Blog", "/blog"], ["Start a Project", "/project"], ["Privacy", "/privacy"], ["Terms", "/terms"],
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- close the menu whenever the route changes
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!menu.current?.contains(event.target as Node) && !button.current?.contains(event.target as Node)) setOpen(false); };
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); button.current?.focus(); } };
    document.addEventListener("pointerdown", outside); document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", key); };
  }, [open]);
  return <header className={`site-header${pathname === "/" ? " header-home" : ""}`}>
    <div className="header-inner">
      <Link className="brand" href="/" aria-label="Anvaya home"><LogoMark className="brand-mark" /><Wordmark /><span className="brand-indic indic" lang="hi">अन्वय</span></Link>
      <nav aria-label="Main navigation">
        {links.map(link => <Link key={link.href} className="nav-link" href={link.href} aria-current={link.current(pathname) ? "page" : undefined}>{link.label}</Link>)}
        <button ref={button} type="button" className="nav-link nav-pages" aria-expanded={open} aria-controls="pages-menu" onClick={() => setOpen(value => !value)}>Pages<span aria-hidden="true">{open ? "−" : "+"}</span></button>
      </nav>
      <Link href="/project" className="pill pill-solid header-project" aria-current={pathname === "/project" ? "page" : undefined}><span>Start a Project</span><span aria-hidden="true">↗</span></Link>
      <div ref={menu} id="pages-menu" className="pages-menu" hidden={!open}>
        <p className="pages-menu-label">All pages</p>
        <ul>{pages.map(([label, href]) => <li key={href}><Link href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link></li>)}</ul>
      </div>
    </div>
  </header>;
}
