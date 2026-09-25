# Anvaya — Ideas to Impact

Anvaya (Sanskrit: अन्वय — connection, logical coherence, causal continuity) is an engineering-first software and AI systems studio delivering production-grade web applications, vector search backends, and bespoke interfaces in 10 to 14 days.

---

## Architecture & Prototypes Directory

All interactive prototypes are self-contained, standalone web surfaces utilizing vanilla HTML5, CSS3, WebGL 2.0 GLSL shaders, and GSAP 3.12:

| File | Description | Key Technologies |
| :--- | :--- | :--- |
| [`anvaya_master_showcase.html`](file:///home/dhanush/Projects/Active/anvaya/anvaya_master_showcase.html) | **Master Unified Showcase**: Cohesive integration of 9 requested components across the full landing page narrative. | WebGL 2.0, GSAP ScrollTrigger, SVG Filters, CSS Custom Properties |
| [`demo_light_tunnel.html`](file:///home/dhanush/Projects/Active/anvaya/demo_light_tunnel.html) | **Light Tunnel Background**: WebGL 2.0 volumetric cable tunnel in Ceramic Light mode with violet/purple (`#A855F7`) cables and electric cyan pulses. | WebGL2 Fragment Shader, Mouse Gyro Parallax |
| [`demo_scroll_expand.html`](file:///home/dhanush/Projects/Active/anvaya/demo_scroll_expand.html) | **Pinned Scroll Expand**: Full-bleed card expansion powered by GSAP ScrollTrigger pinning, eliminating WebKit sticky layout bugs. | GSAP ScrollTrigger, CSS Grid |
| [`hero_saas_demo.html`](file:///home/dhanush/Projects/Active/anvaya/hero_saas_demo.html) | **SaaS Hero Engine**: Modern hero with interactive grid canvas, dual CTAs, live intake badge, and telemetry HUD. | HTML5 Canvas, GSAP, CSS Flexbox |
| [`landing_page_prototype.html`](file:///home/dhanush/Projects/Active/anvaya/landing_page_prototype.html) | **Full Multi-Section Baseline**: Complete agency journey including comparison matrix, pricing tiers, sprint roadmap, and FAQ. | GSAP ScrollTrigger, Responsive CSS |
| [`nav_sample.html`](file:///home/dhanush/Projects/Active/anvaya/nav_sample.html) | **Dynamic Floating Pill Navigation**: Detached capsule expanding to 920px at ceiling and shrinking to 670px on scroll, with full-screen mobile curtain. | GSAP, Backdrop Filter, SVG Icons |
| [`footer_sample.html`](file:///home/dhanush/Projects/Active/anvaya/footer_sample.html) | **Monolithic Footer**: Aceternity TextHoverEffect with hairline Helvetica stroke and cursor-tracking 5-stop radial gradient reveal. | SVG Masks, Linear Gradients, Mouse Tracking |
| [`palette_preview.html`](file:///home/dhanush/Projects/Active/anvaya/palette_preview.html) | **Design Tokens & Palette Spec**: Color swatches, typographic scale, and contrast ratios for Ceramic Editorial. | CSS Variables, Typography Matrix |

---

## Component Integration Matrix (Master Showcase)

The master prototype ([`anvaya_master_showcase.html`](file:///home/dhanush/Projects/Active/anvaya/anvaya_master_showcase.html)) harmonizes the following component systems:

1. **Aceternity Dynamic Notch** (`@aceternity/notch`):
   - Centered floating pill navigation that expands into a 3-column sprint tier menu on click (`The 14-Day Launchpad`, `AI Vector Engine`, `Interface Sprint`).
2. **React Bits Star Border** (`@react-bits/StarBorder`):
   - Dual-beam orbiting radial gradient borders applied to the notch action button and the hero primary CTA (`Schedule 14-Day Sprint`).
3. **React Bits Shiny Text** (`@react-bits/ShinyText`):
   - Directional text shimmer gradient over the intake status pill (`ANVAYA PROTOCOL • ACCEPTING Q4 SPRINT INTAKE`).
4. **React Bits Light Tunnel** (`@react-bits/LightTunnel`):
   - Hardware-accelerated GLSL shader running in Light Mode with deep violet cable geometry and reactive mouse-offset parallax.
5. **React Bits Text Loop** (`@react-bits/TextLoop`):
   - Kinetic infinite capabilities ticker ribbon (`14-Day Production Sprints ✦ Deterministic AI Architecture ✦ checkDK Rust AST Compiler ✦ 100% Day-1 IP Ownership`).
6. **React Bits Scroll Expand (Hero-Integrated)** (`@react-bits/ScrollExpand`):
   - Anchored directly inside the Hero beneath the headline and CTAs. Features an authentic production system asset (`anvaya_cockpit_asset.jpg`) displaying live microservices topology, pgvector cluster, p99 12ms latency, throughput waves, and AST diff inspection. Pinned GSAP ScrollTrigger timeline smoothly lifts the hero copy and expands the card to full 100vw x 100vh viewport before releasing to the rest of the page.
7. **React Bits Stroke Text** (`@react-bits/StrokeText`):
   - Scroll-triggered SVG stroke dashoffset animation revealing the agency motto `SYSTEMS OVER SLOP`.
8. **React Bits Morph Slider** (`@react-bits/MorphSlider`):
   - Interactive proof-of-work carousel cycling through live telemetry across checkDK AST Engine, Oppy Browser runtime, and bare-metal n8n automation cluster.
9. **Aceternity Text Hover Effect Footer** (`@aceternity/text-hover-effect`):
   - Hairline stroke outline of "ANVAYA" with cursor-following radial mask revealing a 5-stop spectral gradient.

---

## Design System Tokens (Ceramic Editorial)

- **Canvas Background**: `#F8F9FC`
- **Surface Elevation**: `#FFFFFF`
- **Hairline Dividers**: `#E2E8F0` / `#CBD5E1`
- **Primary Ink**: `#0A0D17`
- **Body Slate**: `#475569`
- **Velocity Accent**: `#004CE8` (Cobalt Royal Blue)
- **Kinetic Accent**: `#A855F7` (Electric Violet)
- **Status Accent**: `#10B981` (Emerald Green)
- **Typography**: Plus Jakarta Sans (Headings/Body), JetBrains Mono (Code/Metadata)

---

## Production Target Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + Lucide Icons
- **Animation**: GSAP 3.12 + ScrollTrigger, WebGL 2.0 GLSL Shaders
- **Components**: Shadcn UI + Aceternity UI + React Bits
- **Deployment**: Cloudflare Pages / Workers or Docker on bare metal with Cloudflare Zero Trust
