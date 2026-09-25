# DESIGN.md — Anvaya Open Design System & UI Engineering Harness

> **Brand**: Anvaya — *Ideas to Impact. Production Systems in 14 Days.*  
> **Core Motto**: *Systems Over Slop.*  
> **Philosophy**: **Aesthetic Sovereignty & Technical Discipline** (Full creative liberty with visual theme; strict engineering invariants).  
> **Target Production Stack**: Next.js 16 (App Router), Tailwind CSS v4, GSAP 3.12, Fontshare / Google Fonts.

---

## 1. Creative Freedom & Aesthetic Sovereignty

The visual identity of Anvaya is **completely unconstrained and sovereign to the designer**:
- **No locked themes**: No rigid cultural, cinematic, or historical mandates.
- **Full liberty**: The designer has full creative authority over color palettes, typography, contrast ratios, brand glyphs, textures, and visual metaphors (whether Minimalist Monolith, Swiss Cyber-Editorial, Dark Glass Luxury, Brutalist High-Tech, or Neo-Grotesque).
- **The Role of this Document**: This file serves as the **pluggable engineering harness**—defining semantic token slots and performance contracts so that any aesthetic direction runs at a buttery 60fps with rock-solid type safety.

---

## 2. Pluggable Design Tokens & CSS Variable Matrix

The application consumes semantic CSS variables. The designer can freely re-theme these tokens in `src/app/globals.css` without breaking layout logic or component contracts.

### Semantic Token Slots (Default Reference Baseline)

| Token Name | Reference Value | CSS Variable | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#090A0F` | `--bg-canvas` | Root canvas void; dark, neutral, or custom tint. |
| **Surface Base** | `#11131B` | `--bg-surface` | Primary card background, drawer shell, navbar container. |
| **Surface Elevated** | `#181B26` | `--bg-surface-elevated` | Hovered cards, modal overlays, elevated tooltips. |
| **Primary Accent** | *Designer's Choice* (`#F59E0B`, `#3B82F6`, `#10B981`, etc.) | `--accent-primary` | Primary CTAs, active telemetry indicators, focal points. |
| **Primary Accent Hover**| *Darker/Lighter Shade* | `--accent-primary-hover` | Button hover states, active tab highlights. |
| **Secondary Accent** | *Designer's Choice* (`#8B5CF6`, `#EC4899`, `#06B6D4`, etc.) | `--accent-secondary` | Interactive glows, hover lasers, secondary chips. |
| **Status Active** | `#10B981` | `--status-active` | Live sprint availability badge (`● ACCEPTING INTAKE`). |
| **Text High Contrast**| `#F8FAFC` | `--text-primary` | Main headlines, titles, prominent metrics. |
| **Text Muted** | `#94A3B8` | `--text-secondary` | Subheadings, body copy, card descriptions. |
| **Text Subtle** | `#64748B` | `--text-muted` | Technical indices, timestamps, corner coordinates. |
| **Hairline Border** | `rgba(255, 255, 255, 0.08)` | `--border-subtle` | Standard 1px divider and card perimeter. |
| **Laser Hover Glow** | `rgba(255, 255, 255, 0.15)` | `--laser-glow` | Dynamic cursor-following perimeter gradient. |

---

## 3. Typography System Harness

The designer is free to choose and configure typography pairings via Fontshare or Google Fonts. 

### Recommended Baseline Pairing
- **Display / Headlines**: **Clash Display** (Bold 700 / SemiBold 600, letter-spacing `-0.025em`) — Architectural, high-impact punches.
- **Body / Interface**: **Satoshi** (Regular 400 / Medium 500, line-height `1.5 – 1.6`) — Neutral, effortless reading clarity.
- **Telemetry / Code**: **JetBrains Mono** (Medium 500) — Precision metadata, AST diffs, and numeric indices.

*Alternative options open to the designer: Cabinet Grotesk, General Sans, Syne, Space Grotesk, Instrument Serif, Inter, or PP Neue Montreal.*

### Font Loading Harness (`src/app/layout.tsx`)
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

## 4. Spacing, Geometry & Surface Standards

* **Grid Base Unit**: `4px` / `8px`
* **Border Radii**:
  * Large Containers & Cockpits: `rounded-3xl` (`24px`)
  * Bento Cards & Showcase Tiles: `rounded-2xl` (`16px`)
  * Badges & Interactive Buttons: `rounded-full` (`9999px`)
