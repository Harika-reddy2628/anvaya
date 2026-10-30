# Anvaya — Make. Move. Matter.

Technology and design studio. India, working globally.

The site implements the owner's complete website script with warm ivory/espresso/terracotta styling, an original architectural Three.js hero, one continuous thread motif, an editorial GSAP/Lenis motion layer and eight core pages. Since 23 October 2026 the visual system follows the West Road residence walkthrough: ink, ivory and a warm accent; Instrument Serif, Inter Tight and JetBrains Mono; glass pills, a numbered section rail and a depth ruler. Branch `redesign/cinematic-studio`; the previous ivory/espresso design is commit `02d2290`. [DESIGN.md](DESIGN.md) and the [implementation contract](docs/anvaya-connected-studio-plan.md) are the current authority. Earlier Lusion/lotus components are historical and are not imported by active pages.

## Run locally

Use Node 22 LTS with the committed lockfile:

```bash
npm ci
npm run dev
```

Preview: http://localhost:3000. Fonts, posters and runtime scene source are local. No Blender, Docker, cloud renderer or external font service is required. The older Oura iteration remains in its Git stash; it has not been applied or discarded.

## Pages

Home `/`; Services `/services`; Digital Presence `/services/digital-presence`; Digital Products `/services/digital-products`; Intelligent Operations `/services/intelligent-operations`; Spatial Visuals `/services/spatial-visuals`; Studio `/studio`; Start a Project `/project`.

Privacy `/privacy` and retained Terms `/terms` are supporting URLs. `/about` redirects to Studio; old `/services/interface|product|automation|spatial` paths permanently redirect to named practices. Existing service IDs still seed `/project?service=...` correctly. Work and historical cases return 404 until genuine launch-ready evidence exists.

Header/footer navigation has no separate Home link, Menu overlay or Work link. The wordmark links Home. Mobile exposes the same destinations directly. Project follows the specified four-section composition and uses its form as the primary action.

Digital Products and Intelligent Operations are marked **Coming soon** in Home's world tabs, the Home/Services listings, their practice pages and the project form. Their pages remain available as previews; practice actions lead to the Services listing. Both enquiry choices are disabled and rejected by server validation. Legacy and named enquiry seeds for these practices show the status and select “Not sure yet”; Digital Presence and Spatial Visuals remain available.

## Real project enquiries

The form sends through a Next.js Server Action and Resend. It validates on the server, uses a fixed recipient and safe reply-to, keeps entries after errors, and reports success only after Resend returns an accepted message ID. Copy/download remain local backups and do not send an enquiry.

Copy `.env.example` to `.env.local` and configure privately:

- `RESEND_API_KEY`: server-only sending key.
- `PROJECT_ENQUIRY_FROM`: sender on a domain verified in Resend.
- `PROJECT_ENQUIRY_TO`: receiving studio inbox; falls back to a confirmed `NEXT_PUBLIC_CONTACT_EMAIL`.
- Optional public email, WhatsApp and active social URLs listed in the example.

Restart development after configuration. Rebuild after changing public variables. Do not commit `.env.local` or paste keys into chat. Without confirmed settings the form reports that the enquiry has not been sent; no contact addresses or links are invented. Live inbox delivery is not verified until real settings are supplied and a controlled test reaches the studio inbox.

There is no enquiry database, browser persistence of form contents, analytics or visitor autoresponder. Privacy explains the email flow and optional session preference for the introduction.

## Motion and artwork

The one-time Home transition draws the logo mark and reveals the wordmark in about 2.35 seconds, with a 2.7-second safeguard, Skip/Escape, focus restoration and reduced-motion/deep-link bypass. Static HTML stays available without JavaScript. Note: in `next dev`, React Strict Mode double-mounts effects, which marks the intro as seen on first load; check the intro against `npm run build && npm run start`.

The architectural scene never rotates; its camera drifts with hero scroll and the mouse, rendering on demand only. GSAP moves the SVG bindu, with Pause/Resume and visibility suspension. `app/components/cinema/MotionLayer.tsx` owns Lenis smooth scrolling, ScrollTrigger/SplitText reveals, the pinned horizontal How We Work sequence (≥1100px), header states, scroll progress, route curtains, the fine-pointer cursor and magnetic actions. Reduced motion loads no WebGL and none of that layer. Context failure retains the matching poster. Four original SVG worlds have keyboard/touch equivalents. No old lotus/water assets or client-evidence illustrations load through active routes.

Regenerate clean posters and screenshots against a running preview:

```bash
node scripts/capture-connected.mjs http://localhost:3000 --posters
node scripts/measure-connected.mjs http://localhost:3000
```

Sources: `app/components/cinema/HeroScene.tsx`, the SVG world artwork in Shared, local font license files and [asset manifest](docs/anvaya-connected-art-manifest.md). Screenshot output is ignored under `test-results/connected-studio/`.

## Verify

```bash
npx playwright install chromium webkit
npm run lint
npm run build -- --webpack
npm run test:e2e
```

The suite starts the production server at 127.0.0.1:3107 with email credentials explicitly empty. Server-side provider tests use mocked fetch responses; no live email is sent. Profiles cover desktop/mobile Chromium, reduced-motion Chromium and desktop/mobile WebKit. Actual Safari and physical phones are separate verification requirements, not implied by emulation.

See the [implementation report](docs/connected-studio-implementation-2026-10-08.md) for current results and remaining configuration.

## GitHub Pages preview

A static preview builds with `GITHUB_PAGES=1` (served under `/anvaya/`). Static hosting has no server, so the enquiry form reports that nothing was sent and offers the local copy/download backups. Use a Node host (for example Vercel) for live email delivery.

```bash
GITHUB_PAGES=1 NEXT_PUBLIC_SITE_URL=https://harika-reddy2628.github.io/anvaya npx next build --webpack
touch out/.nojekyll   # serve the _next/ folder
```

The contents of `out/` are published to the `gh-pages` branch.

## Logo files

`public/brand/` holds the Anvaya logo: `anvaya-logo.svg` (mark, wordmark and अन्वय, for light backgrounds), `anvaya-logo-dark.svg` (for dark backgrounds), and `anvaya-mark.svg` / `anvaya-mark-light.svg` (the AN monogram in a rounded tile), each with a transparent PNG at 4x. The wordmark and अन्वय are outlined from the site's own Inter (600) and Hind fonts, so the SVGs need no fonts installed. The mark is the one in the header: an A and an N joined by a blue thread running from the A's crossbar into the N's stem.
