# Typography and content integration notes — 6 October 2026

The user asked to isolate the copy/typography version while another agent handled the theme. Subsequent instructions requested a new hero, no pricing anywhere on the homepage, and a consistent balance between a generic agency layout and excessive spectacle. The isolated branch is `polish/typography-copy` at `/mnt/faststorage/anvaya-typography`, based on shared commit `6414b3a`.

The delivered isolated version uses a restrained editorial hero, cool pale surfaces, Inter, cobalt accents and a small Indic signature. At the user's subsequent request, it also includes original generated connector artwork, optimized to a 27,148-byte local WebP. Its source and exact prompt are in [the artwork manifest](anvaya-connectors-art-manifest.md). It is a content/typography/image implementation; it does not complete the approved Three.js connector-scene checkpoint. Its static hero can serve as the content reference while the other branch owns scene work. Do not restore old warm/gold styling, lotus imagery, water effects or blocking introductions.

## Carry into the theme branch

- Preserve the new hero's clear offer: four services and their solutions, three practical expectations, and three specific strengths. The title is “Engineering, connected.” Services link to their existing route IDs; project actions retain `/project` and `#work`. Keep useful copy outside moving graphics.
- Remove the whole homepage's pricing section, commercial FAQ entries and hero pricing link. Pass `showPricing={false}` to both homepage `ServiceExplorer` and `BriefBuilder`. This also omits the budget field, estimate, payment copy, and commercial details in the generated/downloaded homepage brief. Leave defaults enabled on `/project` and retain service/legal commercial data. A command prompt such as `~ $` in the Oppy illustration is not a price.
- Keep `app/typography.css` as the owner of shared text roles. Inter headings/body, 16px body/input, 14px actions, 12px metadata, and a minimum 42px mobile hero keep text readable at 320px. Use Sahitya/Hind only for Indic text and Geist Mono for technical previews. Avoid competing typography rules in the three global layout layers.
- Use the same global tokens in supporting routes and SVG illustrations: canvas `#EEEFF5`, ink `#111218`, secondary `#555967`, cobalt `#2454FF`, white surfaces, dark stage/footer `#101116`, border `#D0D3DE`. Keep ordinary metadata at 4.5:1 contrast; use the on-dark text tokens on dark surfaces.
- The copy and semantic case-study headings are already in shared baseline `6414b3a`. Preserve all six work routes, service IDs, project provenance and the three featured homepage examples.
- Carry `ProjectContext.tsx` and `BriefBuilder.tsx` together: the unseeded homepage brief reads shared selection instead of a stale local override. The context's monotonic `selectionRevision` prevents an old prepared result from reappearing when a service changes away and back. Engagement changes also clear the result. Disable preparation and controlled selections before hydration; otherwise an early selection can be lost or a native form request can contain personal details. Show the local-only explanation in `noscript`.
- Keep service tabs before their panel, remove decorative service initials, and retain visible FAQ/process expansion controls.
- Every route's main landmark needs `tabIndex={-1}` so the keyboard skip link transfers focus. Preserve the visible mobile project action, 44px controls, native portfolio scrolling and immediate HTML.
- Scope the Chrome executable override to Chromium projects. The isolated Playwright config includes WebKit desktop/mobile and optional `PLAYWRIGHT_PORT` for independent worktree suites. Build fully before testing; do not rebuild `.next` while a production review/test server is reading it.
- The new tests cover homepage price removal through selection and downloaded brief preparation, native/no-JavaScript navigation, bidirectional selection and stale-result invalidation. Adapt graphics tests to the completed scene rather than reviving obsolete lotus assertions.

## Scene checkpoint findings

These observations concern the in-progress theme branch, not a finished redesign. Rechecked against its committed files during this rollout.

1. The earlier WebGL hero referenced missing `hero-connector-*.webp` posters. The later `KineticConnectorStage.tsx` supplies a client-only SVG illustration. The approved plan calls for original live Three.js geometry and a matching local poster. SVG alone does not complete that checkpoint, and client-only media provides no static scene without JavaScript.
2. `KineticConnectorStage` samples reduced motion only when its `paused` effect runs. Listen for changes during the session and stop/revert owned motion immediately. Suspend work offscreen and when the document is hidden.
3. The stage uses GSAP tilt and Anime.js ambient loops. The plan assigns site timelines to GSAP and scene updates to Three.js. Keep ownership explicit and clean up owned resources on pause/unmount.
4. The scene's 10px captions at 50–60% opacity are difficult to read. Use 12px metadata and on-dark secondary text. Omit implementation jargon such as “SPATIAL SYNTAX HARNESS” unless it helps a visitor understand a service.
5. Increase the observed 34px motion control to at least 44px. Only offer pause/resume when there is available motion. Limit pointer movement to a composed, restrained range; the current ±7° tilt exceeds the design's ±3° starting point.
6. Verify poster visibility on unavailable WebGL, initialization failure, context loss, disabled JavaScript and changed motion preferences. Hide a poster only after the first successful frame and restore it on failure.
7. Preserve the separate scene quality checkpoint: compare poster/live desktop and mobile crops, measure frame times on named hardware, and record actual macOS Safari/physical-phone coverage. Those device checks remain unverified in this Linux session.

The isolated delivery report and screenshots show the final text hierarchy and palette across routes. Scene implementation files in the theme checkout were not overwritten. Only these integration notes were added there.
