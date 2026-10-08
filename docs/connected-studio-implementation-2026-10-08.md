# Connected studio implementation — 8 October 2026

The owner's complete Anvaya website script is implemented on `redesign/anvaya-connected-studio`. The current warm ivory, espresso and terracotta direction supersedes the historical cobalt/Lusion instructions. This is a local implementation; no deployment, push or live email delivery is claimed.

## Delivered behavior

Eight core routes are available: Home, Services, four practice pages, Studio and Start a Project. Home contains the loading transition and eight scrolling content sections. The shared header exposes Services, Studio and Start a Project, with the wordmark linking Home and no Menu overlay. Each informational page has a final project action; Project has its specified four sections. Privacy and retained Terms are supporting routes.

The original procedural architectural hero has matching local posters, a moving terracotta thread, Pause/Resume and visibility suspension. Immediate HTML remains useful without JavaScript or artwork. Reduced motion bypasses the transition and WebGL, including changes made while the page is open. The introduction supports Skip and Escape, restores focus and has a 2.7-second safeguard. The four-world selector supports touch, keyboard and pointer interaction. Scrolling is native, with no pinned introduction or water behavior.

Legacy service IDs remain `interface`, `product`, `automation` and `spatial`; legacy URLs permanently redirect to the new practice routes and still seed the enquiry form. `/about` redirects to Studio. Work and historical case URLs return the custom 404 until genuine case studies are ready. No fake proof, client logos, counts or testimonials have been added. Existing commercial terms are retained. The previous Oura changes remain untouched in `stash@{0}`.

Project enquiries use a validated Next.js Server Action and Resend, with owner-selected INR budget guidance, synchronized practice selection, safe reply-to, a fixed recipient and provider idempotency. Provider rejection, network failure, missing configuration and missing accepted-message IDs show unsent errors while retaining entries. Success is shown only after provider acceptance. Copy and download create explicit local backups and do not send anything. There is no enquiry database, autoresponder or browser storage of form contents.

## Verification results

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
