<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Anvaya Web — AI Agent & Developer Execution Manual (AGENTS.md)

> **Repository:** `anvaya-web` (`Harika-reddy2628/anvaya`)  
> **Brand:** Anvaya — *Ideas to Impact. Production Systems in 14 Days.*  
> **Motto:** *Systems Over Slop.*  
> **Aesthetic Direction:** **Full Creative Liberty** (Open Design Harness: sovereign colors, typography, and styling)  
> **Target Production Stack:** Next.js 16 (App Router), Tailwind CSS v4, GSAP 3.12, Fontshare / Google Fonts.

---

## 1. Core Operating Principles & Governance

1. **Zero Individual Glorification & Strict Team Equality Protocol:**
   - NEVER single out, praise, or highlight any individual teammate's name in splash screens, READMEs, CLI outputs, author tags, commits, PRs, or documentation.
   - NEVER create differential valuation, capability, or compensation tiers. All team members are equal peers.
   - ALWAYS attribute work to `"The Team"`, `"Core Engineering Team"`, or neutral project branding (`"Anvaya"`).
   - Maintain absolute humility, neutrality, and professional harmony.

2. **Aesthetic Sovereignty & Full Creative Freedom:**
   - The designer/developer has complete freedom over visual identity, color scheme, typography pairing, aesthetic theme, and creative storytelling (Minimalist, Cyber-Editorial, Brutalist, Dark Luxury, etc.).
   - No rigid cultural, cinematic, or historical locks are enforced.
   - The engineering codebase provides a solid, pluggable harness where CSS variables and theme tokens can be freely customized.

3. **First-Principles Mastery Over Superficial Vibe-Coding:**
   - Write clean, modular, deterministic code.
   - No mock placeholders that break; wire interactive states, typed schemas, and realistic telemetry.
   - Adhere to strict 60fps frame budgets and sub-1.5s LCP.

---

## 2. The 15 Ironclad DON'Ts (Awwwards & Agency Invariants)

To prevent catastrophic performance collapses, aesthetic "vibe-slop", or commercial conversion failures, every agent and developer MUST strictly obey these 15 DON'Ts:

### A. WebGL, Shader & Performance Traps
1. **DON'T run unbounded full-resolution fragment shaders:** Cap `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))`. Never calculate full 3x retina buffers. Always pause the animation loop via `IntersectionObserver` when the canvas is off-screen.
2. **DON'T spawn multiple WebGL `<canvas>` contexts across sections:** Maintain a single, persistent canvas across the background. Control camera positions, uniform values, and particle states via GSAP ScrollTrigger rather than creating new canvases.
3. **DON'T scroll-jack or fight native trackpad momentum:** Never hijack wheel velocity or use heavy, sticky scroll smoothing. Couple Lenis (`lerp: 0.08`, `syncTouch: false`) cleanly with `ScrollTrigger.update`.
4. **DON'T animate layout/geometry properties on scroll:** Never animate `top`, `left`, `width`, `height`, `margin`, or `filter: blur()` during scroll scrub. Strictly use hardware-accelerated `transform` (`x`, `y`, `scale3d`) and `opacity`.
5. **DON'T trap users behind a 10-second preloader:** The DOM hero text and CTA must render immediately (<1.2s LCP). WebGL shaders compile asynchronously and fade in smoothly without holding the user hostage.

### B. Aesthetic & Visual Traps
6. **DON'T sacrifice contrast and legibility for glows:** Maintain the **80/20 Architectural Ratio** (80% high-contrast architectural restraint with `#F8FAFC` typography on `#020408` void; 20% signature bioluminescent cyan `#00F5D4` & violet `#8B5CF6` energy). Never place glowing text on glowing backgrounds.
7. **DON'T build a generic 2021 Web3/Crypto theme:** No cheesy spinning low-poly planets, cartoon astronauts, purple NFT gradients, or default Three.js tutorial starfields. Ground visuals in astrophysical gravitational lensing and living neural filaments.
8. **DON'T create disjointed visual metaphors:** Maintain strict visual continuity. The site is an advanced computational world forge and interstellar cockpit, not a patchwork of random 3D experiments.
9. **DON'T build all-flash, zero-substance gimmicks:** Cool shaders must never distract from the core value proposition. Within 5 seconds, any visitor must understand exactly what Anvaya builds, in how many days, and how to hire the team.

### C. Agency Commercial & Conversion Traps
10. **DON'T drown business value in sci-fi lore:** The cosmic bioluminescent theme is a metaphor for bringing order out of chaos (*"Ideas to Impact"*). Keep copy ruthlessly commercial: 10-14 day production sprints, 100% Day-1 IP ownership, verified telemetry (<12ms p99 latency).
11. **DON'T bury the Call-To-Action (CTA):** The primary conversion trigger (`"Schedule 14-Day Sprint"`) must remain permanently accessible in the floating dynamic notch navigation and at high-intent rhythm points throughout the narrative.
12. **DON'T violate the Strict Team Equality Protocol:** NEVER single out individual teammates' names, titles, or personal vanity tags. Strictly attribute all engineering to `"The Team"`, `"Core Engineering Team"`, or `"Anvaya"`.
13. **DON'T display fake or superficial mockups:** No generic Dribbble placeholders or `Lorem Ipsum`. Display authentic production telemetry, real AST diff engines, typed schemas, and real terminal commands (`anvaya spatial generate`).

