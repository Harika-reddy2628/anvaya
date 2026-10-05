# Anvaya — Interactive Studio Design System

Status: approved implementation direction, 5 October 2026. This document specifies the next redesign; it does not claim that the current application implements it.

Execution order and Mac setup: [implementation plan](docs/lusion-anvaya-implementation-plan.md). Agent requirements: [AGENTS.md](AGENTS.md).

## 1. Design intent and authority

Anvaya is an independent Bengaluru engineering collective serving founders, CTOs, and teams that need software, AI workflows, spatial 3D, and interface engineering. Visitors should quickly understand the offer, inspect credible work, and prepare a project brief.

The selected reference is [Lusion](https://lusion.co/). Follow its visual hierarchy, confident scale, rounded 3D stage, compact navigation, work presentation, and responsive interaction quality. Create Anvaya components, copy, and scene assets. A public DevTools audit provides rendered behavior and delivered resources, not original authoring files or React components.

User decisions are settled:

- Abstract Lusion-style hero; no character or mascot in this iteration.
- Cool pale background, black typography, and cobalt 3D accents.
- Subtle Indic identity through **अन्वय**, connection-inspired geometry, and Bengaluru provenance.
- Real browser-rendered 3D with an immediate matching poster fallback.
- Preserve existing routes, honest project evidence, commercial terms, and local brief preparation.

This specification supersedes the former Kinetic Yantra dark/gold system and the glass-lotus art direction. Historical art documents explain old assets only. Do not combine their gold gradients, floral centerpieces, serif display styling, water effects, or blocking introductions with this design.

## 2. Tokens

### Color

These are Anvaya defaults, not claimed measurements of Lusion's CSS. Record measured reference values separately during the audit.

| Token | Value | Use |
| --- | --- | --- |
| `--canvas` | `#EEEFF5` | Root canvas and large quiet sections |
| `--surface` | `#FFFFFF` | Forms, selected panels, white work surfaces |
| `--surface-soft` | `#E3E5ED` | Secondary panels and separators |
| `--ink` | `#111218` | Headings, navigation, main body text |
| `--ink-secondary` | `#555967` | Supporting copy |
| `--ink-muted` | `#626674` | Metadata on pale/white surfaces |
| `--accent` | `#2454FF` | Cobalt scene elements, links, active selection |
| `--accent-hover` | `#183ED0` | Primary action hover |
| `--stage` | `#101116` | 3D hero stage and dark footer |
| `--on-dark` | `#F5F6FA` | Text on dark surfaces |
| `--on-dark-secondary` | `#B9BECD` | Supporting text on dark surfaces |
| `--border` | `#D0D3DE` | Dividers and panel edges |
| `--error` | `#B42336` | Form errors, with explicit error text |

Use white text on cobalt primary buttons. Use visible shape, text, and icon changes alongside color to communicate state. Verify contrast in every actual pairing; metadata needs at least 4.5:1 at ordinary text sizes. Cobalt is the only prominent chromatic accent.

### Typography

Keep fonts locally hosted through the existing `next/font/local` setup and retain their license files.

| Role | Family and weight | Size / line height |
| --- | --- | --- |
| English wordmark | Inter 750–800 | 28–36px / 1 |
| Hero heading | Inter 500–600 | `clamp(42px, 6.4vw, 96px)` / 1.02 |
| Section heading | Inter 500–600 | `clamp(32px, 4.3vw, 64px)` / 1.08 |
| Card heading | Inter 550–650 | 24–36px / 1.15 |
| Body | Inter 400 | 16–18px / 1.55 |
| Navigation / buttons | Inter 550–650 | 14–16px / 1.2 |
| Metadata | Inter 500 | 12–14px / 1.4 |
| Technical annotation | Geist Mono 400–500 | 12–14px / 1.5 |
| Indic signature | Sahitya 400 or 700 | 36–72px / 1.2 |
| Devanagari supporting text | Hind 400–500 | 16–20px / 1.5 |

Display tracking: -0.035em. Body tracking: normal. Metadata tracking: at most 0.08em. Limit body measure to 60–68 characters. Keep a single semantic text label when visually duplicating rolling button text. Do not preload Cormorant for the active design; retain its assets only if archived components need them.

### Layout and spacing

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Outer gutter: 16px below 680px, 24px at 680–999px, 32px at 1000px and above.
- Reading/content container: 1320px maximum. Hero and prominent work media can extend to the outer gutter.
- Breakpoints: mobile below 680px; tablet 680–999px; desktop 1000px and above.
- Section padding: 64px mobile, 96px tablet, 128px desktop. Use smaller gaps within related content.
- Stage radius: 24px desktop, 20px mobile. Work/panel radius: 16–20px. Buttons: pill radius. Borders: 1px.
- Use document flow, CSS Grid, and flexible stacks. Do not pin sections or replace native scrolling.
- No horizontal overflow at 320px. Header and forms must survive enlarged text and 200% zoom.

## 3. Page composition

### Header and menu

Use a compact pale header with a strong black ANVAYA wordmark on the left, “Start a project” linking to `/project`, and a distinct menu toggle on the right. Keep the header available while scrolling and account for it in anchor offsets. On small screens, reduce the CTA to a concise label rather than shrinking touch targets.

The menu is a full-viewport overlay with large links: Home `/`, Work `/work`, Services `/#services`, Studio `/#studio`, and Start a project `/project`. Highlight the current route or section. Close through the toggle, Escape, or a successful selection. Trap focus, make underlying content inert while open, restore focus to the toggle on dismissal, and restore the prior body scroll position. A reduced-motion menu changes state immediately.

Do not add a newsletter, audio toggle, Labs destination, scheduler, or email action without a working Anvaya destination.

### Hero

The hero has an immediately visible HTML heading and actions, a large inset dark 3D stage, and compact supporting information. Desktop combines expansive type with scene depth; mobile stacks text and stage so neither is cropped by browser chrome. Keep important text outside moving geometry; an overlay requires a reliable contrast scrim.

Default content:

- Overline: “SOFTWARE · AI WORKFLOWS · SPATIAL 3D”.
- Heading: “Ambitious ideas. Connected engineering. Working products.”
- Supporting copy: “We help founders and CTOs build software, AI workflows, and interactive spatial experiences.”
- Primary action: “Start a project” → `/project`.
- Secondary action: “Explore our work” → `/#work`.
- Detail: “BENGALURU, INDIA · WORKING GLOBALLY”.

Provide a visible Pause/Resume motion control whenever ambient animation runs. It changes only the scene, not site navigation. Scene-loading failure must never disable these actions.

### Introduction and featured work

Introduce the collective in a wide editorial paragraph with a concise connection statement. Avoid decorative storytelling that obscures what Anvaya sells.

Feature three complementary projects in this order: Anvaya Spatial Web Engine, Guild Command Center, and Oppy CLI. Use large rounded media panels and readable titles/category/provenance labels; all six existing case studies stay available in `/work`. Desktop uses a two-column grid with the first project spanning both columns. Mobile uses one column.

Work previews use existing honest diagrams or verified supplied media. Custom presentation art must remain labeled as illustration. Do not present synthetic screens as recordings or client evidence. A preview is one clear navigation target, with independent demo controls outside that target when needed.

### Services, process, engineering, and pricing

- Preserve the four service definitions and selected-service interaction. Give each control a clear label, focus state, selected state, and associated panel. Selection must remain synchronized with the homepage brief.
- Present the four process milestones with legible disclosures and no scroll pinning. Keep the agreed scope, review, ownership, and handover language.
- Retain the engineering explorer as an optional deeper interaction; make its controls keyboard accessible and keep technical detail below the headline offer.
- Preserve pricing data and payment/ownership/warranty terms from `app/lib/studio.ts`. Use consistent pale panels, strong type, and concise deliverables rather than metallic or luxury styling.

### Studio, FAQ, brief, and footer

- The studio section carries **अन्वय**, its connection/continuity meaning, and Bengaluru/global context. No generic religious ornamentation is required.
- FAQ disclosures have large targets, clear expanded state, and visible text without motion dependence.
- The brief remains a local form with validation, preparation, copy, download, and an optional email draft only when a confirmed address exists. “Start a project” leads here; it must not imply a submitted enquiry.
- Use a dark footer with a large solid ANVAYA wordmark, concise contact action to `/project`, route/legal links, and the Indic signature. A subtle pointer-lit surface is optional; no second WebGL scene is needed.

### Other routes

Apply the same header, typography, surfaces, buttons, and footer to work listings, all case studies, all service pages, `/project`, `/privacy`, `/terms`, and the not-found page. Keep long-form copy in a narrower reading column. Preserve existing route slugs and query parameters.

## 4. 3D art direction

### Scene composition

Create an original connection study: six rounded, manufactured connector forms at three depth layers. Start with two cobalt forms, two porcelain-white forms, and two charcoal forms. One large cobalt form is the focal point; white forms separate the silhouette; dark forms add depth. Use a coherent diagonal composition with generous negative space.

Prefer extruded/beveled cross or bridge shapes with continuous surfaces. Bevels and clean normals must catch broad highlights without faceting, seams, or overlapping primitive intersections. These are abstract hard-surface pieces, not petals, jewellery, gemstones, or characters.

Use a perspective camera around a 32° field of view. Frame the overall composition rather than orbiting it automatically. Desktop and mobile can use different camera framing and object placement while sharing geometry and materials.

### Materials and lighting

- Cobalt: opaque polished coated surface; starting roughness 0.22–0.30, modest metalness, restrained clearcoat.
- White: opaque porcelain-like surface; roughness 0.28–0.38.
- Charcoal: opaque soft-gloss surface; roughness 0.30–0.45.
- Start with a neutral studio environment, a broad key highlight, gentle fill, and a cooler rim. Control exposure so whites retain detail and cobalt remains saturated.
- Use a small baked/fake contact-shadow layer if depth needs grounding. Do not depend on expensive live shadows or transmission.
- Start without bloom, depth-of-field, fluid simulation, or full-screen postprocessing. Add an effect only if a screenshot comparison proves its value and it stays within budgets.

Reuse proven licensed Three.js techniques and neutral CC0 lighting assets. Blender is for optional mesh refinement, environment/poster preparation, and export. A Cycles render is not a substitute for a responsive browser scene, and Blender shaders do not transfer identically to glTF.

### Interaction

Normalize the fine pointer within the stage. Apply frame-rate-independent damping with a roughly 0.2-second response. Limit camera yaw/pitch to about ±3° and position offset to a subtle parallax range. Return to the composed pose on pointer leave. Touch users receive the composed scene without required dragging; page scroll wins.

Ambient drift: 0.02–0.04 radians/second per form, with staggered phases and no collision or abrupt loops. The scene has no required functional hotspot. Pause stops ambient drift and pointer-driven movement; Resume rechecks reduced-motion preferences before restarting.

## 5. Motion and accessibility

| Interaction | Default | Reduced motion / touch |
| --- | --- | --- |
| Button label roll | 180–220ms, `power2.out`, one short vertical movement | Static label; keep color/focus feedback |
| Menu open/close | 320ms, `power3.out`; link stagger 25ms | Immediate state change |
| Work preview | Scale to at most 1.025 over 250ms, subtle directional arrow | No tilt; equivalent focus outline |
| Section reveal | 450ms, `power2.out`, translate at most 16px, once | Fully visible immediately |
| Route entry | 200ms fade and at most 8px movement | Immediate entry |
| Disclosure | Up to 180ms if implemented without clipping | Immediate content change |
| Hero ambient | Slow drift and damped parallax | Matching static poster; no animation loop |

No animation owns scrolling. GSAP owns site timelines; Three.js owns scene updates. Do not run Anime.js and GSAP on the same elements. Default content is visible before animation initialization; failed scripts must not leave `opacity: 0` content.

Honor preference changes during a session: cancel loops/timelines, remove transitional transforms, and disable smooth scrolling. Scope animation cleanup to owned instances. Navigation, forms, and disclosures remain usable with animation disabled.

Every interactive target is at least 44×44px. Use semantic anchors/buttons, one H1 per route, a working skip link, explicit form labels, visible 2px focus rings with offset, and a live status region for brief feedback. Duplicate decorative labels and the scene canvas are hidden from assistive technology. Never steal focus when the canvas becomes ready.

Route entry effects must preserve Next.js navigation, browser back/forward, anchor destinations, scroll restoration, and modifier-click behavior. Do not add experimental navigation APIs to reproduce a transition.

## 6. Rendering, assets, and budgets

- Server-render the heading, copy, actions, and responsive poster. Start the scene only on the client after the hero is visible and preferences permit it.
- Put `next/dynamic` with `ssr: false` inside a Client Component, following the installed Next.js guide. Keep unrelated routes free of the hero runtime.
- One renderer and one animation loop per hero. Use `ResizeObserver` for canvas size, `IntersectionObserver` for visibility, and document visibility to suspend work.
- Show the canvas only after its first successful rendered frame. Keep the poster available behind it. On startup/load/context failure, return to the poster without a retry loop.
- Dispose owned geometries, materials, textures, environment targets, renderer, listeners, observers, and animation handles on unmount. Guard pending asynchronous loads after disposal.
- Cap device pixel ratio at 1.5 desktop and 1.25 mobile. Start mobile without real-time shadows or postprocessing. Use a lower render scale if frame-time measurements demand it.
- Target at least 50 FPS on the recorded Mac test machine and 30 FPS on a recorded physical mobile device. Device emulation alone is not a mobile GPU measurement. Treat these as measured acceptance targets, not universal guarantees.
- Warm up for 5 seconds, then record 20 seconds of frame times during idle and pointer interaction. Degrade pixel ratio before removing materials. If sustained frame time exceeds 40ms even at minimum quality, use the poster for that session.
- Initial scene budgets: at most 80,000 visible triangles, 30 draw calls, 2048px environment input, and 1024px ordinary material textures. Prefer shared geometry/materials.
- Desktop poster target ≤300KB; mobile poster ≤180KB. Downloaded hero model/environment/textures target ≤2MB combined, excluding the code chunk. Record actual sizes and justify any budget exception.
- Reserve stage dimensions before assets load. Target CLS ≤0.05 and mobile lab LCP ≤2.5 seconds under a documented test profile. Use INP ≤200ms as a field goal when field data exists; do not report it as measured without data.

Store runtime assets under `public/3d/anvaya/` and posters under `public/art/anvaya-connectors-*.webp`. Keep reusable scene source/configuration in the repo; if Blender is used, retain its source or document the delivered source location. Record creator, URL, license, changes, and local filenames in an asset manifest. Respect code licenses independently of model licenses.

## 7. Visual acceptance

Capture the hero, open menu, intro/work boundary, work hover/focus, services, pricing, brief, and footer at 1440×1000, 1024×768, 390×844, and 320×740. Inspect Chrome and WebKit, plus actual Safari on the Mac. Check a physical phone when available and name any missing device verification.

The redesign is ready when:

- First-screen content clearly identifies an engineering studio and gives a direct project action.
- Hero geometry reads as dimensional manufactured forms with clean silhouettes, controlled reflections, and depth in both crops.
- The poster and first live frame match closely enough to avoid a conspicuous switch.
- Interactions are visible, restrained, smooth, and accessible; no scroll trap or blocked content remains.
- All existing routes and brief flows work, and project claims remain accurate.
- No old lotus/water assets, unrelated gold styling, or blocking intro load through active routes.
- Functional tests and production build pass, and actual visual/performance evidence is recorded.

Lint and build success do not establish visual quality. Review the hero images before extending the scene aesthetic throughout the site.

## 8. Primary references

- [Lusion live reference](https://lusion.co/) — observed layout and interaction reference; audit live behavior before implementation.
- [Three.js documentation](https://threejs.org/docs/) and [repository/license](https://github.com/mrdoob/three.js) — runtime and reusable techniques.
- [Poly Haven asset license](https://polyhaven.com/license) — its HDRIs, textures, and models are CC0; choose and record a specific neutral studio environment during the hero pass.
- [Blender GPU rendering](https://docs.blender.org/manual/en/5.1/render/cycles/gpu_rendering.html) and [system requirements](https://www.blender.org/download/requirements/) — verify the installed version and Mac hardware support.
- [Playwright browsers](https://playwright.dev/docs/browsers) — Chromium/WebKit configuration and installation.

Existing robot/character examples are a future option only. No character asset belongs in the selected abstract hero.
