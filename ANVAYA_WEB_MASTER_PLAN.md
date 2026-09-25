# ANVAYA WEB — MASTER ARCHITECTURAL & VISUAL BLUEPRINT
> **Anvaya (अन्वय)**: *Causal continuity, interconnected order, relational syntax, and deterministic architecture.*  
> **Positioning**: *Ideas to Impact. Production Systems in 14 Days.*  
> **Motto**: *Systems Over Slop.*

---

## 1. Executive Summary & Brand Positioning

Anvaya is an engineering-first software and AI systems studio delivering production-grade web applications, vector search backends, and bespoke architectures in 10 to 14-day sprints. 

This website is designed to convert high-ticket B2B clients (funded startup founders, CTOs, and enterprise product leaders across India, the US, and global tech ecosystems).

### The 80 / 20 B2B Luxury Ratio
To command high-ticket retainers ($5k–$25k+ per sprint) and maintain complete commercial credibility:
* **80% Architectural Restraint & High Enterprise Rigor:** Deep obsidian/matte charcoal surfaces, crisp typography, clean 1px hairline borders, and hard engineering proof (typed schemas, latency metrics, code diffs).
* **20% Signature Cinematic Soul (Wakanda × Indic):** Milled Surya Brass (`#F59E0B`) CTAs, muted Vibranium Amethyst (`#A855F7`) interactive energy glows, and an ultra-subtle mathematical Yantra coordinate lattice.

---

## 2. Visual Identity & Color System ("Kinetic Yantra")

```
[ DEEP OBSIDIAN KASHI ]   [ SURYA COPPER/GOLD ]   [ VIBRANIUM AMETHYST ]   [ MOONSTONE WHITE ]
       #07080D                  #F59E0B                  #A855F7                #F8FAFC
   (Cosmic Void Canvas)     (Architectural Craft)      (Kinetic AI Pulse)      (Crisp Typography)
```

### Exact Design Tokens (`src/app/globals.css`)
```css
:root {
  /* Canvas Foundations */
  --bg-void: #07080d;
  --bg-surface: #0e111b;
  --bg-surface-elevated: #151926;
  
  /* Indic Surya / Milled Brass Accents */
  --accent-surya-gold: #f59e0b;
  --accent-surya-glow: rgba(245, 158, 11, 0.22);
  --accent-copper: #d97706;
  
  /* Wakanda Vibranium Kinetic Accents */
  --accent-vibranium: #a855f7;
  --accent-vibranium-glow: rgba(168, 85, 247, 0.25);
  --accent-cobalt: #004ce8;
  
  /* Hairline Borders & Structural Grid */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-glow-gold: rgba(245, 158, 11, 0.35);
  --border-glow-amethyst: rgba(168, 85, 247, 0.35);
  --wireframe-lattice: rgba(245, 158, 11, 0.035);
  
  /* Typography Tokens */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  
  /* Telemetry Status */
  --status-emerald: #10b981;
}
```

---

## 3. Typographic Standard (Awwwards Curation)

Curated directly from Awwwards and engineered by the **Indian Type Foundry (ITF)** via Fontshare:

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

## 4. Google Flow (Veo / Imagen 3) Asset Pipeline

All raw video generated from Google Flow must be web-optimized through the following protocol before deployment:

```
[Google Flow (Veo 1080p Export)]
               │
               ├── 1. Seamless Loop (0.5s head/tail crossfade)
               ├── 2. Strip Audio Track (-an flag saves ~35% bandwidth)
               ├── 3. Dual Transcode: WebM VP9 + H.264 MP4
               │
[Budget: Max 1.8MB for Hero Background, <800KB for Micro-Cards]
```

### Flow Generation Prompts

#### 1. Hero Kinetic Background (`hero_lattice.webm`)
> **Prompt**: *"Microscopic slow camera glide over a matte obsidian carbon-fiber nano-mesh with interlocking geometric triangular coordinate lines. Ultra-subtle pulses of warm amber brass light along the vertices, pure pitch-black seamless background, studio lighting, zero roll, 4k photoreal, 24fps smooth."*

#### 2. Protocol 01 MVP Launchpad Card (`asset_mvp.png` / `.webm`)
> **Prompt**: *"A high-precision 3D architectural glass cuboid housing an illuminated glowing golden computational chip core. Dark brushed titanium chassis, laser-etched circuits, clean studio lighting, isolated on black."*

#### 3. Protocol 02 Neural Intelligence Core (`asset_ai.png` / `.webm`)
> **Prompt**: *"A floating 3D mathematical constellation of interconnected vector embedding nodes glowing with soft amethyst violet and cobalt light, clean geometric lines, dark backdrop."*

#### 4. Protocol 03 Zero Trust Edge Security (`asset_edge.png` / `.webm`)
> **Prompt**: *"A monolithic obsidian hexagonal security shield with hairline golden perimeter laser lines, hardened aerospace grade finish, isolated on pitch black."*

