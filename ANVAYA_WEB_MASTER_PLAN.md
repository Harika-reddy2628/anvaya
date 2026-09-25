# ANVAYA WEB — MASTER ARCHITECTURAL & VISUAL BLUEPRINT

> **Brand**: Anvaya — *Ideas to Impact. Production Systems in 14 Days.*  
> **Motto**: *Systems Over Slop.*  
> **Aesthetic Direction**: **Full Creative Liberty** (Open Design Harness: sovereign colors, typography, and styling).  
> **Technical Harness**: Next.js 16 (App Router), Tailwind CSS v4, GSAP 3.12, Fontshare / Google Fonts.

---

## 1. Executive Summary & Brand Positioning

Anvaya is an engineering-first software and AI systems studio delivering production-grade web applications, vector search backends, and bespoke architectures in 10 to 14-day sprints. 

This website is designed to convert high-ticket B2B clients (funded startup founders, CTOs, and enterprise product leaders across global tech ecosystems).

### The 80 / 20 Architectural Ratio
To command high-ticket retainers and maintain complete commercial credibility:
* **80% Architectural Restraint & High Enterprise Rigor:** Dark obsidian/matte surfaces, crisp typography, clean 1px hairline borders, and hard engineering proof (typed schemas, latency metrics, code diffs).
* **20% Signature Focal Accents:** Fully customizable by the designer—whether golden brass, electric violet, neon cyan, or minimalist monochrome.

---

## 2. Visual Identity & Open Design Tokens

The site consumes semantic tokens via CSS variables. The designer has complete liberty to adjust colors, contrast, and accents in `src/app/globals.css`.

### Semantic Tokens Baseline (`src/app/globals.css`)
```css
:root {
  /* Canvas Foundations */
  --bg-canvas: #090a0f;
  --bg-surface: #11131b;
  --bg-surface-elevated: #181b26;
  
  /* Primary & Secondary Accents (Designer Configurable) */
  --accent-primary: #f59e0b;
  --accent-primary-hover: #d97706;
  --accent-secondary: #8b5cf6;
  --accent-secondary-glow: rgba(139, 92, 246, 0.25);
  
  /* Hairline Borders & Structural Grid */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-glow: rgba(255, 255, 255, 0.2);
  --grid-line: rgba(255, 255, 255, 0.03);
  
  /* Typography Tokens */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  
  /* Telemetry Status */
  --status-active: #10b981;
}
```

---

## 3. Typographic Standard (Awwwards Curation)

Curated from Awwwards and loaded via Fontshare and Google Fonts (or customized by designer):

| Role | Typeface | Source | Styling & Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Headline & Brand** | **Clash Display** | Indian Type Foundry (ITF) | Bold (700), SemiBold (600), tracking `-0.025em` | `ANVAYA` wordmark, hero punches, section titles. |
| **Body & UI** | **Satoshi** | Indian Type Foundry (ITF) | Regular (400), Medium (500), tracking normal | Paragraph copy, navigation, cards, FAQs. |
| **HUD & Code** | **JetBrains Mono** | Google Fonts / System | Medium (500), Bold (700), uppercase tracking `+0.05em` | Telemetry tags, status badges, AST diffs. |

### CDN Integration (`src/app/layout.tsx`)
```html
<link 
  href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=satoshi@700,500,400&display=swap" 
  rel="stylesheet"
/>
<link 
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap" 
  rel="stylesheet"
/>
```

---

## 4. Section-by-Section Narrative & GSAP Architecture

```
================================================================================
FLOW STACK:
[ 0. PRELOADER ]          Minimal Geometric Vector Draw + Telemetry Counter
[ 1. HERO & COCKPIT ]     Typographic Punch + Pinned Cockpit Drawer
[ 2. TICKER RIBBON ]      Continuous Marquee with Live Telemetry
[ 3. PHILOSOPHY ]         "Systems Over Slop" Bento Manifesto
[ 4. SERVICES CATALOG ]   The Sprint Protocols (3-Tier Delivery)
[ 5. PROOF OF WORK ]      Interactive Dev Telemetry Workstation
[ 6. TESTIMONIALS ]       Verified Founder Endorsements & Commit Badges
[ 7. FAQ LEDGER ]         Objection-Killing Hairline Accordion
[ 8. FOOTER & INTAKE ]    Display Typographic Reveal + Booking Intake
================================================================================
```

### Detailed Section Specs

#### 0. Preloader Screen
* **Duration**: Strict max **1.2s** (auto-dismiss on window load).
* **DOM**: Centered minimal geometric vector wireframe + monospace telemetry counter (`00` to `100%`).
* **GSAP**: Shutter wipe upward (`yPercent: -100`, `0.7s`, `power4.inOut`) to reveal the Hero stage cleanly.

