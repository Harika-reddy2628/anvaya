# Anvaya implementation instructions

## Required plan and design

The approved next task is the Lusion-inspired Anvaya redesign. **Follow [the implementation plan](docs/lusion-anvaya-implementation-plan.md) in phase order and [DESIGN.md](DESIGN.md) for the visual system and interaction requirements.** Read both completely before changing the application. Then read the installed Next.js guides relevant to the change, as required below.

This handoff publishes documents only. The committed application is still the glass-lotus baseline; the previous uncommitted Indic professional iteration and its fixes/screenshots are not available in this checkout. Inspect the actual code rather than assuming that earlier work is present.

Current explicit user instructions take precedence. Otherwise, these two handoff documents supersede old theme directions in README, the historical glass-lotus art notes, and former Kinetic Yantra specifications. Do not merge the old gold/floral styling into the new direction.

## Build requirements

- Use an abstract, original Three.js connector scene with cobalt/white/dark materials. No character or mascot in this iteration.
- Use cool pale surfaces, black Inter typography, rounded media stages, and subtle Indic identity through **अन्वय** and connection geometry.
- Complete the reference audit and live hero/poster quality checkpoint before extending the visual treatment across all pages. Capture desktop/mobile evidence, compare it visually, and refine it; lint/build success does not establish visual quality.
- Keep immediate HTML content and useful actions, native scrolling, accessible navigation, keyboard/touch equivalents, reduced-motion handling, and WebGL/poster failure behavior.
- Preserve existing routes, service IDs, pricing/commercial terms, accurate project provenance, and the local brief workflow. Do not invent testimonials, benchmarks, client identities, contact addresses, or successful submission messages.
- Repair service-selection synchronization and replace legacy intro/pinning/water behavior as described in the plan. These changes are not already present in the published baseline.
- Keep animation ownership explicit: GSAP for site timelines, Three.js for the scene loop. Do not double-animate elements with Anime.js and GSAP. Clean up owned resources on navigation/unmount.
- Record third-party asset/code sources and licenses independently. Keep runtime assets local and preserve reproducible scene source or documented Blender source provenance.
- Do not add backend sending, booking, newsletters, or cloud publication merely to imitate a reference component. Use `/project` for the existing project action.

## Mac environment

The receiving implementation machine is a Mac; its CPU/GPU model is not specified. Use Node 22 LTS, the committed lockfile, and `npm ci`. Install Chromium and WebKit using the repository's Playwright version. Use repository-relative paths, architecture-native dependencies, and documented executable discovery. Do not require Linux paths, NVIDIA/CUDA, a copied virtualenv, Docker, or Kaggle to develop/run the website.

Blender, Blender MCP, Anvaya CLI, Firecrawl-local, and Kaggle are optional helpers. Verify local availability and read their installed instructions before use; do not assume the originating machine's tools or credentials exist. If an optional helper is unavailable, continue through the fallback in the plan and record the limitation. Browser interaction must run locally in Three.js and must not depend on cloud notebooks.

For complex/multi-file work, use ToolSearch to discover Ruflo tools such as `memory_search`, `memory_store`, and `hooks_route` when exposed. Check any available `[INTELLIGENCE]` suggestions. Ruflo was not exposed in the originating session; its absence must not block implementation. Do not invoke guessed tool names or overwrite project instructions with generated integration text.

## Verification and delivery

Follow the detailed test matrix and visual acceptance criteria in the plan and design. Run:

```bash
npm run lint
npm run build -- --webpack
npm run test:e2e
```

Build before the suite because its server runs `next start`. Before adding WebKit projects, scope the existing Chrome executable override to Chromium projects only. Retain meaningful functional coverage, replace obsolete lotus/intro tests, and add WebKit desktop/mobile coverage. Check actual Mac Safari as well; an iPhone-sized Chromium project is not Safari verification.

Report screenshots, tested browsers/device details, asset sizes, frame-time measurements, and unverified real-device coverage. Preserve unrelated user changes. Update README and an implementation report to match the delivered behavior; do not mark the entire redesign complete until the code, interactions, route coverage, and visual review meet the plan.

## Installed Next.js guidance

Preserve the generated block below. It is additional framework guidance, not a substitute for the implementation plan.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
