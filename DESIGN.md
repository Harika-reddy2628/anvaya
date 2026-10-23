# Anvaya — Make. Move. Matter.

Current authority: the owner's complete website script, 8 October 2026. Implementation contract: [connected-studio plan](docs/anvaya-connected-studio-plan.md). The former Lusion/cobalt and glass-lotus specifications are historical.

## Character and tokens

Owner direction, 23 October 2026: the whole site is redesigned in the visual language of Anvaya's West Road residence walkthrough (https://anvaya-westroad-tour.vercel.app/). It is a cinematic dark studio, like instrumentation laid over architecture. The owner's script remains the copy authority: use it verbatim for the principal headings, body copy and actions. The earlier warm-ivory/espresso connected-studio styling is preserved in Git (`02d2290`).

| Role | Value |
| --- | --- |
| Ink canvas | `#0B0A09` |
| Raised ink sections | `#12100E`, `#1A1714` |
| Ivory text | `#F2ECE3` |
| Secondary / tertiary text | ivory at 70% / 52% |
| Hairlines | ivory at 14% / 30% |
| Warm accent (bindu, thread, numbers, focus) | `#D27245` |
| Accent on ivory sections | `#A54F2A` |
| Ivory section ink / muted | `#2A241F` / `#5C5249` |

Two sections invert to ivory paper (Home "Why Anvaya", Studio "The belief") for rhythm. No blue, metallic gold, generic AI gradients, fake logos/testimonials or unsupported numbers.

Type, all self-hosted (OFL): Instrument Serif (roman and italic) for H1/H2, practice names, step numbers and the intro title. Inter Tight for text. JetBrains Mono, 11px uppercase at .08em, for kickers, pills, labels and meta rows. Hind for Devanagari. Italic serif marks the second clause of key headings and MATTER.

Grid: `--pad` clamp(20–40px). Full-bleed heroes use `.wrap-full`. Content uses `.wrap`, which reserves a 196px left column for the section rail at 1280px and wider. Sections run 96–168px with hairline separators. Reading measure stays around 40–62 characters.

Components:

- **Glass pills:** 44px+, 999px radius, hairline border, blurred ink. They invert to ivory on hover.
- **Actions:** pills with an ivory or accent fill sweep and a rotating ↗.
- **Kickers:** accent number, slash, label.
- **Plan frames:** a mono head row over hairline-framed artwork.
- **Practice map:** the hero's floor-plan panel, whose points link to the practices.
- **Page meta rows:** a progress hairline.

## Navigation and composition

Brand `ANVAYA.` (tracked wordmark, accent full stop) with अन्वय links Home. A centre tick ruler reads page depth like the tour's compass. Desktop right: Services and Studio pills, then the solid Start a Project ↗ pill. At 1280px and wider, a fixed numbered section rail (the tour's room index) lists the page's sections, underlines the current one, switches to ink over ivory sections and steps aside for the footer. No Home text link, second Menu button or Work link. Mobile uses brand/project action in the first row and visible Services/Studio links in the next row. All targets remain accessible without a modal.

Home has eight scrolling sections plus the one-time transition: Hero; The Point of Anvaya; The Anvaya Thread; What We Build; One Connected Studio; How We Work; Studio Note; Final CTA. The transition is an overlay, not an extra empty scroll section.

Services has five sections. Each practice page has five sections. Studio has five sections. Project has the four specified sections; the form is its primary action, so no duplicate self-link CTA is appended. Privacy and Terms are supporting pages. Work and all historical cases return the custom 404 until the proof requirement is met.

Owner update, 12 October 2026: Digital Products and Intelligent Operations show a small terracotta-outline “Coming soon” label beside their names in listings and world tabs, below their practice-page H1, and in disabled enquiry choices. Preserve readable contrast and original artwork/copy. Their detail pages offer available-practice navigation; no launch date or waitlist is implied. Digital Presence and Spatial Visuals remain available.

Reusable final CTA: THE NEXT MOVE / Have something worth building? / supplied body / Start a Project ↗. Home, practice and Studio variants use the owner's page-specific heading, action and copy. Footer uses the supplied positioning, Make / Move / Matter, India/global line, copyright and Privacy. Only confirmed contact/social links render.

## Logo

The primary identity is the tracked `ANVAYA.` wordmark, whose full stop is the accent bindu (`Wordmark` in `app/components/cinema/Logo.tsx`). It appears in the header, intro, route curtain and as the full-width footer signature. The original arch/thread/bindu mark (`LogoMark`) remains the favicon (`app/icon.svg`).

## Bindu, thread and original architecture

The hero is ink, with scrims like the tour's. It carries immediate HTML MAKE. MOVE. MATTER. copy (MATTER in italic), a kicker, actions, a meta row with a thread-progress hairline, a practice-map panel, a quiet original three-arch connection study, terracotta SVG thread and a small travelling bindu. Three.js architecture stays still. No orbit, object rotation, water, particles or stock imagery. The camera drifts slightly with hero scroll progress and the mouse; frames render only on load, resize and those changes, with no continuous WebGL loop.

Procedural beveled arches use stone, clay and ivory materials, broad lighting and local matching WebP posters. Scene code is retained as the reproducible source. Reserve dimensions before assets arrive. Poster remains available beneath the live renderer. WebGL creation/render/context failure stays local; reduced motion loads no renderer. Export both desktop and mobile posters directly from the same scene, without interface overlays.

