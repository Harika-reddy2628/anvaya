"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "./Logo";

export function Header() {
  const pathname = usePathname();
  return <header className={`site-header${pathname === "/" ? " header-home" : ""}`}><div className="container header-inner"><Link className="brand" href="/" aria-label="Anvaya home"><LogoMark /><span>ANVAYA</span><span className="brand-divider" aria-hidden="true">/</span><span lang="hi" className="indic">अन्वय</span></Link><nav aria-label="Main navigation"><Link href="/services" aria-current={pathname.startsWith("/services") ? "page" : undefined}>Services</Link><Link href="/studio" aria-current={pathname === "/studio" ? "page" : undefined}>Studio</Link></nav><Link href="/project" className="header-project" aria-current={pathname === "/project" ? "page" : undefined}><span>Start a Project</span><span aria-hidden="true">↗</span></Link></div></header>;
}
