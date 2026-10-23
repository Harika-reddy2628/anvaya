# Connected studio implementation — updated 12 October 2026

The owner's complete Anvaya website script is implemented on `redesign/anvaya-connected-studio`. The current warm ivory, espresso and terracotta direction supersedes the historical cobalt/Lusion instructions. This is a local implementation; no deployment, push or live email delivery is claimed.

## Availability update — 12 October 2026

The owner requested **Coming soon** for Digital Products and Intelligent Operations. A shared availability flag now drives the terracotta status labels in the Home world tabs, Home/Services practice listings, practice-page heroes and disabled project-form choices. Listing actions say Preview; existing practice routes, copy and legacy redirects remain accessible. Their detail-page actions lead to available practices. Digital Presence and Spatial Visuals remain open for enquiries.

Legacy and named enquiry seeds for the two upcoming practices show an explanation and select Not sure yet. Server validation rejects either unavailable ID, including tampered submissions mixing available and upcoming practices, before the email provider is contacted. Existing multi-practice selection and local backup coverage now use the available practices.

Latest checks: `npm run lint` and `npm run build -- --webpack` pass; `npm run test:e2e` reports **140 passed, 0 failed, 0 skipped in 41.6 seconds**. The five profiles cover desktop Chromium 1440 × 1000, iPhone 13 Chromium emulation, reduced-motion Chromium, desktop WebKit 1440 × 1000 and iPhone 13 WebKit emulation. Node 22.23.3 ran on arm64 macOS 26.5.2 (25F84). Browser versions recorded during capture: installed Chrome **147.0.7727.56** and Playwright WebKit **26.6**. Provider responses were mocked; no email was sent.

Visual captures of world tabs, both Services listings, both practice heroes and enquiry choices are under ignored `test-results/coming-soon/`. The production build was served temporarily on 127.0.0.1:3108 with sending credentials empty. There are **48 component screenshots**, covering both browser engines at 1440 × 1000, 1024 × 768, 390 × 844 and 320 × 740; `report.json` records zero horizontal-overflow checks or captured page errors. Capture contexts used reduced motion. Representative images reviewed for hierarchy, readable labels, spacing and wrapping:

- [Desktop Digital Products listing](../test-results/coming-soon/chromium-desktop-products-listing.png)
- [Mobile world tabs](../test-results/coming-soon/chromium-mobile-world-tabs.png)
- [Narrow Intelligent Operations listing](../test-results/coming-soon/webkit-narrow-operations-listing.png)
- [Mobile Intelligent Operations hero](../test-results/coming-soon/webkit-mobile-operations-hero.png)
- [Desktop enquiry choices](../test-results/coming-soon/chromium-desktop-project-choices.png)
- [Narrow WebKit enquiry choices](../test-results/coming-soon/webkit-narrow-project-choices.png)

Actual Mac Safari **26.5.2** was opened on the updated local Services page. DOM inspection remains blocked because Allow JavaScript from Apple Events is disabled; the setting was not changed. Actual Safari interactions and physical iPhone/Android coverage remain unverified; WebKit and device emulation results do not imply them.

No artwork or scene-rendering code changed. Poster sizes were reconfirmed: desktop **19,080 bytes**, mobile **6,348 bytes**, total **25,428 bytes**. The original frame-cadence and scene-complexity measurements below remain historical measurements; this status update introduces no new performance claim. README, the implementation contract and DESIGN.md now record the owner’s availability update. The development preview continues at http://127.0.0.1:3000.

## Delivered behavior

Eight core routes are available: Home, Services, four practice pages, Studio and Start a Project. Home contains the loading transition and eight scrolling content sections. The shared header exposes Services, Studio and Start a Project, with the wordmark linking Home and no Menu overlay. Each informational page has a final action; upcoming practices direct visitors to available services. Project has its specified four sections. Privacy and retained Terms are supporting routes.

