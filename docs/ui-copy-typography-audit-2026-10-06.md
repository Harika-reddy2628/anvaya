# Anvaya UI, copy, and typography audit

6 October 2026. Audit of the current local application at `http://127.0.0.1:3000`.

## Assessment

The main polish problem is an uneven information hierarchy. Large, light serif statements receive most of the visual attention, while the service descriptions, project provenance, pricing conditions, navigation, and brief instructions are much smaller. Repeated abstract language makes several sections sound interchangeable.

The current UI still uses the glass-lotus baseline. The approved [design system](../DESIGN.md) calls for black Inter headings and body text, cool pale surfaces, and restrained Indic typography. Typography should move toward that system. This audit does not authorize or claim completion of the broader redesign; follow its [implementation phase order](lusion-anvaya-implementation-plan.md) for that work.

Application files were not changed. The deliverables are this report, browser measurements, and screenshots.

## Highest-priority findings

### 1. Responsive line breaks join words and sentences

**Priority: P1 — visible copy defect.** At 390px and 320px, hiding `<br>` elements removes the only separator between adjacent React text nodes. Observed examples include:

- `Senior engineering for founders and CTOs.Specialist thinking…`
- `Start with a focused project.Stay for the next chapter.`
- `A rough idea is a good place to start.Turn it into a brief…`
- `Your details stay in your browseruntil you choose to share the brief.`

