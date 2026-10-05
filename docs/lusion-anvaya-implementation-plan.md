# Anvaya — Lusion-inspired implementation plan and Mac handoff

Approved direction: 5 October 2026. Status: implementation specification; the redesign is not yet built. Visual authority: [DESIGN.md](../DESIGN.md). Agent entry point: [AGENTS.md](../AGENTS.md).

## 1. Outcome and fixed decisions

Build a professional engineering-studio website using [Lusion](https://lusion.co/) as the reference for layout, scale, work presentation, navigation, and interaction quality. The first deliverable is a polished, responsive Three.js hero, followed by a coherent adaptation of every existing Anvaya route.

The user selected an **abstract Lusion-style scene** and a **Lusion-like palette with subtle Indic branding**. Use cool pale backgrounds, black Inter typography, cobalt accents, rounded media stages, and restrained **अन्वय** branding. Create original connector geometry and Anvaya-specific content. Do not introduce a character-led direction, old gold/luxury styling, lotus artwork, or water shader.

Success means the first screen clearly communicates software, AI workflows, and spatial 3D; visitors can inspect credible work and prepare a project brief; the visual interactions work on pointer, keyboard, and touch; and the site remains usable when animation or WebGL is unavailable.

Preserve the existing route structure, service IDs, commercial data, project provenance, and local brief workflow. No backend API, email delivery service, newsletter, new public route, booking integration, or analytics service is required by this plan.

## 2. Starting point: read this before coding

This is a **documentation-only handoff**. The previous uncommitted warm-paper/terracotta UI iteration, its fixes, screenshots, and local output directories are intentionally not included. Do not assume those changes exist on the Mac.

The inspected remote baseline is `f6ddd297dbf252d66dc9e49400990ce66fe490df` on `origin/main` at [Harika-reddy2628/anvaya](https://github.com/Harika-reddy2628/anvaya). Its tree matches the earlier local baseline `286984b`, but its history was rewritten. Start from the latest remote including this handoff; do not force-push or transplant the old local history.

Verified baseline facts:

| Area | Current state | Required adaptation |
| --- | --- | --- |
| Stack | Next.js 16.3.6, React 19.2.8, GSAP 3.15, Anime.js 4.5, Three.js 0.186, TypeScript | Keep the stack; use installed guides and lockfile versions |
| Root layout | `StudioIntro` wraps the application | Remove the blocking intro from the active composition |
| Hero | Glass-lotus posters plus `HeroBackdrop` and intro-dependent animation | Replace with original connector scene and matching poster |
| Featured work | Five homepage projects; desktop ScrollTrigger pins | Present three complementary projects in normal flow; preserve all case studies |
| Styles | `globals.css`, `editorial.css`, and `reference.css` cascade | Replace active legacy theme rules with the new tokens; do not accumulate contradictory overrides |
| Fonts | Inter, Geist Mono, Sahitya, Hind, and Cormorant already local | Use the first four; do not preload Cormorant for active UI |
| Forms | Brief prepared locally; `studio.email` is empty | Preserve copy/download and accurate unsent state |
| Browser tests | Desktop Chromium, iPhone-sized Chromium, reduced-motion Chromium | Add desktop/mobile WebKit and retain meaningful functional coverage |

Routes to retain: `/`, `/work`, the six `/work/[slug]` pages, the four `/services/[slug]` pages, `/project`, `/privacy`, `/terms`, and the existing not-found behavior. Preserve `service` and `engagement` query behavior on `/project`.

Check the fresh checkout before relying on this inventory. If another commit has changed an affected area, adapt the implementation to the actual code while preserving the decisions above. Existing README and older art/animation notes describe the legacy application, not the new design.

## 3. Mac preparation

### Required website setup

Use a native Node 22 LTS installation on Apple Silicon (`arm64`) or Intel (`x86_64`). Use the committed npm lockfile; do not copy Linux `node_modules` or replace the lockfile merely to bootstrap the Mac.

From the repository root:

```bash
git status --short --branch
node --version
npm --version
sw_vers
uname -m
npm ci
npx playwright install chromium webkit
npm run dev
```

Use a fresh checkout or a normal fast-forward update of a clean Mac branch. Preserve existing Mac work if the checkout is dirty. Default development URL: `http://localhost:3000`. If Turbopack encounters a local environment problem, use the supported fallback:

```bash
npm run dev -- --webpack
```

Verify the installed Next.js guides after `npm ci`, particularly installation, server/client components, lazy loading, CSS, fonts, and images under `node_modules/next/dist/docs/`. The repo uses `app/`, not `src/app/`.

### Optional research and asset tools

- **Chrome DevTools:** connect to local Chrome through the available MCP tool or inspect manually. Browser inspection is sufficient for layout, computed styles, DOM structure, network assets, and interaction observation.
- **Firecrawl-local:** discover whether a local service already exists; use it for text/link/theme research, not as a source of WebGL behavior. If the skill/plugin is installed, read its local instructions. Do not assume port 3002, a Linux container setup, or shared credentials exist on the Mac. If unavailable, continue with live browser inspection and document the fallback.
- **Blender:** use a supported native build for the Mac's architecture. Detect the executable instead of hardcoding a Linux path. A common app-bundle executable is `/Applications/Blender.app/Contents/MacOS/Blender`. Check its version before scripting. On supported Apple Silicon hardware, use the installed version's Metal backend for optional Cycles renders; retain CPU/Eevee alternatives where supported. Browser Three.js rendering does not require Cycles or Metal configuration.
- **Blender MCP:** verify addon/server connectivity with a scene-info request before invoking it. The Linux research session had Blender installed but MCP disconnected; that says nothing about Mac connectivity. Use headless Blender or procedural Three.js geometry if MCP is unavailable.
- **Anvaya CLI:** locate an existing installation or a separately supplied CLI checkout; read its own agent/skill instructions. Start with `anvaya --help` and documented inspection/export commands. It is not a dependency of this website repository. Do not invent flags, copy a Linux virtualenv, or install a similarly named package blindly. Use it to validate/optimize assets when available; otherwise use Blender/glTF tools and record equivalent checks.
- **Kaggle:** optional offline compute only. Verify Mac authentication and GPU quota before any job; do not copy tokens from this machine. Never put credentials in client code. The six manufactured connector forms do not require neural character generation or a GPU notebook. If heavy offline rendering later needs Kaggle, use the documented Anvaya dispatcher, private jobs, and retrieve static outputs; the deployed site must not depend on a running notebook.

For organic/character generation in a separate Anvaya CLI project, obey that project's neural/Kaggle requirements. This plan uses manufactured abstract geometry and does not authorize a new character pipeline or cloud asset publication.

## 4. Phase A — baseline and reference audit

1. Run the current app, inspect active imports, and capture a baseline at 1440×1000 and 390×844. Identify the actual route, form, service-selection, and spatial-demo behaviors before changing their presentation.
2. Inspect Lusion's homepage, open menu, studio/about page, projects listing, and one project detail. Record navigation, work-hover behavior, scrolling, page entry, footer, and narrow-screen changes. Inspect available computed colors, type scale, spacing, radii, asset types, and canvas behavior. Do not claim to recover its original component or Blender source.
3. Create a reference matrix separating **observed** behavior from **Anvaya adaptation**. The research already observed a compact header, pale canvas, large rounded dark 3D stage with glossy cobalt/white/dark modular forms, large introduction, featured work, and contact navigation. Exact menu transitions, hover mechanics, and route effects still require observation; they are not verified by a text scrape.
4. Map Lusion destinations to existing Anvaya routes. Adapt the contact action to `/project`; omit its newsletter/Labs/audio UI unless an Anvaya implementation exists.
5. Save an audit note with source URLs, dates, viewports, screenshots, observations, unavailable effects/assets, and proposed equivalents. Keep generated browser output outside application bundles. Record shareable artifact locations in the final report.

Acceptance: a concrete reference/interaction checklist, a baseline inventory, and an honest list of adaptations. No scene generation is needed to complete this phase.

## 5. Phase B — hero quality checkpoint

Build the first complete hero before redesigning the rest of the site. Do not substitute a rendered video or flat image for the live prototype.

### Deliverables

- Server-rendered heading/copy/actions and responsive stage with fixed aspect space.
- A client-only `HeroScene` component with original beveled connector geometry.
- A shared scene configuration for geometry, material, camera, layout, and motion defaults.
- Desktop and mobile poster assets matching the scene's composed first pose.
- Pause/Resume control, reduced-motion alternative, startup failure fallback, and teardown behavior.
- Desktop/mobile screenshots and a short recording of pointer reaction, drift, Pause, and Resume.

### Scene construction

Start with the six-form composition and material/lighting ranges in `DESIGN.md`. Use Three.js extruded/beveled manufactured shapes, or Blender-authored meshes when it improves bevel quality. Reuse licensed example techniques rather than rebuilding rendering infrastructure. Keep broad studio highlights, clean normals, coherent scale, depth layers, and negative space. Begin with an opaque material setup and no postprocessing.

Use a procedural studio environment as the first reproducible lighting setup. A neutral Poly Haven CC0 studio HDRI may replace it when it demonstrably improves the result; record the exact asset and license. Existing third-party characters are not part of the selected direction.

Give desktop stage media roughly a 16:10 ratio and mobile roughly a 4:5 ratio, then frame the scene for each crop. Keep key heading/actions outside moving forms. Reserve media dimensions; do not force a tall fixed viewport composition on short screens.

Export posters from the browser scene's initial pose for the closest runtime match. A Blender poster is acceptable only when its framing/material appearance matches the live scene. Show the poster until the first successful live frame, then crossfade briefly without flashing a blank stage. The scene may refine rendering quality after startup without changing layout.

### Internal integration contract

Keep the scene interface small: a `paused` input and a readiness/error notification to the hero shell. Use an explicit internal status of `poster`, `loading`, `ready`, or `failed`; these are implementation states, not a fabricated progress percentage. Keep DOM copy, navigation, and the motion button outside the canvas. The renderer must not control React navigation or form state.

Use `next/dynamic` with `ssr: false` inside the Client Component boundary, as required by the installed Next.js guide. Load the renderer when the hero is visible and motion is permitted. A reduced-motion user receives the poster with no loop. Scene dependencies must not be eagerly loaded on legal or brief-only routes.

The loop runs only while ready, unpaused, in view, document-visible, and permitted by motion preferences. Pointer updates are damped with elapsed time; no scroll interception or required touch drag. Dispose owned resources and stop observers/listeners/loops on unmount. A failed async load after unmount must not update state or resurrect a renderer.

### Quality and review

Check screenshots against the Lusion reference and the design acceptance criteria. Look for dimensional silhouettes, bevel reflections, convincing depth, controlled whites, and stable mobile framing. Record actual triangle/draw-call counts, asset sizes, and frame times. Iterate lighting/composition first if the result looks generic or flat.

Share the working hero and evidence for feedback. Evaluate the checkpoint before repeating the visual direction across all pages; functional tests alone do not settle the visual review. Continue independently with non-dependent cleanup while feedback is pending. Do not claim that a renderer existing proves Lusion-level polish.

Acceptance: real live interaction, convincing desktop/mobile composition, matching poster, accessible motion control, usable fallback, and measured performance within the design targets or a clearly recorded quality reduction.

## 6. Phase C — shared theme and active composition

- Define the tokens from `DESIGN.md` in shared CSS and migrate active components to them. Keep existing route/form structural styles where useful, but remove competing active lotus/gold/serif theme overrides.
- Remove `StudioIntro` from the active root wrapper and retire the hero's dependency on `useIntroReady`. Content is immediately available; there is no preloader gate. Preserve the skip link and `ProjectProvider`.
- Replace the active hero artwork/backdrop imports, including water-shader dependencies. Retain historical files only if useful; they must not appear in active route bundles or initial network requests.
- Use Inter for display/body, Geist Mono for technical details, and Sahitya/Hind for Devanagari. Keep license files and avoid runtime font CDNs.
- Build the compact header and accessible full-screen menu specified in the design. Use real existing destinations; expose open/closed state and focus behavior semantically.
- Create shared button/link, panel, heading, divider, and focus treatments. Keep interactive labels concise and keep decorative rolling duplicates inaccessible to screen readers.
- Remove homepage work pins and any legacy cockpit pinning from active routes. Native scrolling and ordinary anchor behavior are required.
- Use GSAP for site timelines and Three.js for renderer updates. Retained Anime.js code may stay in archived components; no element should have two competing animation owners.
- Build the dark footer and large solid ANVAYA wordmark without another renderer.

Acceptance: header/menu/footer and typography work across desktop/mobile and reduced motion, content is accessible at first paint, and active imports no longer load legacy intro or hero effects.

## 7. Phase D — content and route adaptation

### Homepage order

1. Hero and immediate project/work actions.
2. Concise engineering collective introduction / connection statement.
3. Featured work: Spatial Web Engine, Guild Command Center, Oppy CLI.
4. Four-service explorer and related technical stack.
5. Four process milestones.
6. Engineering explorer for deeper inspection.
7. Existing three engagement/pricing offers and commercial terms.
8. Studio / **अन्वय** / Bengaluru section.
9. FAQ.
10. Local project brief.
11. Shared footer.

Use the responsive composition in `DESIGN.md`. Work media can be prominent without concealing project titles or provenance. Keep all six projects in `/work`; select three only for the homepage. Retain the interactive spatial demo on its relevant case study instead of forcing multiple active 3D scenes into the homepage.

### Shared behavior and data

- `app/lib/studio.ts` remains the source of truth for service/project/pricing content. No new public API or type contract is required. Extend presentation data only when it avoids hardcoding duplicate content.
- Preserve prices, turnaround assumptions, 50%/50% payment or agreed escrow, ownership after final payment, and the 14-day defect warranty. Do not introduce unsupported client testimonials or performance claims.
- Preserve Public product / Internal product / Internal showcase / Anonymous case study labels and evidence notes. Present illustrations as illustrations.
- Keep `ProjectContext` selection consistent between `ServiceExplorer` and the homepage `BriefBuilder`. The baseline brief has a local `override` that can hide later shared selection changes. For the homepage without `initialService`, derive the effective service from shared selection; retain intentional local selection on service-seeded project pages. Add a regression scenario for alternating the explorer and brief controls.
- Preserve brief validation, focus on errors/result, copy/download, retainer behavior, and route-seeded estimates. Empty contact configuration continues to mean no send action. Do not claim a brief has been submitted.
- Adapt work/service/detail/legal/not-found pages to the same theme, with readable long-form layouts and working back/next navigation. Retain query parameters and external product links.

Acceptance: all current content capabilities remain accessible, the four services and six cases are navigable, and every project entry path produces the correct brief estimate and service.

## 8. Phase E — visual interactions and browser hardening

Implement the motion table in `DESIGN.md`, with cleanup and accessibility as part of each interaction:

- Menu animation: one owned timeline, no focus escape, preserved scroll position, correct Escape/selection behavior.
- Button rolls: finite transforms with equivalent hover/focus styling and a single accessible name.
- Work feedback: slight media scale, restrained arrow movement, visible focus, no touch dependence and no nested interactive anchors.
- Section reveals: once on entry, short displacement, visible default content; no pinning or hidden-content failure state.
- Route entry: brief fade/translation attached to actual route changes. Do not delay native navigation or intercept modified clicks. Preserve hash targets, browser history, and scroll restoration.
- Disclosures: native semantics; no clipped content during resize. A static open/close is acceptable where animating height adds fragility.
- Reduced motion: handle changes while the page is open, cancel pending scene/timeline work, and prevent inline smooth-scroll settings from overriding reduced-motion behavior.

On Safari, verify body scroll locking/restoration, `inert` behavior, canvas resizing, touch scrolling, font loading, and context loss. Use supported APIs with graceful fallbacks. Keep WebGL startup errors local to the stage and offer the same project actions in the poster state.

Acceptance: all listed interactions have mouse, keyboard, touch, and reduced-motion behavior; no action depends on hovering the scene or waiting for a transition.

## 9. Verification plan

### Browser configuration on the Mac

The current `playwright.config.ts` places a Chrome executable path in shared `use.launchOptions`. Before adding WebKit, move that setting into Chromium projects only; WebKit must use its own installed browser. Keep the optional `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` override scoped to Chromium. Do not pass Chrome's app-bundle executable to WebKit.

Retain desktop Chromium, mobile-sized Chromium, and reduced-motion Chromium; add `webkit-desktop` using Desktop Safari and `webkit-mobile` using iPhone 13 with WebKit. Use the same local production server at `127.0.0.1:3107`. Installing WebKit alone does not add a test project. Playwright WebKit is valuable automated coverage; also perform a headed smoke check in actual Mac Safari.

### Required scenarios

| Area | Checks |
| --- | --- |
| First paint | Visible H1/actions and reserved poster space; no intro gate; useful page with JS disabled |
| Hero | Live first frame, pointer response, Pause/Resume, resize/orientation, offscreen suspension, tab visibility, teardown after navigation |
| Failure modes | WebGL unavailable, model/environment failure, context loss, reduced motion at load and changed mid-session |
| Menu | Open/close, Escape, Tab/Shift+Tab trapping, focus restoration, active destination, scroll position, navigation from another route to homepage anchors |
| Work/routes | Six cases and four services accessible; homepage has the selected three; back/forward and modifier-click intact |
| Brief | Invalid input focus, valid preparation, unsent message, download, copy failure fallback, local edits, service/retainer query seeds, alternating service controls |
| Responsive | 1440×1000, 1024×768, 390×844, 320×740; short height, 200% zoom, no overflow, touch targets ≥44px |
| Content | No invented metrics, clients, testimonials, email/scheduler functionality, or mislabeled illustrations |
| Assets | Local font and scene requests; no active lotus/water bundle requests; license manifest matches shipped files |

Update meaningful existing tests that assert obsolete intro/lotus/water behavior rather than preserving old behavior to keep them green. Retain functional coverage for navigation, forms, service selection, spatial controls, failure handling, and preferences. Assert semantic outcomes and owned lifecycle behavior; avoid brittle timing sleeps and huge snapshots that simply mirror markup.

Use these production checks after implementation:

```bash
npm run lint
npm run build -- --webpack
npm run test:e2e
```

The existing test webServer runs `next start`, so build before running the suite and leave port 3107 free. After adding the WebKit projects, they are included in the full suite. Use project filtering while diagnosing failures rather than skipping required coverage.

### Visual and performance evidence

Capture hero, menu open, intro/work boundary, work hover/focus, services, pricing, brief, and footer across the specified viewports. Compare them to the reference matrix and `DESIGN.md`; record missing real-device checks rather than silently treating emulation as hardware validation.

Record Mac model/architecture, browser versions, viewport, quality tier, asset sizes, triangle/draw-call counts, and test conditions. Do not include machine serial numbers or credentials. For frame timing, warm up 5 seconds and sample 20 seconds during idle and pointer movement; report median and p95 frame times. Target ≥50 FPS on the tested Mac and ≥30 FPS on a recorded physical mobile device. Fall back to the poster on devices that remain too slow at minimum quality. Use the design's CLS/LCP goals under named lab conditions; no invented field INP measurement.

Acceptance: lint/build and required browser scenarios pass; visual comparison demonstrates the intended quality; measured budgets or justified deviations are included in the delivery report.

## 10. Assets, checkpoints, and delivery

### Asset handling

Use locally hosted runtime files in `public/3d/anvaya/`, responsive posters in `public/art/`, and an asset manifest beside the scene assets. Each third-party entry records the exact source URL, creator, license, local filename, and modifications. Preserve source configuration or Blender source provenance. The Three.js library/code license does not automatically license a model found in an example or on GitHub.

Relevant primary sources:

- [Three.js documentation](https://threejs.org/docs/) and [source repository](https://github.com/mrdoob/three.js).
- [Poly Haven CC0 asset license](https://polyhaven.com/license).
- [Khronos glTF sample library](https://github.com/KhronosGroup/glTF-Sample-Assets): inspect per-model licensing; the catalog is not uniformly licensed for deployment.
- [Blender GPU rendering](https://docs.blender.org/manual/en/5.1/render/cycles/gpu_rendering.html) and [Mac requirements](https://www.blender.org/download/requirements/): match documentation to the installed version.
- [Blender glTF export](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html): inspect material/mesh export behavior.
- [Playwright browser setup](https://playwright.dev/docs/browsers).

### Suggested implementation checkpoints

Keep commits reviewable: reference audit → hero and assets → shared theme/navigation → content/routes → interaction/browser fixes → verification and updated README. Each checkpoint includes the relevant evidence and unresolved issues. Do not claim the full redesign is complete at the hero checkpoint.

During the implementation, update README to describe the actual new behavior and Mac verification steps. Add an implementation report with screenshots/artifact locations, browser results, performance numbers, asset attribution, and honest remaining limitations. Keep this plan as the approved baseline; record intentional deviations instead of silently changing the visual direction.

The handoff publication itself changes only this plan, `DESIGN.md`, and `AGENTS.md`. It does not change runtime code, lockfiles, tests, credentials, or generated assets. Future site implementation belongs in separate code commits made from this remote baseline.

## 11. First task for the receiving agent

Read this entire plan and `DESIGN.md`, inspect the fresh committed baseline, complete Mac setup and the reference matrix, then build the live hero and matching poster. Show its desktop/mobile screenshots and pointer/Pause behavior before carrying the visual treatment across the rest of the site. Proceed through the phases with recorded evidence; do not stop at a static mockup or an unreviewed generic 3D placeholder.