The original procedural architectural hero has matching local posters, a moving terracotta thread, Pause/Resume and visibility suspension. Immediate HTML remains useful without JavaScript or artwork. Reduced motion bypasses the transition and WebGL, including changes made while the page is open. The introduction supports Skip and Escape, restores focus and has a 2.7-second safeguard. The four-world selector supports touch, keyboard and pointer interaction. Scrolling is native, with no pinned introduction or water behavior.

Legacy service IDs remain `interface`, `product`, `automation` and `spatial`; legacy URLs permanently redirect to the new practice routes. Available-practice IDs seed the enquiry form; upcoming-practice IDs show their status and default to Not sure yet. `/about` redirects to Studio. Work and historical case URLs return the custom 404 until genuine case studies are ready. No fake proof, client logos, counts or testimonials have been added. Existing commercial terms are retained. The previous Oura changes remain untouched in `stash@{0}`.

Project enquiries use a validated Next.js Server Action and Resend, with owner-selected INR budget guidance, synchronized practice selection, safe reply-to, a fixed recipient and provider idempotency. Provider rejection, network failure, missing configuration and missing accepted-message IDs show unsent errors while retaining entries. Success is shown only after provider acceptance. Copy and download create explicit local backups and do not send anything. There is no enquiry database, autoresponder or browser storage of form contents.

## Original verification results — 8 October 2026

| Check | Result |
| --- | --- |
| `npm run lint` | Pass |
| `npm run build -- --webpack` | Pass, Next.js 16.3.8 under Node 22 |
| `npm run test:e2e` | **125 passed, 0 failed, 0 skipped; 42.5 seconds** |
| Final screenshot sweep | 32 page/viewport combinations, 64 viewport/full-page PNGs; no horizontal overflow or captured page errors |
| `git diff --check` | Pass |
| `npm audit --omit=dev` | 0 production vulnerabilities at verification time; this is not a clean full-development audit claim |

Browser profiles: desktop Chromium 1440 × 1000; iPhone 13 Chromium emulation; reduced-motion Chromium; desktop WebKit 1440 × 1000; iPhone 13 WebKit emulation. Chromium used installed Google Chrome 147; Playwright is 1.63.0, with WebKit 26.6/revision 2359. The Chrome executable override is scoped to Chromium projects. Tests start the production server after the build and explicitly clear email credentials; provider tests mock fetch and send no real emails.

Coverage includes the eight core routes, legal routes, legacy redirects, unpublished Work, native navigation/history, focus/skip links, introduction controls, keyboard tabs, service query selection, INR options, form validation and retained values, local backups, provider outcomes, JavaScript-disabled content, WebGL failure, poster failure and live reduced-motion changes.

## Visual evidence

Final captures are under ignored `test-results/connected-studio/`, regenerated against the production preview on port 3108. Widths are 1440, 1024, 390 and 320 pixels. Every core page has viewport and full-page images for each width; `report.json` records scene details and overflow/error checks.

Representative reviewed images:

- `home-desktop.png`, `home-mobile.png`, `home-narrow.png`: hierarchy, architecture integration, readable supporting text and directly visible navigation.
- `services-desktop-full.png`, `presence-desktop-full.png`: spacing, repeated practice language and service-detail composition.
- `studio-mobile-full.png`, `project-mobile-full.png`: small-screen narrative, form layout and footer.

The review resulted in a stronger soft scrim behind the hero description and a corrected narrow-screen capture that scrolls to the top after pausing the thread. Runtime scene and poster fallback were inspected. These captures are local review artifacts, not deployed assets. See the [art manifest](anvaya-connected-art-manifest.md) for original source, file sizes and licenses.

## Recorded performance

Machine: Mac16,1, Apple M4, arm64; macOS 26.5.2 (25F84). Temporary Node 22.23.3 was used without replacing the machine's system Node. Runtime assets and browser interaction do not depend on a cloud renderer or notebook.

