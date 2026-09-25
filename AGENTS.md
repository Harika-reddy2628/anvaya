<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Anvaya Web — AI Agent & Developer Execution Manual (AGENTS.md)

> **Repository:** `anvaya-web` (`Harika-reddy2628/anvaya`)  
> **Brand:** Anvaya (अन्वय) — *Ideas to Impact. Production Systems in 14 Days.*  
> **Motto:** *Systems Over Slop.*  
> **Design Language:** Kinetic Yantra (Understated Industrial Luxury: Wakanda × Indic)  
> **Target Production Stack:** Next.js 16 (App Router), Tailwind CSS v4, GSAP 3.12, Fontshare (ITF).

---

## 1. Core Operating Principles & Governance

1. **Zero Individual Glorification & Strict Team Equality Protocol:**
   - NEVER single out, praise, or highlight any individual teammate's name in splash screens, READMEs, CLI outputs, author tags, commits, PRs, or documentation.
   - NEVER create differential valuation, capability, or compensation tiers. All team members are equal peers.
   - ALWAYS attribute work to `"The Team"`, `"Core Engineering Team"`, or neutral project branding (`"Anvaya"`).
   - Maintain absolute humility, neutrality, and professional harmony.

2. **First-Principles Mastery Over Superficial Vibe-Coding:**
   - Write clean, modular, deterministic code.
   - No mock placeholders that break; wire interactive states, typed schemas, and realistic telemetry.
   - Adhere to strict 60fps frame budgets and sub-1.5s LCP.

---

## 2. Master Blueprints & Source of Truth

Every agent and developer MUST review and adhere to the project's documentation hierarchy:

| Document | Purpose & Authority |
| :--- | :--- |
| **`DESIGN.md` / `.stitch/DESIGN.md`** | **Visual Design System & Tokens**: Colors (Obsidian `#07080D`, Surya Brass `#F59E0B`, Vibranium Amethyst `#A855F7`), Clash Display + Satoshi + JetBrains Mono typography, border radiuses, and elevation tokens. |
| **`ANVAYA_WEB_MASTER_PLAN.md`** | **Site Narrative & Section Specs**: 9-stage experiential sequence (Preloader, Hero Pinned Cockpit, Ticker Ribbon, Philosophy Bento, Sprint Protocols, Proof-of-Work Workstation, Testimonials, FAQ, Kinetic Footer). |
| **`GSAP_ORCHESTRATION.md`** | **Animation Standards**: Official GSAP 3.12 + `@gsap/react` lifecycle rules, `useGSAP()` scoping, `contextSafe()`, and ScrollTrigger pinning patterns. |
| **`.stitch/SITE.md`** | **Stitch Project Roadmap & Screen Inventory**: Tracking Stitch project ID, screen IDs, and completed/pending deliverables. |
| **`.stitch/next-prompt.md`** | **Active Relay Baton**: The current screen generation prompt used for the autonomous Stitch build loop. |

---

## 3. Stitch MCP Integration & The Autonomous Build Loop

The project leverages Google Stitch via the Stitch MCP server to design high-fidelity screens, paired with our local skills (`stitch-loop`, `stitch::react-components`, `enhance-prompt`, `design-md`).

### A. Available Stitch MCP Tools
- `create_project`: Initializes a new Stitch project canvas.
- `get_project`: Retrieves project metadata, theme configurations, and screen coordinates.
- `generate_screen_from_text`: Generates full UI screens from detailed textual and design system prompts.
- `get_screen`: Fetches screen details, HTML download URLs, and screenshot image URLs.
- `edit_screens`: Applies iterative edits to existing Stitch screens.
- `upload_design_md` / `create_design_system`: Syncs design tokens directly into Stitch.

### B. The Baton Execution Cycle (`stitch-loop`)
1. **Read the Baton**: Inspect `.stitch/next-prompt.md` for the target `page` and prompt body.
2. **Consult Blueprints**: Verify `.stitch/SITE.md` to avoid duplicating existing screens and confirm design tokens in `.stitch/DESIGN.md`.
3. **Generate Screen**: Call `generate_screen_from_text` with the `projectId` and the complete design-system-injected prompt.
4. **Persist Identifiers**: Record the project ID and screen resource IDs in `.stitch/metadata.json`.
5. **Download Assets**:
   - Download HTML to `.stitch/designs/{page}.html`.
   - Download Screenshot with `=w{width}` to `.stitch/designs/{page}.png`.