### D. Accessibility, Mobile & Audio Traps
14. **DON'T play unsolicited, auto-playing audio:** Default strictly to MUTED. Provide an elegant `[SOUND: OFF/ON]` toggle with an animated waveform. If activated, softly ramp up an atmospheric sub-bass drone via the Web Audio API.
15. **DON'T break on mobile or ignore motion sensitivity:** Always respect `@media (prefers-reduced-motion: reduce)`. On mobile viewports, automatically scale particle count down from 20,000 to 2,000, disable heavy post-processing passes, and verify touch interactions.

---

## 3. The Master Execution Plan (Cosmic Bioluminescence)

```
===================================================================================
PHASE 1: FOUNDATIONS & HARNESS
- Implement Cosmic Bioluminescent Design Tokens (Void #020408, Cyan #00F5D4, Violet #8B5CF6)
- Setup Single Persistent Canvas + Lenis Smooth Scroll + GSAP ScrollTrigger Sync
- Frame budget audit (60fps guaranteed, DPR clamped to 1.5)

PHASE 2: HERO SINGULARITY & FLIGHT DECK
- GLSL Gravitational Lensing & Bioluminescent Particle Swarm (Canvas/WebGL)
- Pinned GSAP ScrollTrigger: Typographic punch lifts -> Cockpit Terminal expands
- Architectural Headline: "FROM THE VOID INTO MATTER. // SYSTEMS OVER SLOP"

PHASE 3: AGENCY STORYLINE & PROOF-OF-WORK WORKSTATION
- Infinite Kinetic Capabilities Ticker (14-Day MVP, Neural Core, 3D Spatial Pipelines)
- "Systems Over Slop" Bento Grid with cursor-following radial laser borders
- Interactive Proof-of-Work Cockpit: Terminal AST diffing and real Anvaya CLI commands

PHASE 4: EVIDENCE, LEDGER & MONOLITHIC INTAKE
- Verified Founder Endorsements with commit verification badges
- Monospace-Indexed Hairline Accordion FAQ killing objections (IP, timeline, pricing)
- Monolithic Footer Wordmark Reveal + Dynamic Sprint Booking Intake Modal

PHASE 5: OPTICALS, AUDIO HAPTICS & RESPONSIVE POLISH
- 2.39:1 Anamorphic Letterbox HUD brackets + subtle 35mm procedural film grain
- Web Audio API ambient drone (opt-in) & crisp mechanical click haptics
- Mobile Safari stress test (<1.5s LCP, zero WebGL context loss)
===================================================================================
```

---

## 4. Master Blueprints & Source of Truth

Every agent and developer MUST review and adhere to the project's documentation hierarchy:

| Document | Purpose & Authority |
| :--- | :--- |
| **`DESIGN.md` / `.stitch/DESIGN.md`** | **Open Design System Harness**: Semantic CSS variable tokens, geometry, and layout specs. Visual theme and styling are completely open to the designer. |
| **`ANVAYA_WEB_MASTER_PLAN.md`** | **Site Narrative & Section Specs**: 9-stage modular sequence (Preloader, Hero Pinned Cockpit, Ticker Ribbon, Philosophy Bento, Sprint Protocols, Proof-of-Work Workstation, Testimonials, FAQ, Footer). |
| **`GSAP_ORCHESTRATION.md`** | **Animation Standards**: Official GSAP 3.12 + `@gsap/react` lifecycle rules, `useGSAP()` scoping, `contextSafe()`, and ScrollTrigger pinning patterns. |
| **`.stitch/SITE.md`** | **Stitch Project Roadmap & Screen Inventory**: Tracking Stitch project ID, screen IDs, and completed/pending deliverables. |
| **`.stitch/next-prompt.md`** | **Active Relay Baton**: The current screen generation prompt used for the autonomous Stitch build loop. |

---

## 5. Stitch MCP Integration & The Autonomous Build Loop

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

## 6. GSAP 3.12 & Animation Architecture

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

## 7. Component & Code Architecture

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

## 8. Git Commit & Collaboration Workflow

- **Branching**: Feature work branches from `main` (e.g. `feat/hero-monolith`, `feat/bento-grid`).
- **Commit Messages**: Conventional commits with neutral attribution:
  - `feat(hero): implement kinetic monolith stage and pinned cockpit`
  - `docs(stitch): update sitemap and next baton prompt for bento grid`
  - `fix(gsap): resolve scrolltrigger pin layout shift on mobile viewports`
- **Clean Tree**: Never leave temporary files, untracked test assets, or broken build artifacts.
