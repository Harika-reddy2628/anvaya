# Anvaya connected studio — implementation contract

Approved source: owner's ANVAYA — COMPLETE WEBSITE SCRIPT, 8 October 2026. Further decisions: real enquiries, Resend, INR ranges. This replaces the older Lusion content/visual requirements where they conflict. See [DESIGN.md](../DESIGN.md).

## Routes and compatibility

| Launch page | Route | Compatibility service ID |
| --- | --- | --- |
| Home | `/` | — |
| Services | `/services` | — |
| Digital Presence | `/services/digital-presence` | `interface` |
| Digital Products | `/services/digital-products` | `product` |
| Intelligent Operations | `/services/intelligent-operations` | `automation` |
| Spatial Visuals | `/services/spatial-visuals` | `spatial` |
| Studio | `/studio` | — |
| Start a Project | `/project` | service query retained |

Legacy `/services/{id}` URLs permanently redirect to their named practice. `/about` redirects to `/studio`. Privacy and existing Terms remain supporting URLs. Work and all case-study URLs are unpublished (custom 404), including cases retained in historical data. Do not enable Work until 2–3 real projects have adequate visuals, provenance and verifiable outcomes.

## Build sequence

1. Use a new branch from main; preserve the earlier redesign stash. Establish the current design/copy authority and inspect installed Next.js guidance.
2. Build shared navigation, footer, one-time loading transition, action and final CTA treatments. Build/review the original architectural hero and matching posters on desktop/mobile before extending the presentation.
3. Build the Home narrative with eight content sections plus the loading transition. Build Services and four practices from shared data so descriptions, route links and enquiry seeds remain consistent.
4. Build Studio and the four-section Project page. Wire server-validated Resend sending, pending/error/success behavior and local copy/download backups. Keep contact destinations conditional on confirmed configuration.
5. Replace obsolete lotus/water and previous content tests with meaningful launch, compatibility, accessibility, fallback and enquiry coverage. Build before production browser checks. Capture all pages and record visual/performance evidence.
6. Update README/design/report. Keep work local; publishing or pushing is not part of this build request.

## Delivery contract

Server Action `sendEnquiry(previousState, formData)` returns typed idle/error/success state and field errors. Required fields: name, email, desired outcome; accept optional company, phone, context and guided timeline/budget. Allow multiple practice IDs, with Not sure yet exclusive. Validate enums/lengths/server-side and treat honeypot submissions as unsent.

Resend sends plain-text enquiry content to the configured studio inbox, from its verified domain, with the visitor as reply-to. Client input never chooses recipient or sender. Use a submission UUID as provider idempotency key; preserve it for unchanged retries and rotate on edits/success. Return the owner's success copy only when the provider returns an accepted message ID. Do not create a database, visitor autoresponder or background retry job.

See [.env.example](../.env.example). Required sending settings: `RESEND_API_KEY`, `PROJECT_ENQUIRY_FROM`, `PROJECT_ENQUIRY_TO` (or confirmed public email fallback). Public contact/social settings are optional. Do not put keys into chat, source, logs or NEXT_PUBLIC variables. No contact values were supplied during this implementation; empty configuration must fail honestly.

Resend requires an API key and verified domain: [official Next.js guide](https://resend.com/docs/send-with-nextjs), [domain setup](https://resend.com/docs/dashboard/domains/introduction). API acceptance is not a claim of inbox delivery.

## Acceptance and launch dependency

Eight core pages and two supporting legal pages are coherent, responsive and accessible. No Work link/case-study content, fake evidence, separate Home link or Menu overlay. Exact supplied principal copy and sections appear. Compatibility links resolve, service seeds work and native navigation remains intact.

Lint/build and five browser profiles pass. Local provider mocks cover acceptance, rejection and network failure without sending email. Real delivery must be configured and confirmed separately before public launch; missing settings cannot silently simulate success.