6. **Convert to React Components**: Follow the `stitch::react-components` standard (extract Tailwind config, isolate components, extract data into `src/data/mockData.ts`).
7. **Advance Baton**: Write the next scheduled screen prompt into `.stitch/next-prompt.md` and mark `.stitch/SITE.md` with `[x]`.

---

## 4. GSAP 3.12 & Animation Architecture

To achieve Awwwards-caliber motion without memory leaks or layout thrashing, all animations must strictly follow `GSAP_ORCHESTRATION.md`:

```tsx
"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export const HeroStage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Scoped selectors only target children inside containerRef
      gsap.from(".hero-title-line", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative bg-[#07080D]">
      <h1 className="hero-title-line font-clash text-white">IDEAS TO IMPACT.</h1>
    </section>
  );
};
```

### Motion Invariants
- **Zero Raw `useEffect`**: Always use `useGSAP()` from `@gsap/react`. It automatically registers and tears down GSAP contexts on unmount.
- **Always Provide `{ scope: containerRef }`**: Prevent leaking selectors across components.
- **Event Handler Safety**: Wrap interactive or button animations in `contextSafe()`.
- **GPU Transform Rules**: Animate ONLY `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`. NEVER animate `width`, `height`, `top`, `left`, or `margin`.
- **Preloader Shutter Exit**: The 2D Preloader must smoothly wipe upward (`yPercent: -100`, duration `0.7s`, ease `power4.inOut`) to reveal the Hero stage cleanly.

---

## 5. Component & Code Architecture

### Directory Structure
```
src/
├── app/
│   ├── layout.tsx         # Fontshare Clash/Satoshi & Google JetBrains Mono fonts
│   ├── page.tsx           # Assembled single-page experience (Sections 0-9)
│   └── globals.css        # Tailwind v4 theme variables and reset
├── components/
│   ├── preloader/         # 2D minimal Yantra vector & monospace counter
│   ├── navigation/        # Dynamic floating notch navbar
│   ├── hero/              # Typographic punch + pinned cockpit drawer
│   ├── ticker/            # Infinite crawling suture ribbon
│   ├── philosophy/        # Bento grid with radial cursor laser borders
│   ├── services/          # 3D perspective protocol cards
│   ├── proof-of-work/     # macOS AST diffing & terminal simulator
│   ├── testimonials/      # Covenant evidence cards with commit badges
│   ├── faq/               # Monospace-indexed hairline accordion
│   └── footer/            # Monolithic spotlight wordmark & intake modal
├── hooks/                 # Custom logic hooks (usePagination, useCockpitDrawer)
├── data/
│   └── mockData.ts        # Typed copy, testimonials, protocols, code diffs
└── types/
    └── index.ts           # Shared TypeScript interfaces
```

### Quality & Type Safety Rules
1. **Interface Contract**: Every UI component MUST have an explicit `Readonly<[Name]Props>` interface.
2. **Decoupled Data**: No hardcoded paragraph text, case study copy, or FAQ answers inside JSX. Place all structured data in `src/data/mockData.ts`.
3. **No Arbitrary Magic Colors**: Use Tailwind CSS variables defined in `DESIGN.md` (`bg-[#07080D]`, `text-[#F59E0B]`, etc.).
4. **Build Verification**: Every PR and commit must cleanly pass:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## 6. Git Commit & Collaboration Workflow

- **Branching**: Feature work branches from `main` (e.g. `feat/hero-monolith`, `feat/bento-grid`).
- **Commit Messages**: Conventional commits with neutral attribution:
  - `feat(hero): implement kinetic monolith stage and pinned cockpit`
  - `docs(stitch): update sitemap and next baton prompt for bento grid`
  - `fix(gsap): resolve scrolltrigger pin layout shift on mobile viewports`
- **Clean Tree**: Never leave temporary files, untracked test assets, or broken build artifacts.
