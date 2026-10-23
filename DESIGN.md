# Anvaya — Make. Move. Matter.

Current authority: the owner's complete website script, 8 October 2026. Implementation contract: [connected-studio plan](docs/anvaya-connected-studio-plan.md). The former Lusion/cobalt and glass-lotus specifications are historical.

## Character and tokens

Technology and design studio. India, working globally. Quiet confidence: warm, editorial, architectural, clear. Use the supplied script verbatim for the principal headings, body copy and actions.

| Role | Value |
| --- | --- |
| Warm ivory canvas | `#F0EBE5` |
| Light surface | `#F8F4EE` |
| Espresso ink/footer | `#3F2419` |
| Cinematic dark hero | `#211B17` |
| Restrained terracotta | `#A74F33` |
| Secondary ink | `#75665B` |
| Fine rules | `#CEC2B5` |
| Text on dark | `#F3EDE4` |

Ivory and espresso retain the sampled Oura reference palette. Terracotta marks the bindu, thread, active world, small annotations and focus states. No blue, metallic gold, gradients suggesting generic AI, fake logos/testimonials or unsupported numbers. Gradual lighting/shading belongs to the architectural scene.

Owner update, 23 October 2026: locally hosted Cormorant (upright and italic, OFL) is the display face for H1/H2, practice names, step numbers, the hero headline and marquee, with an italic serif accent on MATTER. Inter 400 remains for body copy, navigation and actions; Hind for Devanagari; Geist Mono for compact numbered labels. Preserve font licenses. Body 16–17px desktop, 14–16px mobile. Hero display scales from 60–75px at narrow widths to roughly 156px at 1440px. Avoid widely tracked body text; compact labels use modest tracking.

Maximum content width 1440px. Gutters: 48px desktop, 32px tablet, 20px mobile, 16px below 360px. Sections: 112px desktop, 88px tablet, 72px mobile. Asymmetric two-column introductions, large left-aligned headings, fine rules and rectangular visual fields. No rounded card grid. Reading measure stays around 40–65 characters.

## Navigation and composition

Brand `ANVAYA / अन्वय` links Home. Desktop right: Services, Studio, Start a Project ↗. No Home text link, second Menu button or Work link. Mobile uses brand/project action in the first row and visible Services/Studio links in the next row. All targets remain accessible without a modal.

Home has eight scrolling sections plus the one-time transition: Hero; The Point of Anvaya; The Anvaya Thread; What We Build; One Connected Studio; How We Work; Studio Note; Final CTA. The transition is an overlay, not an extra empty scroll section.

Services has five sections. Each practice page has five sections. Studio has five sections. Project has the four specified sections; the form is its primary action, so no duplicate self-link CTA is appended. Privacy and Terms are supporting pages. Work and all historical cases return the custom 404 until the proof requirement is met.

Owner update, 12 October 2026: Digital Products and Intelligent Operations show a small terracotta-outline “Coming soon” label beside their names in listings and world tabs, below their practice-page H1, and in disabled enquiry choices. Preserve readable contrast and original artwork/copy. Their detail pages offer available-practice navigation; no launch date or waitlist is implied. Digital Presence and Spatial Visuals remain available.

Reusable final CTA: THE NEXT MOVE / Have something worth building? / supplied body / Start a Project ↗. Home, practice and Studio variants use the owner's page-specific heading, action and copy. Footer uses the supplied positioning, Make / Move / Matter, India/global line, copyright and Privacy. Only confirmed contact/social links render.

## Logo

Original mark (`app/components/connected/Logo.tsx`, favicon `app/icon.svg`): a stroked architectural arch read as an A, an inner arch at lower weight, and a terracotta thread crossing it to end in the bindu. It sits before the `ANVAYA / अन्वय` wordmark in the header, leads the footer wordmark, and is drawn stroke by stroke in the loader and route curtain. On dark grounds the thread uses `#D07A55`.

## Bindu, thread and original architecture

The hero is deep espresso with immediate HTML MAKE. MOVE. MATTER. copy, a quiet original three-arch connection study, terracotta SVG thread and a small travelling bindu. Three.js architecture stays still. No orbit, object rotation, water, particles or stock imagery. The camera drifts slightly with hero scroll progress and the mouse; frames render only on load, resize and those changes, with no continuous WebGL loop.

