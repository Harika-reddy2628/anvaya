# Anvaya implementation instructions

## Required plan and design

The current task is the owner's **ANVAYA — COMPLETE WEBSITE SCRIPT**, supplied 8 October 2026. Follow [the connected-studio implementation plan](docs/anvaya-connected-studio-plan.md) and [DESIGN.md](DESIGN.md). The complete script supersedes the previous Lusion/cobalt direction, former homepage composition, public Work launch and local-only enquiry restriction. The older [Lusion plan](docs/lusion-anvaya-implementation-plan.md) is historical.

Read relevant installed Next.js guides before changing code. Inspect the actual checkout. The earlier Oura iteration is preserved separately in `stash@{0}`; do not apply or discard it as part of this build.

## Build requirements

- Eight launch pages: Home, Services, four named practice pages, Studio and Start a Project (`/project`). Privacy and Terms are supporting pages.
- Use the owner's supplied copy, warm ivory, espresso, restrained terracotta, spacious editorial layouts and subtle **अन्वय** identity. No blue gradients, robots, stock coding imagery, invented client proof or project counts.
- Desktop navigation: brand → Home, Services, Studio, Start a Project. No separate Home link or Menu button. Keep the same destinations accessible on mobile without an overlay.
- Keep Work and all case-study URLs unpublished until 2–3 genuine case studies are ready. Preserve historical project data in source.
- Use original architectural Three.js geometry and matching local posters. Owner update, 23 October 2026: the site uses a full editorial motion layer (see DESIGN.md "Motion") — Lenis smooth scroll, scroll reveals, a pinned horizontal How We Work sequence, scroll/pointer camera drift rendered on demand, route curtains, magnetic actions and a custom cursor. Objects never rotate or orbit and there is still no ambient render loop. Reduced-motion and WebGL failures keep the poster and HTML actions usable and remove all of this motion.
- The owner's loading transition runs once per session on Home, lasts under three seconds, is skippable and bypassed for reduced motion and deep links. Never hide content without JavaScript.
- GSAP (with ScrollTrigger and SplitText) owns site motion, Lenis only smooths native window scrolling, and Three.js owns scene rendering. Clean up owned resources. Do not double-animate with Anime.js.
- Keep existing service IDs as compatibility keys and redirect legacy service URLs to named practices. Preserve existing commercial terms at `/terms`, without inserting old price packages into the new marketing copy.
- The owner explicitly selected **real email delivery through Resend** and **INR enquiry budget ranges**. Keep keys server-side, validate on the server and show success only when Resend returns an accepted message ID. Missing configuration or delivery failure must report an unsent enquiry. Retain copy/download as explicitly local backups.
- Use only owner-confirmed public contact details. Unconfigured email, WhatsApp and social links remain absent. Do not invent contact addresses or publish placeholder links.
- Do not deploy, add booking/newsletters or send messages to third parties beyond the authorized enquiry integration. Record asset provenance and reproducible poster preparation.

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