#### 1. Hero Section + Cockpit
* **Hero Content**:
  * Wordmark: `ANVAYA` in **Clash Display** (700) with dual-tone metallic reflection.
  * Headline: *"Ideas to Impact. Production Systems in 14 Days."*
  * Sub-Headline: *"Deterministic AI architectures, pgvector neural backends, and bespoke interfaces. No superficial fluff. Zero agency bloat."*
  * CTAs: Primary *"Schedule 14-Day Sprint"* + Secondary *"Inspect Telemetry"*.
* **The Pinned Cockpit Drawer**:
  * Positioned at `calc(100vh - 52px)` with macOS terminal window controls (red/yellow/green dots).
  * **GSAP ScrollTrigger**: Pinned timeline where scrolling lifts the hero text while expanding the drawer from `52px` to `100vh` full screen, revealing the 3 Sprint tabs.

#### 2. Ticker Ribbon
* **Content**: `14-DAY PRODUCTION SPRINTS ✦ DETERMINISTIC AI ARCHITECTURE ✦ checkDK AST COMPILER ✦ 100% DAY-1 IP SOVEREIGNTY ✦ ZERO MIDDLE MANAGEMENT ✦ CLOUDFLARE ZERO TRUST`.
* **GSAP**: Seamless infinite translation `xPercent: -50`, slowing on mouse hover (`timeScale: 0.2`).

#### 3. Philosophy Bento: *"Systems Over Slop"*
* **Narrative**: Contrasting brittle no-code "AI slop" with typed, deterministic engineering.
* **Cards**:
  1. *01 Strict Contracts:* OpenAPI 3.1 & typed Zod schemas.
  2. *02 Deterministic AI:* pgvector HNSW clustering with mathematical guardrails.
  3. *03 Sovereign Code:* 100% admin rights and infrastructure keys handed over on Day 1.
* **GSAP**: Staggered fade-up on scroll with cursor-tracking laser borders.

#### 4. Services Catalog: *"The Sprint Protocols"*
* **Tier 1 — Protocol Alpha (14-Day MVP Launchpad):** Next.js 16 App Router + FastAPI + PostgreSQL.
* **Tier 2 — Protocol Beta (Neural Intelligence Core):** Custom RAG, pgvector hybrid search, sub-15ms vector retrieval.
* **Tier 3 — Protocol Gamma (Hardened Edge Infrastructure):** Cloudflare Zero Trust, automated CI/CD, SOC-2 readiness.
* **GSAP**: 3D tilt hover physics (`perspective(1000px) rotateX(...) rotateY(...)`).

#### 5. Proof-of-Work: *"The Artifacts"*
* **Interactive Workstation**: Real, verifiable engineering proof.
  * *Tab 1: checkDK Engine* (Interactive TypeScript AST diffing).
  * *Tab 2: Oppy Desktop* (Local sandboxed agent runtime).
  * *Tab 3: Zero Trust Edge* (Live simulated request ingress waveform).
* **GSAP**: `Flip.from(state)` for instant morphing tab transitions.

#### 6. Testimonials
* High-trust quotes from technical founders and CTOs with verified commit badges and live production URLs.

#### 7. FAQ: *"The Ledger"*
* Clear answers to high-ticket objections:
  * *Q: How is 14 days possible without cutting corners?* (Answer: Senior builders only, zero middle management, battle-tested modular infrastructure).
  * *Q: Who owns the code?* (Answer: 100% sovereign ownership on Day 1).
  * *Q: What happens after Day 14?* (Answer: Clean documentation, automated CI/CD, optional retainer or smooth internal team handoff).

#### 8. Monolithic Footer
* Full-width giant outline of `ANVAYA` in **Clash Display**.
* **GSAP `quickTo` Mouse Mask**: Cursor movement reveals a radial gradient inside the hollow stroke letters.
* Final booking intake form + sign-off.

---

## 5. Target Production Stack & Performance Standards

* **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
* **Styling**: Tailwind CSS v4 + Custom CSS Variables
* **Animation**: GSAP 3.12 + ScrollTrigger + Flip Plugin
* **Icons**: Lucide React / Simple Icons
* **Hosting**: Cloudflare Pages / Vercel Edge Network
* **Performance Invariants**:
  * 60fps unbroken animation on desktop and mobile.
  * Cumulative Layout Shift (CLS): `< 0.05`.
  * Largest Contentful Paint (LCP): `< 1.5s`.
  * Zero-flash dark-mode initialization.