#### FFmpeg Web Compression Script
```bash
# WebM format (modern web engines)
ffmpeg -i flow_input.mp4 -an -c:v libvpx-vp9 -crf 30 -b:v 0 -vf scale=1920:-2 public/videos/hero_lattice.webm

# MP4 fallback (iOS / Safari)
ffmpeg -i flow_input.mp4 -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart public/videos/hero_lattice.mp4
```

---

## 5. Section-by-Section Narrative & GSAP Architecture

```
================================================================================
FLOW STACK:
[ 0. PRELOADER ]          "The Awakening" (Vector Yantra Draw + Telemetry)
[ 1. HERO & COCKPIT ]     "The Kinetic Monolith" (Clash Display + Pinned Expand)
[ 2. TICKER RIBBON ]      "The Unbroken Sūtra" (Continuous Marquee)
[ 3. PHILOSOPHY ]         "Systems Over Slop" (Bento Manifesto)
[ 4. SERVICES CATALOG ]   "The Sprint Protocols" (3-Tier 14-Day Delivery)
[ 5. PROOF OF WORK ]      "The Artifacts" (Interactive Dev Telemetry Cockpit)
[ 6. TESTIMONIALS ]       "Covenant Evidence" (Verified Founder Endorsements)
[ 7. FAQ LEDGER ]         "The Ledger" (Objection-Killing Accordion)
[ 8. FOOTER & INTAKE ]    "The Kinetic Discharge" (Spotlight Mask Sign-off)
================================================================================
```

### Detailed Section Specs

#### 0. Preloader Screen: *"The Awakening"*
* **Duration**: Strict max **1.2s** (auto-dismiss on window load).
* **DOM**: Centered SVG Sri Yantra geometric wireframe.
* **GSAP**: `gsap.fromTo("#yantra-svg path", { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" })` followed by radial scale explosion to reveal the Hero.

#### 1. Hero Section + Cockpit: *"The Kinetic Monolith"*
* **Hero Content**:
  * Wordmark: `ANVAYA` in **Clash Display** (700) with Surya Brass-to-Platinum metallic reflection.
  * Headline: *"Ideas to Impact. Production Systems in 14 Days."*
  * Sub-Headline: *"Deterministic AI architectures, pgvector neural backends, and bespoke interfaces. No superficial fluff. Zero agency bloat."*
  * CTAs: Primary *"Schedule 14-Day Sprint"* (Surya Gold glow) + Secondary *"Inspect Telemetry"*.
* **The Pinned Cockpit Drawer**:
  * Positioned at `calc(100vh - 52px)` with macOS terminal window controls (red/yellow/green dots).
  * **GSAP ScrollTrigger**: Pinned timeline where scrolling lifts the hero text (`y: -100, opacity: 0`) while expanding the drawer from `52px` to `100vh` full screen, revealing the 3 Sprint tabs.

#### 2. Ticker Ribbon: *"The Unbroken Sūtra"*
* **Content**: `14-DAY PRODUCTION SPRINTS ✦ DETERMINISTIC AI ARCHITECTURE ✦ checkDK RUST AST COMPILER ✦ 100% DAY-1 IP SOVEREIGNTY ✦ ZERO MIDDLE MANAGEMENT ✦ CLOUDFLARE ZERO TRUST`.
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

#### 6. Testimonials: *"Covenant Evidence"*
* High-trust quotes from technical founders and CTOs with verified commit badges and live production URLs.

#### 7. FAQ: *"The Ledger"*
* Clear answers to high-ticket objections:
  * *Q: How is 14 days possible without cutting corners?* (Answer: Senior builders only, zero middle management, battle-tested modular infrastructure).
  * *Q: Who owns the code?* (Answer: 100% sovereign ownership on Day 1).
  * *Q: What happens after Day 14?* (Answer: Clean documentation, automated CI/CD, optional retainer or smooth internal team handoff).

#### 8. Monolithic Footer: *"The Kinetic Discharge"*
* Full-width giant outline of `ANVAYA` in **Clash Display**.
* **GSAP `quickTo` Mouse Mask**: Cursor movement reveals a 5-stop radial gradient of Surya Gold and Vibranium Amethyst inside the hollow stroke letters.
* Final booking intake form + Sanskrit sign-off: *अन्वय • Causal Continuity & Deterministic Engineering.*

---

## 6. Target Production Stack & Performance Standards

* **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
* **Styling**: Tailwind CSS v4 + Custom CSS Variables
* **Animation**: GSAP 3.12 + ScrollTrigger + Flip Plugin
* **Icons**: Lucide React
* **Hosting**: Cloudflare Pages / Vercel Edge Network
* **Performance Invariants**:
  * 60fps unbroken animation on desktop and mobile.
  * Cumulative Layout Shift (CLS): `< 0.05`.
  * Largest Contentful Paint (LCP): `< 1.5s`.
  * Zero-flash dark-mode initialization.
