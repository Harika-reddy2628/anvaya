# DESIGN.md — Anvaya Design System & UI Specification
> **System Name**: Kinetic Yantra (Understated Industrial Luxury: Wakanda × Indic)  
> **Brand**: Anvaya (अन्वय) — *Ideas to Impact. Production Systems in 14 Days.*  
> **Core Motto**: *Systems Over Slop.*  
> **Target Production Stack**: Next.js 16 (App Router), Tailwind CSS v4, GSAP 3.12, Google Flow (Veo), Fontshare (ITF).

---

## 1. Brand Philosophy & Aesthetic Direction

Anvaya is an engineering-first software and AI systems studio. The visual language balances **understated industrial luxury** with **hard engineering rigor**:

* **80% Architectural Restraint & High Enterprise Rigor:** Deep obsidian and matte charcoal canvases, razor-sharp 1px hairline borders, high-contrast typography, and real production telemetry (latency curves, AST diffs, typed schemas).
* **20% Signature Cinematic Soul (Wakanda × Indic):** Milled Surya Brass (`#F59E0B`) CTAs, muted Vibranium Amethyst (`#A855F7`) interactive energy glows, and an ultra-subtle mathematical Yantra coordinate lattice.

---

## 2. Color Palette & Design Tokens

### Semantic Color Matrix

```
[ DEEP OBSIDIAN KASHI ]   [ SURYA COPPER/GOLD ]   [ VIBRANIUM AMETHYST ]   [ MOONSTONE WHITE ]
       #07080D                  #F59E0B                  #A855F7                #F8FAFC
   (Cosmic Void Canvas)     (Architectural Craft)      (Kinetic AI Pulse)      (Crisp Typography)
```

| Token Name | Hex / Value | CSS Variable | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Canvas Void** | `#07080D` | `--bg-void` | Root background; deep obsidian with 2% midnight indigo undertone. |
| **Surface Base** | `#0E111B` | `--bg-surface` | Primary card background, drawer shell, navbar container. |
| **Surface Elevated** | `#151926` | `--bg-surface-elevated` | Hovered cards, modal overlays, elevated tooltips. |
| **Surya Brass (Primary Accent)** | `#F59E0B` | `--accent-surya-gold` | Primary CTAs, active telemetry indicators, keyframe brand glyphs. |
| **Surya Brass Hover** | `#D97706` | `--accent-surya-hover` | Button hover states, active tab highlights. |
| **Surya Glow** | `rgba(245, 158, 11, 0.22)` | `--accent-surya-glow` | Subtle outer shadows for primary buttons. |
| **Vibranium Amethyst (Secondary Accent)** | `#A855F7` | `--accent-vibranium` | Kinetic interaction glow, vector nodes, laser border sweeps. |
| **Cobalt Energy** | `#004CE8` | `--accent-cobalt` | Secondary technical badges, link hovers. |
| **Status Emerald** | `#10B981` | `--status-emerald` | Live sprint intake badge (`● ACCEPTING Q4 SPRINT INTAKE`). |
| **Text Primary** | `#F8FAFC` | `--text-primary` | Main headlines, titles, high-contrast callouts. |
| **Text Secondary** | `#94A3B8` | `--text-secondary` | Subheadings, body copy, card descriptions. |
| **Text Muted** | `#64748B` | `--text-muted` | Technical indices, timestamps, corner coordinates. |
| **Hairline Border** | `rgba(255, 255, 255, 0.08)` | `--border-subtle` | Standard 1px divider and card perimeter. |
| **Lattice Wireframe** | `rgba(245, 158, 11, 0.035)` | `--wireframe-lattice` | Background mathematical Yantra coordinate grid. |

---

## 3. Typography System (Awwwards Curation)

Curated from Awwwards and engineered by the **Indian Type Foundry (ITF)** via Fontshare:

| Role | Font Family | Weight | Letter Spacing | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Headlines** | **Clash Display** | Bold (700), SemiBold (600) | `-0.025em` | `1.05 – 1.15` | `ANVAYA` wordmark, hero punches, section titles (*"Systems Over Slop"*). |
| **Body / UI Interface** | **Satoshi** | Regular (400), Medium (500) | `normal` | `1.5 – 1.6` | Paragraph copy, navigation links, card descriptions, FAQ text. |
| **Telemetry / Code HUD** | **JetBrains Mono** | Medium (500), Bold (700) | `+0.05em` | `1.4` | Telemetry tags, status badges, AST code diffs, numeral indices. |

### Font Loading Standard (`src/app/layout.tsx`)
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

## 4. Spacing, Borders & Elevation

* **Grid Base Unit**: `4px` / `8px`
* **Card Border Radius**:
  * Large Containers & Drawers: `rounded-3xl` (`24px`)
  * Bento Cards & Showcase Tiles: `rounded-2xl` (`16px`)
  * Badges & Interactive Buttons: `rounded-full` (`9999px`)
* **Hairline Borders**: Always `1px` solid `rgba(255, 255, 255, 0.08)` with optional laser-glow gradient on hover (`rgba(245, 158, 11, 0.35)`).
* **Glassmorphism**: `backdrop-blur-xl` with background fill `rgba(14, 17, 27, 0.85)` for floating bars and overlays.

---

## 5. Component Design Specifications