Procedural beveled arches use stone, clay and ivory materials, broad lighting and local matching WebP posters. Scene code is retained as the reproducible source. Reserve dimensions before assets arrive. Poster remains available beneath the live renderer. WebGL creation/render/context failure stays local; reduced motion loads no renderer. Export both desktop and mobile posters directly from the same scene, without interface overlays.

The thread enters the next section through a fine gutter line. Four original SVG worlds represent a browser, product interface, workflow and architectural opening. These are abstract practice illustrations, never client screens. An accessible vertical tablist selects the active world using hover, click/touch or arrow/Home/End keys. Each panel has a real practice-page action.

The introduction is espresso: the logo mark draws (arch, inner arch, thread, bindu), ANVAYA rises letter by letter through masks, अन्वय and BUILDING WITH INTENTION fade in, and a terracotta rule fills while an italic serif counter reaches 100. Progress represents the transition, not a measured download. The screen then wipes upward into the hero, whose headline lines rise. Nominal duration 2.35 seconds with a 2.7-second exit safeguard. Skip and Escape release inert state/scroll and restore focus. Bypass on reduced motion, a seen session, deep links and inner pages. Its default server-rendered state is hidden.

## Motion, accessibility and forms

Owner update, 23 October 2026 (Awwwards-style direction). Only bindu/thread motion is ambient, with a visible Pause/Resume control; it suspends offscreen or when the document is hidden. Everything else responds to scroll, pointer or navigation:

- Lenis smooths wheel scrolling of the native window (touch stays native); anchors, history and `scrollTo` remain browser-owned.
- Headings reveal by masked lines (SplitText), labels by bindu, copy and cards by staggered rise, artwork by clip wipe. Elements skipped by jumps settle immediately.
- The Point copy fills word by word with scroll; Devanagari marks and belief words have gentle parallax; the Make/Move/Matter and Brand/Product/Systems/Space marquee is scroll-linked, never autoplaying.
- How We Work pins and scrolls horizontally at 1100px and wider.
- The header is fixed over the Home hero, sticky elsewhere, turns translucent ivory after the hero, hides while reading downward and returns on upward scroll or focus. A terracotta scroll-progress line runs along the top.
- Internal route changes pass through an espresso curtain that draws the mark; Next.js Link navigation and history stay intact.
- Fine pointers get a terracotta ring cursor (grows on links, shows View on artwork, hides over form fields) and magnetic primary actions. Actions fill with terracotta and rotate their arrow on hover.
- A static grain overlay adds texture.

Reduced motion removes Lenis, reveals, pinning, curtains, cursor, magnetic pull and live WebGL immediately, including on a live preference change. Without JavaScript all content is visible and the layout is the static editorial page.

One H1 per page, semantic anchors/buttons, skip link, explicit form labels, visible focus, keyboard/touch equivalents and reduced-motion alternatives. Decorative artwork is hidden from assistive technology. Minimum action size 44px. Verify 320px widths and enlarged text.

The project form preserves the supplied fields and helper copy. Name, email and desired outcome are required. Practice choices allow connected needs; Not sure yet is exclusive. Budget choices: Need guidance; Under ₹50,000; ₹50,000–₹1.5 lakh; ₹1.5–₹5 lakh; ₹5 lakh+. These are enquiry ranges, not service prices. All other details may begin unspecified.

Server-side validation, honeypot, fixed configured recipient, visitor reply-to, duplicate-send idempotency, pending state, focused errors and live result messaging are required. Success needs a Resend accepted ID. No optimistic success, fake inbox or database. Copy/download remain local and say explicitly that they do not send anything. Privacy must describe the delivered data flow accurately.

## Verification

Run lint, a webpack production build and the production Playwright suite. Cover desktop/mobile Chromium, reduced motion and desktop/mobile WebKit. Capture all eight pages at 1440×1000, 1024×768, 390×844 and 320×740; inspect hero, introduction, active worlds, practices, form and footer visually.

Test legacy redirects, unpublished Work, 404 recovery, native history/anchors, keyboard focus, form errors/retained values, missing delivery settings, mocked provider acceptance/rejection/network failure, local backups, no-JavaScript content, image/WebGL failure and live motion preference changes. Tests must never send real enquiries.

Record machine/browser versions, actual poster sizes, geometry/draw calls and measured animation-frame cadence. The architecture has no ambient render loop (scroll/pointer drift renders on demand); do not report animation-frame cadence as GPU render cost or physical-phone performance. Actual Safari and physical-phone coverage must be reported separately from WebKit/emulation. Live inbox delivery remains unverified until owner-supplied settings are connected and tested.