The homepage has seven affected supporting passages at mobile widths. The form note also joins at 1024px and on `/project` at 390px. Relevant rules: [editorial.css](../app/editorial.css#L810), [globals.css](../app/globals.css#L2124); content: [page.tsx](../app/page.tsx), [BriefBuilder.tsx](../app/components/studio/BriefBuilder.tsx#L278).

Use ordinary flowing paragraphs with actual spaces. Reserve forced line breaks for deliberately composed display headings, and retain a whitespace separator wherever a break can disappear. Check rendered `innerText`, not just source indentation.

Evidence: [mobile services](../output/playwright/ui-audit-2026-10-06/home-mobile-services.png), [mobile pricing](../output/playwright/ui-audit-2026-10-06/home-mobile-pricing.png), [mobile brief](../output/playwright/ui-audit-2026-10-06/home-mobile-project.png).

### 2. Essential text is too small

**Priority: P1 — readability.** The desktop hero is 88.56px, but navigation is 11px, pricing metadata is 9px, and supporting service copy is 14px. Mobile hero metadata falls to 7px, then 6px at 320px. The footer is 10px desktop and 9px mobile. A large display headline can coexist with readable supporting text; the current scale reduces the information visitors need to make a decision.

Increase normal body copy to 16–18px, navigation/actions to 14–16px, and metadata to 12–14px, following `DESIGN.md`. Use weight and spacing to distinguish metadata instead of shrinking it. Keep pricing assumptions and local brief behavior at readable body or supporting sizes.

Preserve the existing 16px mobile form controls. Legal and service detail paragraphs already use 15–16px and provide a better starting point than homepage copy.

Evidence: [desktop hero](../output/playwright/ui-audit-2026-10-06/home-desktop-hero.png), [mobile hero](../output/playwright/ui-audit-2026-10-06/home-mobile-hero.png), [320px hero](../output/playwright/ui-audit-2026-10-06/home-narrow-hero.png), [form actions](../output/playwright/ui-audit-2026-10-06/project-actions-desktop.png).

### 3. Several text/background pairs miss the design contrast target

**Priority: P1 — readability.** Calculated from observed solid CSS colors using relative luminance:

| Observed pairing | Ratio | Where it appears |
| --- | ---: | --- |
| `#936E6C` on `#FAF5EE` | 4.13:1 | Small service label and pricing badge |
| White on `#936E6C` | 4.48:1 | Small primary button labels |
| `#666A66` on `#E5DAD4` | 4.01:1 | Footer supporting/legal text |

These are below the project's 4.5:1 target for ordinary text. The usual muted text on the pale main canvas is approximately 5.07:1, so the problem depends on the actual surface. Do not darken every secondary label indiscriminately.

Use the approved ink/accent/surface tokens when that theme phase is reached and verify each pairing. White on the specified cobalt `#2454FF` calculates to approximately 5.55:1. Hero text over imagery requires its own visual contrast review; these solid-color calculations do not establish image-overlay contrast.

Evidence: [services](../output/playwright/ui-audit-2026-10-06/home-desktop-services.png), [pricing](../output/playwright/ui-audit-2026-10-06/home-desktop-pricing.png), [footer](../output/playwright/ui-audit-2026-10-06/footer-desktop.png).

### 4. The font roles compete with the approved engineering identity

**Priority: P2 — visual coherence.** Cormorant is used for the wordmark, hero, section headings, service headings, uppercase section kickers, FAQ questions, and case-study narratives. It gives the baseline an editorial art direction. Inter, Geist Mono, Sahitya, and Hind are already local, so no new font family is necessary.

Use Inter 500–600 for display headings and 400 for paragraphs. Use Inter 500 for section labels, reserving Geist Mono for technical annotations. Keep Sahitya/Hind for `अन्वय` and Devanagari text. Use an Inter 750–800 wordmark as specified. Remove active Cormorant preloading when the active theme migrates.

The root imports three successive global stylesheets: [layout.tsx](../app/layout.tsx#L8). For example, the body size changes from 15px in `globals.css` to 16px in `editorial.css` to 14px in `reference.css`. Consolidate roles and remove competing legacy declarations; another override layer would leave the system harder to control.

### 5. Section headings repeat the same abstract promise

**Priority: P2 — content clarity.** “Connected thinking,” “considered engineering,” “built with intention,” and “something that works” recur without identifying distinct information. The brand's connection idea is useful in the hero and studio introduction. Work, services, process, pricing, and the brief should each answer a different practical question.

Give each section a concrete job: what you build, what the evidence shows, how delivery works, what it costs, and what happens next. Shorten supporting paragraphs when they repeat the headline. See the suggested copy below.

### 6. Case-study body text is styled and marked up as headings

**Priority: P2 — scanning and semantics.** [The case-study template](../app/work/[slug]/page.tsx) renders each full problem/solution/outcome paragraph as an `h2`; the section label is a small span. Those paragraphs measure 35px desktop and 27px mobile. Long sentences therefore look like repeated display statements rather than a readable narrative.

Use actual headings such as “The problem,” “Our approach,” and “The outcome,” followed by 16–18px paragraphs. Keep the problem, approach, and outcome data intact. Render `<anvaya-viewer>` as inline code where it is discussed technically. Keep body measure near 60–68 characters and evidence notes near the media they qualify.

Evidence: [desktop narrative](../output/playwright/ui-audit-2026-10-06/case-narrative-desktop.png), [mobile narrative](../output/playwright/ui-audit-2026-10-06/case-narrative-mobile.png).

### 7. Copy needs a few factual and workflow corrections

**Priority: P2 — precision.**

- `/work` introduces internal products, showcases, and an anonymous case study but omits the public product category represented by Oppy. Include public products in the introduction.
- Spatial-engine evidence says “The viewer below,” although the viewer appears above the note. Use position-independent wording.
- The hero says “autonomous AI,” while other sections say “agentic AI,” “AI infrastructure,” and “automation.” Use “AI workflows” for top-level customer copy, and explain agentic systems in relevant service/case-study details. Keep service IDs and underlying capabilities intact.
- `/project` starts with “Tell us,” but the brief is generated locally and there is no configured contact address. Explain copy/download behavior before the visitor completes the form. The prepared result already states that nothing has been sent; preserve that behavior and make the earlier copy equally clear.

### 8. Spacing and affordances weaken the text hierarchy

**Priority: P2 — supporting UI polish.** The mobile hero uses extensive space before a staggered four-line statement; the last line consists solely of “products.” The service panel gives a large decorative initial priority over selection controls. FAQ questions resemble underlined navigation links, and the expansion icon is hidden. The desktop nav links are only 33px tall, and its CTA is 38px tall, below the design's 44px target; the mobile menu toggle meets it.

Compose the hero into a few stable lines within the approved scale; let paragraphs wrap naturally. Keep decorative initials subordinate to service names and selectors. Use left-aligned FAQ questions with a visible expansion state. Keep a concise project action available in the small-screen header as required by the design.

The introductory overlay also delays the homepage by about 3.2 seconds in its configured sequence, with a 5-second fallback. Its removal is already required by the approved implementation plan. The initial mobile capture records that baseline behavior; later screenshots show the page after it closes.

## Typography target

Measured values below are computed browser styles, not estimates from screenshots.

| Role | Current desktop / mobile | Target from `DESIGN.md` |
| --- | --- | --- |
| Hero | Cormorant 400, 88.56px / 37.05px; 29.76px at 320px | Inter 500–600, `clamp(42px, 6.4vw, 96px)`, line-height 1.02 |
| Standard section heading | Cormorant 400, 63.36px / 40px | Inter 500–600, 32–64px, line-height 1.08 |
| Homepage service paragraph | Inter 400, 14px / 13px | Inter 400, 16–18px, line-height 1.55 |
| Navigation | Inter 400, 11px; mobile uses a 17px serif menu label | Inter 550–650, 14–16px |
| Hero overline | Inter 400, 9px / 7px; 6px at 320px | Inter 500, 12–14px, tracking at most 0.08em |
| Pricing metadata | 9–11px | 12–14px |
| Case narrative | Cormorant 400, 35px / 27px | Short Inter headings plus 16–18px paragraphs |
| Footer legal/supporting text | Inter 400, 10px / 9px | Readable metadata, 12–14px minimum role size |

Use display tracking around −0.035em and normal body tracking. Test increased text sizes and long service/project names rather than solving wrapping by shrinking type. Retain local font hosting and licenses.

## Suggested copy

The hero wording below follows the approved design. Other entries are editorial proposals for the subsequent polish pass. They preserve the existing capabilities, project provenance, prices, timelines, and commercial terms.

| Location | Current wording | Suggested wording |
| --- | --- | --- |
| Hero overline | SOFTWARE · AUTONOMOUS AI · SPATIAL EXPERIENCES | SOFTWARE · AI WORKFLOWS · SPATIAL 3D |
| Hero heading | Ambitious ideas. Considered engineering. Real, working products. | Ambitious ideas. Connected engineering. Working products. |
| Hero supporting text | We help founders and CTOs ship production-ready software, autonomous AI workflows, and interactive spatial experiences. | We help founders and CTOs build software, AI workflows, and interactive spatial experiences. |
| Introduction heading | Between an idea and its place in the world. | The engineering your idea needs. |
| Introduction paragraph | Two paragraphs repeating connection and usable outcomes | We’re a Bengaluru engineering collective bringing product engineering, AI workflows, spatial 3D, and interface design together around your project. |
| Featured work heading | The thinking. And the things we build. | Products, tools, and systems we’ve built. |
| Featured work supporting text | Tools that work. Workflows that connect. Experiences that make complex ideas tangible. | Explore the problem, our approach, and the evidence behind each project. |
| Services heading | One collective. Four ways forward. | Four disciplines. One engineering team. |
| Services supporting text | Senior engineering for founders and CTOs. Specialist thinking for products, workflows, and spaces. | Product engineering, AI workflows, spatial 3D, and interface design—scoped around what you need to build. |
| Process heading | Clarity at every step. | From agreed scope to source handover. |
| Engineering heading | Every layer. Built with intention. | Inside the engineering. |
| Pricing heading | A defined scope. A clear investment. | Choose how we work together. |
| Pricing supporting text | Start with a focused project. Stay for the next chapter. | A fixed-scope sprint, a spatial project, or an ongoing engineering partnership. |
| Studio heading | Different disciplines. A connected way of thinking. | An engineering collective in Bengaluru. |
| FAQ heading | Before we begin. | Scope, payment, and handover. |
| Homepage brief heading | What are you thinking of building? | Prepare your project brief. |
| `/project` introduction | Tell us what you want to make possible. Create a clear brief, with scope and investment assumptions up front. | Outline your project, budget, and timeline. Prepare a brief you can copy or download; nothing is sent from this site. |
| Form action | Create project brief | Prepare brief |
| Form helper | Your details stay in your browser until you choose to share the brief. | Prepared in your browser. Nothing is sent. |
| `/work` introduction | Internal products, technical showcases, and an anonymous case study. | Public and internal products, technical showcases, and an anonymous case study. |
| Spatial evidence | The viewer below is an interactive illustration… | This interactive preview is an illustration built for this website. It does not demonstrate the production component or its asset-size and load-time benchmarks. |
| Footer project link | Something in mind? | Start with a project brief. |

The service descriptions can also lose filler while retaining scope:

- **Product:** “Build a focused web or mobile product, from interface and backend to deployment and source handover.”
- **AI:** “Connect your tools and documents in an AI workflow built around a defined operational task.”
- **Spatial:** “Create browser-based experiences for exploring properties, configuring products, and understanding spaces.”
- **Interface:** “Improve an existing product’s interface and frontend performance, with scope based on a product review.”

Retain the exact 14-calendar-day scope assumptions, spatial turnaround, pricing ranges, payment split/escrow, ownership conditions, and 14-day defect warranty. Avoid new conversion, reliability, or speed claims without evidence.

## Evidence and coverage

Browser: Chromium **154.0.8037.97**, automated through Playwright CLI against the existing development server. Environment: Linux, Node **22.22.0**. Mobile captures are viewport emulation, not physical phone or Safari tests.

- Homepage captured at **1440×1000**, **390×844**, and **320×740**; additional service/brief measurements at **1024×768**.
- All six case studies, all four service routes, `/work`, `/project`, `/privacy`, `/terms`, and a deliberately missing route measured at **1440×1000** and **390×844**.
- Representative templates visually reviewed: homepage sections, work index, spatial/CLI case headers, case narrative, product/AI services, project form, legal pages, and footer.
- Saved 42 screenshots, including first-visit intro captures and the subsequent visible homepage.
- All existing route samples returned 200; the deliberately missing route returned 404. Each sampled page had one H1. No horizontal document overflow was measured at the sampled widths. These checks do not establish complete keyboard, zoom, or browser conformance.
- The development server emitted repeated HMR WebSocket handshake errors. The pages rendered; production behavior was not evaluated.
- Safari/WebKit, physical devices, 200% browser zoom, the full interaction test matrix, and scene performance were not verified in this text/typography audit. No runtime implementation changed, so lint/build/e2e were not rerun.
- Ruflo discovery returned no tools. No `[INTELLIGENCE]` suggestions were exposed. This did not block the audit.
- The installed design-review skill is a catalogue entry; its full upstream workflow is not installed. The audit used local source inspection and browser evidence. The [live Lusion homepage](https://lusion.co/) was consulted for its current text only; no rendered reference metrics or interaction equivalence are claimed.

Artifacts: [screenshot directory](../output/playwright/ui-audit-2026-10-06/), [route measurements](../output/playwright/ui-audit-2026-10-06/route-measurements.json), [homepage measurements](../output/playwright/ui-audit-2026-10-06/home-measurements.json), [mobile hero measurements](../output/playwright/ui-audit-2026-10-06/mobile-measurements.json), [route capture script](../output/playwright/ui-audit-2026-10-06/capture-routes.js).

## Recommended order for the polish pass

1. Repair responsive whitespace and positional/factual copy; clarify local brief behavior.
2. Finalize the homepage copy around distinct visitor questions, using the approved hero wording.
3. Establish the shared Inter type roles and contrast-safe tokens during the approved theme phase; remove competing legacy typography rules.
4. Reformat case-study narratives, keep provenance readable beside previews, and standardize action labels.
5. Review desktop, tablet, mobile, narrow layouts, enlarged text, menu/FAQ states, and form feedback visually. When runtime changes are implemented, run the project's required lint, production build, and browser suite, including the specified Safari/WebKit coverage.

Keep the local fonts, clear pricing/scope data, honest evidence labels, readable mobile form controls, and restrained `अन्वय` identity as foundations for the pass.