### 0. The 2D Preloader ("The Awakening")
* **Canvas**: Fullscreen `#07080D`.
* **Center**: 2D minimal interlocking Yantra vector in 1px `#F8FAFC` and `#F59E0B` hairline strokes.
* **Telemetry**: Corner coordinates (`12.9716° N, 77.5946° E`), system status (`[SYS_INIT]`).
* **Counter**: Monospace counter (`00` to `100%`) in bottom-right.
* **Exit**: Vertical shutter wipe upward (`yPercent: -100`) in `0.7s` (`power4.inOut`).

### 1. Dynamic Notch Navbar
* **Format**: Detached floating pill capsule (`w-[min(760px,94vw)]`).
* **Fill**: `rgba(14, 17, 27, 0.85)` with `backdrop-blur-xl` and 1px border `rgba(255,255,255,0.1)`.
* **Elements**:
  * Brand Emblem + `anvaya` in lowercase bold Clash Display.
  * Nav items: `What We Build`, `Architecture`, `Proof of Work`.
  * CTA Button: Surya Gold gradient pill with micro arrow icon.

### 2. The Hero Section & Pinned Cockpit
* **Wordmark**: `ANVAYA` in 120px+ Clash Display with dual-tone metallic gradient (Surya Gold fading to Platinum).
* **Tagline**: *"Ideas to Impact. Production Systems in 14 Days."*
* **Sub-Headline**: *"Deterministic AI architectures, pgvector neural backends, and bespoke interfaces. No superficial fluff. Zero agency bloat."*
* **The Pinned Cockpit Drawer**:
  * Resting position: Pinned at bottom fold (`calc(100vh - 52px)`).
  * macOS window controls (`#FF5F56`, `#FFBD2E`, `#27C93F`).
  * ScrollTrigger expands drawer to `100vh` full screen, revealing the 3 Sprint showcase tiles.

### 3. Capabilities Ticker Ribbon ("The Unbroken Sūtra")
* **Style**: Full-bleed border-y ticker (`border-white/10`).
* **Content**: `14-DAY PRODUCTION SPRINTS ✦ DETERMINISTIC AI ARCHITECTURES ✦ checkDK AST COMPILER ✦ 100% DAY-1 SOVEREIGNTY ✦ ZERO MIDDLE MANAGEMENT ✦ CLOUDFLARE ZERO TRUST`.
* **Motion**: Smooth infinite horizontal crawl, pausing on cursor hover.

### 4. Philosophy Bento Grid ("Systems Over Slop")
* **Headline**: *"Systems over slop."*
* **3 Core Cards**:
  1. *01 Strict Contracts* (OpenAPI 3.1 & typed Zod schemas).
  2. *02 Deterministic AI* (pgvector HNSW clustering with mathematical bounds).
  3. *03 Sovereign Code* (Full GitHub repository admin rights handed over Day 1).
* **Hover Interaction**: Radial laser border follows cursor position (`rgba(245, 158, 11, 0.45)`).

### 5. Services Catalog ("The Sprint Protocols")
* **Structure**: 3 monolithic cards with 3D perspective tilt on hover:
  * **Protocol Alpha — The 14-Day MVP Launchpad:** Next.js 16 + FastAPI + PostgreSQL.
  * **Protocol Beta — Neural Intelligence Core:** Custom RAG, pgvector hybrid search, sub-15ms vector retrieval.
  * **Protocol Gamma — Hardened Edge Architecture:** Cloudflare Zero Trust, automated CI/CD, SOC-2 readiness.

### 6. Proof of Work ("The Artifacts")
* **Format**: Interactive macOS-style developer workstation.
* **Tabs**:
  * `01 checkDK Engine`: Interactive TypeScript AST diffing simulator.
  * `02 Oppy Desktop`: Sandboxed local agent runtime.
  * `03 Zero Trust Edge`: Live simulated ingress waveform.
* **Transition**: Instant layout morph via GSAP Flip plugin.

### 7. Testimonials ("Covenant Evidence")
* Clean quote cards with verified commit badges (`VERIFIED PRODUCTION DEPLOYMENT`) and founder credentials.

### 8. FAQ Accordion ("The Ledger")
* Minimalist hairline accordion rows with monospace numeral indices (`[01]`, `[02]`, `[03]`).
* Smooth spring height expansion on click.

### 9. Monolithic Footer ("The Kinetic Discharge")
* Giant full-width outline text of `ANVAYA` in Clash Display.
* Cursor-following radial spotlight mask revealing Surya Gold & Amethyst inside the hollow letters.
* Final intake scheduler + Sanskrit sign-off: *अन्वय • Causal Continuity & Deterministic Engineering.*

---

## 6. Motion, GSAP & Performance Invariants

* **Target Frame Rate**: Strict **60fps** across desktop and mobile.
* **Easing Presets**:
  * Entrances & Modals: `power3.out`
  * Shutter Wipes & Layout Pinning: `power4.inOut`
  * Micro-interactions & Buttons: `cubic-bezier(0.16, 1, 0.3, 1)`
* **Video Asset Rules (Google Flow)**:
  * Max file size: `< 1.8MB` for Hero loop; `< 800KB` for card visuals.
  * Always strip audio tracks with `-an` in FFmpeg.
  * Dual encode: WebM (VP9, crf 30) + MP4 (H.264, crf 26).
* **Core Web Vitals**:
  * Largest Contentful Paint (LCP): `< 1.5s`
  * Cumulative Layout Shift (CLS): `< 0.05`
  * First Input Delay (FID): `< 50ms`
