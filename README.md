# Anvaya Studio

An Awwwards-inspired, client-first redesign following `/Users/Harika/Downloads/anvaya_design.md` and the owner's approved cinematic editorial direction. The current homepage adapts the visual rhythm of https://www.eugeniagrab.com/en: warm ivory, rose-brown accents, locally hosted Cormorant and Inter, offset serif headlines, five numbered work scenes, oversized service initials, centered process/FAQ accordions, and a taupe footer. An original dreamy glass-lotus background, inspired by the owner's three supplied image references, and a quiet Sanskrit definition retain Anvaya’s Indian connection. Founders and CTOs lead the positioning; agency content reflects the owner's confirmed services, prices, payment, ownership, and warranty terms. No reference-site artwork, source code, copy, or credentials are reused.

## Development

```bash
npm run dev
```

Open http://localhost:3000. In environments that block Turbopack’s worker ports, use `npm run dev -- --webpack`.

## Verification

```bash
npm run lint
npm run build -- --webpack
npm run test:e2e
```

Browser checks start their own production server on port 3107 and cover desktop, mobile, and reduced motion. They use installed Google Chrome on macOS; elsewhere install Playwright Chromium (`npx playwright install chromium`) or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Screenshots and failure traces are written to ignored `test-results/`.

## Content and interactions

- `app/lib/studio.ts`: services, six project studies, prices, FAQs, and public contact settings.
- `app/globals.css`, `app/editorial.css`, and `app/reference.css`: shared tokens, typography, responsive layouts, service panels, accordions, and pricing comparisons across all routes.
- `app/components/studio/Brand.tsx`: an uppercase Cormorant wordmark shared by the fixed header and centered footer; the favicon remains a simple monogram.
- `app/components/studio/Hero.tsx`: four offset Cormorant lines, readable HTML positioning and project actions, immediate responsive fallback artwork, and finite masked anime.js text reveals.
- `app/components/studio/HeroBackdrop.tsx`: progressive enhancement of the original glass-lotus picture. Anime.js owns the finite 1.8-second image entrance; separate GSAP wrappers own slow floating movement, fine-pointer parallax, and 18px desktop scroll drift. The owner-requested water cursor is a quiet glass ring around the native pointer, with real image refraction from cursor trails and clicks in `hero-water.ts`. The optional single-quad shader is loaded only for fine desktop pointers, capped at 30fps and DPR 1, and stopped offscreen or when the tab is hidden. A keyboard-accessible Pause/Resume control stops all background motion. Touch devices keep gentle drift without a cursor or WebGL; reduced motion stays static. Route changes, pauses, preference changes, image failures, and context loss retain the original picture and release graphics/listeners. The previous `HeroArtwork.tsx` is preserved but no longer imported.
- `app/components/studio/ConnectionStory.tsx`: narrow introductory copy, thin vertical arrows, and original SVG botanical linework with slight scroll response.
- `app/components/studio/WorkStory.tsx`: five numbered, tonally progressing portfolio scenes with honest public/internal/anonymous provenance. Each scene pins briefly on sufficiently tall desktop viewports only. Mobile, narrow windows, reduced motion, and no-JavaScript views remain normally stacked; resizing, preference changes, and navigation remove pins. The Spatial Web Engine scene keeps the interactive sample controls.
- `app/components/studio/ServiceExplorer.tsx`: outcome-focused panel with a large initial, four keyboard-accessible previews, finite anime.js content transitions, and shared brief selection.
- `app/components/studio/StudioIntro.tsx`: a Bellhop-inspired, approximately 3.2-second monogram introduction. A small, centered Anvaya `A.` alternates between solid/outline Hind and Sahitya styles on ivory, then fades into the hero. No downloaded GIF, progress bar, counter, subtitle, or ornamental symbols. Shows once per tab session, supports Skip/Escape, bypasses reduced motion and direct section links, and restores focus/scroll access. The typography sequence is decorative, not measured resource progress.
- `app/components/studio/Motion.tsx`: short GSAP ScrollTrigger reveals and anime.js drawing for technical schematics. No magnetic buttons, rotating motifs, or footer parallax.
- `app/components/studio/SpatialDemo.tsx`: interactive sample geometry with anime.js camera transitions, drag rotation, accessible slider, room selection, plan view, and wireframe.
- `app/components/studio/BriefBuilder.tsx`: service-aware scope estimates, validation, downloadable/copyable project briefs, and optional email drafts.

Routes include `/`, `/work`, six `/work/[slug]` pages, four `/services/[slug]` pages, `/project`, `/privacy`, and `/terms`. Motion respects reduced-motion preferences and cleans up on route changes. The intro temporarily pauses page interaction, with a five-second fail-open and no-JavaScript bypass; there is no scroll interception after it finishes.

Anime.js research and lifecycle decisions are documented in `ANIMEJS_DOCS.md`, with project-scoped guidance in `.gemini/skills/animejs/SKILL.md`. Local Firecrawl was offline (Docker daemon stopped); the owner approved the fallback to official documentation.

## Original artwork

The active hero uses an original AI-generated glass-lotus water garden, created with the built-in image-generation tool from the owner's three WhatsApp image references. Its calm center, translucent blush petals, muted jade glass leaves, and soft refracted daylight are adapted for dark editorial typography. CSS veils keep the headline and actions readable. The decorative art is not presented as a client project.

`public/art/dreamy-lotus-desktop.webp` is ~160 KB; the portrait mobile crop is ~85 KB. The preserved original is `assets/hero/dreamy-lotus-source.png`. Reference roles, constraints, and the full final prompt are recorded in `docs/dreamy-lotus-art-direction.md`. Regenerate the optimized variants with:

```bash
node scripts/prepare-lotus-art.mjs assets/hero/dreamy-lotus-source.png
```

The earlier `public/art/palash.glb` (~502 KB), transparent posters, and procedural generation script are preserved but not fetched by the hero. Rebuild that archived study in a separate background Blender process, leaving any interactive session untouched:

```bash
/Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup --python scripts/build-palash.py
```

The archived script exports the model and renders both posters. The active hero uses locally hosted WebP images and no third-party asset requests. Its desktop water shader is optional; the original picture remains usable without a graphics context.

## Items awaiting owner input

- The owner withdrew the provisional email. `studio.email` is intentionally empty; WhatsApp and booking links are omitted. The brief builder currently prepares, copies, and downloads information locally. It does not submit an enquiry. Adding a confirmed email enables an explicitly labeled email-draft action; server-side sending requires an actual delivery service.
- Product recordings, screenshots, production viewer assets, and public benchmark reports were not supplied. Previews are labeled illustrations or documented commands; numerical performance/test badges are not presented as independently verified evidence.
- The anonymous quality harness intentionally excludes the private project name and client details.

No deployment is performed by this redesign. The original dark hero components and older planning documents are preserved but no longer used by the homepage.

Dependency review: `npm audit --omit=dev` reports no production advisories. The installed Next.js ESLint toolchain still reports a development-only transitive `braces` advisory; the audit's suggested forced downgrade is not applied because it would replace the project's Next.js 16 lint configuration with a different major version.

Cormorant and Inter use self-hosted Latin variable WOFF2 files from the official Google Fonts service (~84 KB combined). Sahitya and Hind remain locally bundled for the Sanskrit signature and unchanged capital-A intro. All four families have OFL notices in `app/fonts/`. Geist Mono is bundled from the installed Next.js distribution with its OFL notice. No runtime font service is called. Oppy’s public command reference links to its npm package: https://www.npmjs.com/package/@dshenoyh/oppy-cli.