The thread enters the next section through a fine gutter line.

Owner update, 23 October 2026: sections 02 and 03 on Home use four original rendered practice scenes instead of SVG illustrations. Each scene is rendered from two cameras, and the Anvaya thread glows through each one:

- **Digital Presence:** a gallery wall holding an interface.
- **Digital Products:** interface layers held in space.
- **Intelligent Operations:** stations joined by the thread, which forks at a decision arch.
- **Spatial Visuals:** an interior with light falling through arched openings.

They are abstract studies, never client screens.

**02 One thread, four worlds** is a walkthrough viewer in the tour idiom:

- The wide render fills the frame and crossfades between worlds.
- The tablist works as the room index: hover, click/touch, or arrow/Home/End keys.
- The active panel carries a kicker, a large serif title, the summary and the practice action.
- A plan with a view cone shows which world is active, and a progress hairline sits along the bottom.
- On phones, the stage sits above a horizontally scrolling index.

**03 What we build** is a stack of full-frame practice cards using the close camera renders:

- Cards are CSS-sticky from 761px, and each one dims and recedes as the next settles over it.
- On phones they are an unstuck vertical list.

SVG world illustrations remain on practice-page heroes.

The introduction follows the tour's loader. On ink, the wordmark and Skip pill sit in the top row. "Anvaya" rises letter by letter in Instrument Serif with अन्वय beneath it. A serif counter reaches 100 over a filling hairline. Progress represents the transition, not a measured download. The letters then lift away and the screen wipes upward into the hero, whose headline lines rise. Nominal duration 2.3 seconds with a 2.7-second exit safeguard. Skip and Escape release inert state/scroll and restore focus. Bypass on reduced motion, a seen session, deep links and inner pages. Its default server-rendered state is hidden.

## Motion, accessibility and forms

Owner update, 23 October 2026 (Awwwards-style direction). Only bindu/thread motion is ambient, with a visible Pause/Resume control; it suspends offscreen or when the document is hidden. Everything else responds to scroll, pointer or navigation:

- Lenis smooths wheel scrolling of the native window (touch stays native); anchors, history and `scrollTo` remain browser-owned.
- Headings reveal by masked lines (SplitText), labels by bindu, copy and cards by staggered rise, artwork by clip wipe. Elements skipped by jumps settle immediately.
- The Point copy fills word by word with scroll; Devanagari marks and belief words have gentle parallax; the Make/Move/Matter and Brand/Product/Systems/Space marquee is scroll-linked, never autoplaying.
- How We Work pins and scrolls horizontally at 1100px and wider.
- The header is fixed with motion and absolute without it. After the hero it turns to blurred ink with a hairline. It hides while reading downward and returns on upward scroll or focus. An accent scroll-progress line runs along the top, and the header ruler slides with page depth.
- Internal route changes pass through an ink curtain that raises the wordmark. Next.js Link navigation and history stay intact.
- Fine pointers get the tour's cursor: white dot and ring with the `difference` blend mode. It becomes a solid dot on links, shows VIEW on artwork and SCROLL on the hero, and hides over form fields. Pills and actions pull magnetically.
- Film grain shifts in six steps per second, and is static for reduced motion.

Reduced motion removes Lenis, reveals, pinning, curtains, cursor, magnetic pull and live WebGL immediately, including on a live preference change. Without JavaScript all content is visible and the layout is the static editorial page.

One H1 per page, semantic anchors/buttons, skip link, explicit form labels, visible focus, keyboard/touch equivalents and reduced-motion alternatives. Decorative artwork is hidden from assistive technology. Minimum action size 44px. Verify 320px widths and enlarged text.

The project form preserves the supplied fields and helper copy. Name, email and desired outcome are required. Practice choices allow connected needs; Not sure yet is exclusive. Budget choices: Need guidance; Under ₹50,000; ₹50,000–₹1.5 lakh; ₹1.5–₹5 lakh; ₹5 lakh+. These are enquiry ranges, not service prices. All other details may begin unspecified.

Server-side validation, honeypot, fixed configured recipient, visitor reply-to, duplicate-send idempotency, pending state, focused errors and live result messaging are required. Success needs a Resend accepted ID. No optimistic success, fake inbox or database. Copy/download remain local and say explicitly that they do not send anything. Privacy must describe the delivered data flow accurately.

## Verification

Run lint, a webpack production build and the production Playwright suite. Cover desktop/mobile Chromium, reduced motion and desktop/mobile WebKit. Capture all eight pages at 1440×1000, 1024×768, 390×844 and 320×740; inspect hero, introduction, active worlds, practices, form and footer visually.

Test legacy redirects, unpublished Work, 404 recovery, native history/anchors, keyboard focus, form errors/retained values, missing delivery settings, mocked provider acceptance/rejection/network failure, local backups, no-JavaScript content, image/WebGL failure and live motion preference changes. Tests must never send real enquiries.

Record machine/browser versions, actual poster sizes, geometry/draw calls and measured animation-frame cadence. The architecture has no ambient render loop (scroll/pointer drift renders on demand); do not report animation-frame cadence as GPU render cost or physical-phone performance. Actual Safari and physical-phone coverage must be reported separately from WebKit/emulation. Live inbox delivery remains unverified until owner-supplied settings are connected and tested.