`node scripts/measure-connected.mjs http://localhost:3108` measured desktop headless Chrome 147 at 1440 × 1000, with ANGLE Metal on Apple M4. After a 5-second warm-up, a 20-second sample recorded 601 animation-frame intervals: median **33.3 ms**, p95 **34.2 ms** (approximately 30 Hz). This records browser callback cadence while the SVG thread moves; it is neither a 60-fps claim nor a GPU frame-time measurement. The architectural scene renders only on initialization and resize. Its recorded 0.50 ms render-call duration is CPU-side submission time, not GPU execution time. Scene complexity was 18,998 triangles and 8 draw calls.

Desktop and mobile posters total 25,428 bytes. The original scene uses procedural geometry rather than downloaded mesh or texture payloads. Physical-phone performance, Safari compositor timing and continuous GPU timings have not been measured.

## Remaining owner setup and external coverage

Real email sending is implemented but **not configured or inbox-tested**. The owner has not supplied a confirmed public email, receiving inbox, verified sender/domain or Resend key. Set the server-only variables in `.env.example` privately, add any confirmed optional public contact/social URLs, restart/rebuild as appropriate, and run one controlled inbox delivery test. Until then the form truthfully reports that it has not sent the enquiry and offers local backups. Provider acceptance is not proof of final inbox delivery.

Actual Mac Safari was opened on the local preview, but automated DOM inspection was blocked by Safari's disabled “Allow JavaScript from Apple Events” setting. That setting was not changed. WebKit emulation passed; actual Safari interaction coverage remains unverified. No physical iPhone or Android device was available for verification.

The local development preview is available at http://localhost:3000. Publication and genuine Work case studies remain outside this delivery.

## Premium motion and identity update — 23 October 2026

Owner direction: Awwwards-style experience with full motion, existing palette plus a serif display face, and a new SVG logo mark. DESIGN.md and AGENTS.md record the changed motion rules.

Delivered:

- **Logo:** original arch/thread/bindu mark (`app/components/connected/Logo.tsx`), new favicon (`app/icon.svg`), header and footer lockups.
- **Loader:** espresso intro draws the mark, raises ANVAYA by letter, fills a terracotta rule with an italic counter and wipes into the hero (`Intro.tsx`). Same once-per-session, skip/Escape, focus, deep-link and reduced-motion rules; 2.7 s safeguard.
- **Motion layer:** `MotionLayer.tsx` with `app/lib/motion.ts` covers Lenis smooth scroll, SplitText line reveals, batch fades, artwork clip wipes, scroll word-fill, parallax, a scroll-linked marquee, the pinned horizontal How We Work sequence (≥1100px), header hide/solid states, scroll progress, route curtains, cursor and magnetic actions. Hero camera drift renders on demand (`HeroScene.tsx`).
- **Typography:** Cormorant display for H1/H2, practice names, step numbers and belief words, with italic MATTER.

Dependencies and assets:

- `lenis@1.3.27` (MIT). GSAP ScrollTrigger/SplitText come from the existing `gsap` package.
- `app/fonts/Cormorant-Italic-Latin.woff2`: 38,140 bytes, SHA-256 `6083e8c70461baccba95129ff8c91624f81b7d29a806a18b5d5916eaa44f03c3`. Taken from `@fontsource-variable/cormorant@5.3.0` (`files/cormorant-latin-wght-italic.woff2`) under OFL-1.1, the same family and licence as `Cormorant-OFL.txt`.

Verification on this Mac (Node v24.15.0, Playwright 1.63.0, installed Google Chrome for the Chromium projects, Playwright WebKit 2359):

- `npm run lint` passed and `npm run build -- --webpack` succeeded.
- `npm run test:e2e`: 169 passed and 1 skipped. The skip is intended: route curtains do not run in the reduced-motion project.
- New `tests/motion.spec.ts` covers the loader mark, the logo and favicon, curtain navigation with history, reduced-motion removal, horizontal pinning by width, and no-JavaScript visibility.
- The reference, motion and intro specs were repeated three times: 327 passed and 3 skipped.
- Screenshots were reviewed at 1440×900 and in iPhone 13 emulation.

Not verified: actual Safari, physical phones and frame-time measurements of the new scroll choreography.
