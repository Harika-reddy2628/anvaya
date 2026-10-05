---
name: anvaya-animejs
description: Project-scoped guidance for restrained Anime.js v4 hero, intro, and technical SVG motion in the Anvaya Next.js website.
---

# Anvaya Anime.js motion

Use this guidance when maintaining the site's Anime.js loading intro, hero reveals, line drawing, or interactive camera transitions.

## Reference and tools

Read `../../../ANIMEJS_DOCS.md` (relative to this skill directory) for research provenance and authoritative links. Consult the installed `node_modules/animejs/dist/modules/` declarations when an API contract is unclear. Local Firecrawl is expected at `http://localhost:3002/v1/scrape`; it was unavailable during the initial research. Never represent failed scraping as a successful source.

## Rules

1. Use the installed v4 named exports and millisecond durations; avoid legacy v3 APIs.
2. Keep browser animation code in client components. Read the relevant installed Next.js guide before changing Next-specific behavior.
3. Construct DOM animations inside a rooted `createScope`. Explicitly revert graphics-state animations and clean up native handlers, timers, observers, frames, and GPU resources.
4. Give each animated property one owner. Anime.js owns text, grain reveal, and pointer orientation; GSAP owns a separate hero scroll offset and other page scroll choreography.
5. Preserve visible server-rendered content and a no-JavaScript escape path. Never leave a permanent overlay, inert page, or scroll lock.
6. Respect reduced motion, provide Skip/Escape, and label decorative sequence counters honestly.
7. Keep imagery and agency claims accurate: sample geometry is not a client deliverable or independently verified benchmark.
8. Verify desktop, narrow mobile, reduced motion, intro completion, skipping, repeat navigation, and no-JavaScript access. Run lint, production build, and browser tests.
9. Honor the approved cinematic, professional direction: clean wordmark, serif headlines, original Palash glass artwork, finite grain entrance, subtle pointer response, and clear engineering positioning. Do not reintroduce ornamental seals, rotating mandalas, oversized cultural symbols, magnetic buttons, perpetual spins, or scroll interception. Retain the immediate static-poster fallback.