* **Hairline Precision**: Standard `1px` borders (`border-white/10` or variable equivalent).
* **Glassmorphism**: `backdrop-blur-xl` with semi-opaque fill (`rgba(17, 19, 27, 0.85)`) for floating navigation and pinned controls.

---

## 5. Component Functional Specifications

The website is structured into 9 modular sections. The designer has full liberty over the art direction of each:

### 0. 2D Minimal Preloader
* **Purpose**: Smooth entrance experience while fonts and assets initialize.
* **Elements**: Minimal geometric brand vector + monospace telemetry counter (`00` to `100%`).
* **Exit**: Clean vertical shutter wipe upward (`yPercent: -100`, `0.7s`, `power4.inOut`).

### 1. Dynamic Floating Navbar
* **Format**: Detached pill container (`w-[min(760px,94vw)]`).
* **Elements**: Brand logo, navigation anchor links, active sprint intake indicator, and primary action button.

### 2. The Hero Monolith & Pinned Cockpit
* **Headline Punch**: Bold typographic statement defining Anvaya's engineering capabilities.
* **Tagline**: *"Ideas to Impact. Production Systems in 14 Days."*
* **CTA Row**: High-contrast primary action + secondary proof inspector.
* **The Pinned Cockpit Drawer**:
  - Resting fold preview at bottom of the hero stage.
  - Expands or pins on scroll to reveal active production protocols and telemetry.

### 3. Capabilities Ticker Ribbon
* **Format**: Full-bleed border-y infinite marquee ticker.
* **Content**: 14-day production sprints, deterministic AI, typed schemas, zero trust edge, 100% Day-1 sovereignty.
* **Motion**: Smooth continuous horizontal scroll that pauses on hover.

### 4. Philosophy Bento Grid ("Systems Over Slop")
* **Format**: Multi-card asymmetrical grid illustrating engineering principles:
  1. Strict Contracts (OpenAPI & typed schemas).
  2. Deterministic AI (pgvector HNSW clustering with mathematical bounds).
  3. Sovereign Code (Full repository admin rights handed over Day 1).
* **Interaction**: Interactive cursor-following spotlight or laser border glow.

### 5. Services Catalog ("The Sprint Protocols")
* **Structure**: 3 monolithic showcase cards with 3D perspective hover physics:
  - Protocol Alpha: The 14-Day MVP Launchpad.
  - Protocol Beta: Neural Intelligence & Vector Core.
  - Protocol Gamma: Hardened Edge Architecture & Zero Trust.

### 6. Proof of Work Workstation
* **Format**: Interactive developer container / terminal simulator.
* **Tabs**: AST diffing visualizer, local agent sandbox, and ingress waveform.
* **Motion**: Smooth layout transitions via GSAP Flip or tab state switches.

### 7. Verified Testimonials
* **Format**: High-credibility founder quote cards with verified deployment badges.

### 8. The Ledger (FAQ Accordion)
* **Format**: Minimalist hairline accordion with monospace indices (`[01]`, `[02]`, `[03]`).
* **Motion**: Spring height animation on expand/collapse.

### 9. Monolithic Footer
* **Format**: Giant full-width display typography + sprint booking intake modal.

---

## 6. Technical, Motion & Performance Invariants (The Non-Negotiables)

While aesthetic styling is sovereign, **performance and engineering rigor are strict**:

* **Target Frame Rate**: Strict **60fps** across all devices.
* **GPU Composite Only**: Animate ONLY `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`. NEVER animate `width`, `height`, `top`, `left`, or `margin`.
* **GSAP Discipline**: All animations must use `@gsap/react` `useGSAP()` with `{ scope: containerRef }`. No uncleaned event listeners or raw `useEffect`.
* **Core Web Vitals**:
  * Largest Contentful Paint (LCP): `< 1.5s`
  * Cumulative Layout Shift (CLS): `< 0.05`
  * First Input Delay (FID): `< 50ms`
* **Video/Motion Rules (if video loops are added)**:
  * Max size: `< 1.8MB` for background video.
  * Audio track must be stripped (`-an`).
  * Always dual encode: WebM (VP9) + MP4 (H.264).
